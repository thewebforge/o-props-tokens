const test = require('ava')
const fs = require('fs')
const O_Props = require('../dist/o-props.cjs')
const O_tokens = require('../dist/o-props.tokens.json')

test('Should have an all included import', t => {
  t.is(Object.keys(O_Props).length, 1654)
})

test('Import should have animations', async t => {
  t.assert(Object.keys(O_Props).includes('--o-animation-fade-in'))
  t.assert(O_Props.animationFadeIn)
  t.assert(Object.keys(O_Props).includes('--o-animation-fade-in-@'))
})

test('Import should have sizes', async t => {
  t.assert(Object.keys(O_Props).includes('--o-size-5'))
  t.assert(O_Props.size5)
})

test('Import should have colors', async t => {
  t.assert(Object.keys(O_Props).includes('--o-orange-0'))
  t.assert(O_Props.orange0)
})

test('JSON Import should have colors', async t => {
  t.is(Object.keys(O_tokens).length, 439)
  t.assert(Object.keys(O_tokens).includes('--o-orange-0'))
})

test('JSON Import should have types', async t => {
  t.assert(O_tokens['--o-gray-0'].$type, 'color')
})

test('Should produce a props bundle', async t => {
  t.assert(fs.existsSync('./dist/o-props.min.css'))
})

test('Should produce shadow :host props', async t => {
  t.assert(fs.existsSync('./dist/o-props.shadow.min.css'))
  t.assert(fs.existsSync('./dist/o-props.easings.shadow.min.css'))
  t.assert(fs.existsSync('./dist/o-props.shadows.shadow.min.css'))
})

// test('Should produce normalize files', async t => {
//   t.assert(fs.existsSync('./normalize.min.css'))
//   t.assert(fs.existsSync('./normalize.light.min.css'))
//   t.assert(fs.existsSync('./normalize.dark.min.css'))
// })

test('Should produce optional mask props', async t => {
  t.assert(fs.existsSync('./dist/o-props.masks.edges.min.css'))
  t.assert(fs.existsSync('./dist/o-props.masks.corner-cuts.min.css'))
})

test('Should produce typings files', async t => {
  t.assert(fs.existsSync('./dist/o-props.module.d.ts'))
  t.assert(fs.existsSync('./src/o-props.sizes.d.ts'))
})

test('References should be valid', async t => {
  const formatter = new Intl.ListFormat();
  const defined = new Set();
  const referenced = new Set();
  const referencedBy = new Map();

  for (const [prop, value] of Object.entries(O_Props)) {
    // Add all defined variables to the defined set
    defined.add(prop)

    if (typeof value !== 'string') {
      continue;
    }

    // Find all references to other variables: var(...)
    const matches = value.matchAll(/var\(([^)]+)\)/g);

    if (!matches) {
      continue;
    }

    // Add all references to the referenced set
    // Map all references to the prop that references them
    for (const matchArray of matches) {
      const reference = matchArray[1];

      referenced.add(reference);

      if (!prop.startsWith('--o-')) {
        continue;
      }

      if (!referencedBy.has(reference)) {
        referencedBy.set(reference, new Set());
      }

      referencedBy.get(reference).add(prop);
    }
  }

  // Check that all referenced variables are defined
  for (const reference of referenced) {
    const referencing = formatter.format(Array.from(referencedBy.get(reference)));

    t.assert(
      defined.has(reference), 
      `Variable with name ${reference} was referenced by variable ${referencing}, but is not defined`
    );
  }
})