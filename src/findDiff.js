function findDiff(data1, data2) {
  const keys = Object.keys({ ...data1, ...data2 }).sort()
  const diff = keys.map((key) => {
    if (!data1.hasOwnProperty(key)) {
      return `  + ${key}: ${data2[key]}`
    } else if (!data2.hasOwnProperty(key)) {
      return `  - ${key}: ${data1[key]}`
    } else if (data1[key] !== data2[key]) {
      return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]};`
    }
    return `    ${key}: ${data1[key]}`
  })
  return `{\n${diff.join('\n')}\n}`
}

export default findDiff
