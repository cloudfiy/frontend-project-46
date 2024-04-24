import _ from 'lodash';
import { INDENT_CHAR, SPACE_COUNT } from './constants.js';

const stringify = (node, depth) => {
  const generateIndentedString = (value, currentDepth) => {
    if (!_.isObject(value)) {
      return `${value}`;
    }

    const indentSize = currentDepth * SPACE_COUNT;
    const currentIndent = INDENT_CHAR.repeat(indentSize);
    const bracketIndent = INDENT_CHAR.repeat(indentSize - SPACE_COUNT);

    const lines = Object.entries(value).map(
      ([key, val]) => `${currentIndent}${key}: ${generateIndentedString(val, currentDepth + 1)}`,
    );
    return `{\n${lines.join('\n')}\n${bracketIndent}}`;
  };

  return generateIndentedString(node, depth);
};

export default stringify;
