import fs from 'fs'

if (!fs.existsSync("../src"))
  fs.mkdirSync("../src");

export const buildCustomMediaPropsStylesheet = ({filename,props}, {selector,prefix,pfx}) => {
  const file = fs.createWriteStream("../src/" + filename)

  let appendedMeta = ''

  Object.entries(props).forEach(([prop, val]) => {
    file.write(`@custom-media ${prop} ${val};\n`)
  })
  file.end(appendedMeta)
}