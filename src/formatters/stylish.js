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

    const formatAdded = (key, value) => `${currentIndent}+ ${key}: ${stringify(value, depth + 1)}`;

    const formatDeleted = (key, value) => `${currentIndent}- ${key}: ${stringify(value, depth + 1)}`;

    const formatChanged = (key, value, changedValue) => `${currentIndent}- ${key}: ${stringify(
      value,
      depth + 1,
    )}\n${currentIndent}+ ${key}: ${stringify(changedValue, depth + 1)}`;

    const formatNested = (key, value) => `${currentIndent}  ${key}: ${generateStylishOutput(value, depth + 1)}`;

    const formatDefault = (key, value) => `${currentIndent}  ${key}: ${value}`;

    const result = currentValue.map(({
      key, value, changedValue, status,
    }) => {
      switch (status) {
        case 'add':
          return formatAdded(key, value);
        case 'del':
          return formatDeleted(key, value);
        case 'changed':
          return formatChanged(key, value, changedValue);
        case 'nested':
          return formatNested(key, value);
        default:
          return formatDefault(key, value);
      }
    });

    return `{\n${result.join('\n')}\n${bracketIndent}}`;
  };
  return generateStylishOutput(tree, 1);
};

export default stylish;
