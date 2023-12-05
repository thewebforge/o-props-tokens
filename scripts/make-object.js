import Animations from 'open-props/src/props.animations.js'
import Sizes from 'open-props/src/props.sizes.js'
import Colors from 'open-props/src/props.colors.js'
import ColorsHSL from 'open-props/src/props.colors-hsl.js'
import Fonts from 'open-props/src/props.fonts.js'
import Borders from 'open-props/src/props.borders.js'
import Aspects from 'open-props/src/props.aspects.js'
import Easings from 'open-props/src/props.easing.js'
import Gradients from 'open-props/src/props.gradients.js'
import Shadows from 'open-props/src/props.shadows.js'
import SVG from 'open-props/src/props.svg.js'
import Zindex from 'open-props/src/props.zindex.js'
import MaskEdges from 'open-props/src/props.masks.edges.js'
import MaskCornerCuts from 'open-props/src/props.masks.corner-cuts.js'

import {mapToObjectNotation} from './utils.js'

export const toObject = () => {
  return mapToObjectNotation({
    ...Animations,
    ...Sizes,
    ...Colors,
    ...ColorsHSL,
    ...Fonts,
    ...Borders,
    ...Aspects,
    ...Easings,
    ...SVG,
    ...Gradients,
    ...Shadows,
    ...Zindex,
    ...MaskEdges,
    ...MaskCornerCuts,
  })
}