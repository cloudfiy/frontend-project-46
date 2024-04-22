import stylish from './stylish.js'

const outputStyle = (tree, change = 'stylish') => {
  switch (change) {
    case 'stylish':
      return stylish(tree)
    default:
      throw new Error(`Unknown format: ${change}!`)
  }
}

export default outputStyle
