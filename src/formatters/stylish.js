import { INDENT_CHAR, SPACE_COUNT } from '../assets/constants.js';
import stringify from '../assets/stringify.js';

const stylish = (tree) => {
  const generateStylishOutput = (currentValue, depth) => {
    const indentCount = SPACE_COUNT * depth;
    const currentIndent = INDENT_CHAR.repeat(indentCount - 2);
    const bracketIndent = INDENT_CHAR.repeat(indentCount - SPACE_COUNT);

    const result = currentValue.map(({
      key, value, changedValue, status,
    }) => {
      switch (status) {
        case 'add':
          return `${currentIndent}+ ${key}: ${stringify(value, depth + 1)}`;
        case 'del':
          return `${currentIndent}- ${key}: ${stringify(value, depth + 1)}`;
        case 'changed':
          return `${currentIndent}- ${key}: ${stringify(
            value,
            depth + 1,
          )}\n${currentIndent}+ ${key}: ${stringify(changedValue, depth + 1)}`;
        case 'nested':
          return `${currentIndent}  ${key}: ${generateStylishOutput(value, depth + 1)}`;
        default:
          return `${currentIndent}  ${key}: ${value}`;
      }
    });

    return `{\n${result.join('\n')}\n${bracketIndent}}`;
  };

  return generateStylishOutput(tree, 1);
};

export default stylish;
