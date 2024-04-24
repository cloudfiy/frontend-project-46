import _ from 'lodash';
import { INDENT_CHAR, SPACE_COUNT } from '../assets/constants.js';

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

const stylish = (tree) => {
  const generateStylishOutput = (currentValue, depth) => {
    const indentCount = SPACE_COUNT * depth;
    const currentIndent = INDENT_CHAR.repeat(indentCount - 2);
    const bracketIndent = INDENT_CHAR.repeat(indentCount - SPACE_COUNT);

    const formatters = {
      add: (key, value) => `${currentIndent}+ ${key}: ${stringify(value, depth + 1)}`,
      del: (key, value) => `${currentIndent}- ${key}: ${stringify(value, depth + 1)}`,
      changed: (key, value, changedValue) => `${currentIndent}- ${key}: ${stringify(
        value,
        depth + 1,
      )}\n${currentIndent}+ ${key}: ${stringify(changedValue, depth + 1)}`,
      nested: (key, value) => `${currentIndent}  ${key}: ${generateStylishOutput(value, depth + 1)}`,
      default: (key, value) => `${currentIndent}  ${key}: ${value}`,
    };

    const result = currentValue.map(({
      key, value, changedValue, status,
    }) => {
      const formatter = formatters[status] || formatters.default;
      return formatter(key, value, changedValue);
    });

    return `{\n${result.join('\n')}\n${bracketIndent}}`;
  };

  return generateStylishOutput(tree, 1);
};

export default stylish;
