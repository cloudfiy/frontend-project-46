import parsers from '../src/parsers.js'

import * as path from 'node:path'
import createTree from './createTree.js'
import outputStyle from './style/outputStyle.js'

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const cwd = process.cwd()
  const absPath1 = path.resolve(cwd, filepath1)
  const absPath2 = path.resolve(cwd, filepath2)
  const parsedData1 = parsers(absPath1)
  const parsedData2 = parsers(absPath2)
  const createdTree = createTree(parsedData1, parsedData2)
  return outputStyle(createdTree, outputFormat)
}

export default genDiff
