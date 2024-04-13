import * as fs from 'node:fs'

const toParse = (filepath) => {
  try {
    const data = fs.readFileSync(filepath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.log(error)
    return null
  }
}

export default toParse
