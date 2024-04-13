#!/usr/bin/env node

import { program } from 'commander'
import * as path from 'node:path'
import toParse from './src/toParse.js'
import findDiff from './src/findDiff.js'

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.0')
  .option('-f, --format [type]', 'output format')
  .argument('filepath1')
  .argument('filepath2')
  .action((filepath1, filepath2) => {
    const cwd = process.cwd()
    const absPath1 = path.resolve(cwd, filepath1)
    const absPath2 = path.resolve(cwd, filepath2)
    const parsedData1 = toParse(absPath1)
    const parsedData2 = toParse(absPath2)
    console.log(findDiff(parsedData1, parsedData2))
  })

program.parse()
