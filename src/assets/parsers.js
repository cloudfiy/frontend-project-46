import yaml from 'js-yaml';

const formatParsers = {
  '.json': JSON.parse,
  '.yaml': yaml.load,
  '.yml': yaml.load,
};

const parsers = (data, format) => {
  const parser = formatParsers[format];
  if (!parser) {
    throw new Error(`Unsupported format: ${format}`);
  }
  return parser(data);
};

export default parsers;
