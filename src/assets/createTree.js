import _ from 'lodash';

const createTree = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));

  return keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key)) {
      return { key, value: value2, status: 'add' };
    }
    if (!_.has(data2, key)) {
      return { key, value: value1, status: 'del' };
    }
    if (_.isEqual(value1, value2)) {
      return { key, value: value1, status: 'unchanged' };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return { key, value: createTree(value1, value2), status: 'nested' };
    }

    return {
      key,
      value: value1,
      changedValue: value2,
      status: 'changed',
    };
  });
};

export default createTree;
