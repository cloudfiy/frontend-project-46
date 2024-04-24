import _ from 'lodash';

const toString = (item) => {
  if (_.isObject(item)) {
    return '[complex value]';
  }
  return _.isString(item) ? `'${item}'` : item;
};

const formatProperty = (path) => `Property '${path}'`;

const plain = (tree, path = '') => {
  const lines = tree.flatMap(({
    key, value, changedValue, status,
  }) => {
    const currentPath = path ? `${path}.${key}` : key;

    const handlers = {
      nested: () => plain(value, currentPath),
      del: () => `${formatProperty(currentPath)} was removed`,
      add: () => `${formatProperty(currentPath)} was added with value: ${toString(value)}`,
      changed: () => `${formatProperty(currentPath)} was updated. From ${toString(value)} to ${toString(
        changedValue,
      )}`,
    };

    return handlers[status]?.();
  });

  return lines.filter(Boolean).join('\n');
};

export default plain;
