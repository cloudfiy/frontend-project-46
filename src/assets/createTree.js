import _ from 'lodash';

const createTree = (data1, data2) => {
  const keys = Object.keys({ ...data1, ...data2 }).sort();
  const tree = keys.map((key) => {
    if (!(key in data1)) {
      return { key, value: data2[key], status: 'add' };
    }
    if (!(key in data2)) {
      return { key, value: data1[key], status: 'del' };
    }
    if (data1[key] !== data2[key]) {
      if (
        _.isObject(data1[key])
        && data1[key] !== null
        && _.isObject(data2[key])
        && data2[key] !== null
      ) {
        return { key, value: createTree(data1[key], data2[key]), status: 'nested' };
      }
      return {
        key,
        value: data1[key],
        changedValue: data2[key],
        status: 'changed',
      };
    }
    return { key, value: data1[key], status: 'unchanged' };
  });
  return tree;
};

export default createTree;
