import fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const result = fs.readFileSync(getFixturePath('result.txt'), 'utf-8');
const resultPlain = fs.readFileSync(getFixturePath('plainResult.txt'), 'utf-8');
const resultJSON = fs.readFileSync(getFixturePath('jsonResult.json'), 'utf-8');

const json1 = getFixturePath('file1.json');
const json2 = getFixturePath('file2.json');
const yaml1 = getFixturePath('file1.yaml');
const yaml2 = getFixturePath('file2.yml');
const fileTest = getFixturePath('fileTest.txt');

test('gendiff', () => {
  expect(genDiff(yaml1, yaml2)).toEqual(result);
  expect(genDiff(json1, json2)).toEqual(result);
});

test('gendiff stylish', () => {
  expect(genDiff(yaml1, yaml2, 'stylish')).toEqual(result);
  expect(genDiff(json1, json2, 'stylish')).toEqual(result);
});

test('gendiff plain', () => {
  expect(genDiff(yaml1, yaml2, 'plain')).toEqual(resultPlain);
  expect(genDiff(json1, json2, 'plain')).toEqual(resultPlain);
});

test('gendiff json', () => {
  expect(genDiff(yaml1, yaml2, 'json')).toEqual(resultJSON);
  expect(genDiff(json1, json2, 'json')).toEqual(resultJSON);
});

test('unknown output format', () => {
  expect(() => {
    genDiff(yaml1, yaml2, '123');
  }).toThrow('Unknown format: 123!');
});

test('unknown file format', () => {
  expect(() => {
    genDiff(fileTest, yaml2);
  }).toThrow('Unsupported format: .txt');
});
