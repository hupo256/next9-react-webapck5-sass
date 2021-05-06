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

tools.urlParamHash = (url = location.href) => {
  let params = {}
  let hash = url.slice(url.indexOf('?') + 1).split('&')
  for (let i = 0; i < hash.length; i++) {
    const h = hash[i].split('=') //
    params[h[0]] = h[1]
  }
  return params
}

export default tools
