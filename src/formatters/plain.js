import _ from 'lodash';

const toString = (item) => {
  if (_.isObject(item)) {
    return '[complex value]';
  }
  return _.isString(item) ? `'${item}'` : item;
};

const formatProperty = (path) => `Property '${path}'`;

const plain = (tree, path = '') => {
  const lines = [];

  tree.forEach(({
    key, value, changedValue, status,
  }) => {
    const currentPath = path ? `${path}.${key}` : key;

    switch (status) {
      case 'nested':
        lines.push(plain(value, currentPath));
        break;
      case 'del':
        lines.push(`${formatProperty(currentPath)} was removed`);
        break;
      case 'add':
        lines.push(`${formatProperty(currentPath)} was added with value: ${toString(value)}`);
        break;
      case 'changed':
        lines.push(
          `${formatProperty(currentPath)} was updated. From ${toString(value)} to ${toString(
            changedValue,
          )}`,
        );
        break;
      default:
        break;
    }
  });

  return lines.join('\n');
};

export default plain;
