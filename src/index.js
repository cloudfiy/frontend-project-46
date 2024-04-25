import * as path from 'node:path';
import * as fs from 'node:fs';
import parsers from './assets/parsers.js';
import createTree from './assets/createTree.js';
import formatters from './formatters/index.js.js';

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const cwd = process.cwd();
  const absPath1 = path.resolve(cwd, filepath1);
  const absPath2 = path.resolve(cwd, filepath2);
  const parsedData1 = parsers(fs.readFileSync(absPath1, 'utf-8'), path.extname(absPath1));
  const parsedData2 = parsers(fs.readFileSync(absPath2, 'utf-8'), path.extname(absPath2));
  const createdTree = createTree(parsedData1, parsedData2);
  return formatters(createdTree, outputFormat);
};

export default genDiff;
