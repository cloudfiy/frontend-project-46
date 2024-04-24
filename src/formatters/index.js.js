import json from './json.js';
import plain from './plain.js';
import stylish from './stylish.js';

const formatter = (tree, change = 'stylish') => {
  switch (change) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return json(tree);
    default:
      throw new Error(`Unknown format: ${change}!`);
  }
};

export default formatter;
