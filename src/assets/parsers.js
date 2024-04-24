import * as fs from 'node:fs';
import * as path from 'node:path';
import yaml from 'js-yaml';

const formatParsers = {
  '.json': JSON.parse,
  '.yaml': yaml.load,
  '.yml': yaml.load,
};

const parsers = (filepath) => {
  const data = fs.readFileSync(filepath, 'UTF-8');
  const format = path.extname(filepath);

  return formatParsers[format](data);
};
export default parsers;
