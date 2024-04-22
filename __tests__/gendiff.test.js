import fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename)

const result = fs.readFileSync(getFixturePath('result.txt'), 'utf-8')

const json1 = getFixturePath('file1.json')
const json2 = getFixturePath('file2.json')
const yaml1 = getFixturePath('file1.yaml')
const yaml2 = getFixturePath('file2.yml')

test('gendiff', () => {
  expect(genDiff(yaml1, yaml2)).toEqual(result)
})
