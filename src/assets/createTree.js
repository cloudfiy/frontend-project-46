import _ from 'lodash';

const createTree = (data1, data2) => {
  const keys = _.sortBy(Object.keys({ ...data1, ...data2 }));

  const tree = keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key)) return { key, value: value2, status: 'add' };
    if (!_.has(data2, key)) return { key, value: value1, status: 'del' };
    if (!_.isEqual(value1, value2)) {
      if (_.isObject(value1) && value1 !== null && _.isObject(value2) && value2 !== null) {
        return { key, value: createTree(value1, value2), status: 'nested' };
      }
      return {
        key,
        value: value1,
        changedValue: value2,
        status: 'changed',
      };
    }
    return { key, value: value1, status: 'unchanged' };
  });

  return tree;
};

export default createTree;
