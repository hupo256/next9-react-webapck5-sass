import _ from 'lodash'

export const sampleList = (typeName = 'item') =>
  _.times(5, num => ({
    name: `${typeName} ${num}`,
  }))

const tools = {}

// localStorage
tools.setStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}
tools.getStorage = key => {
  let data = window.localStorage.getItem(key)
  return data && data !== 'undefined' ? JSON.parse(data) : ''
}

export default tools
