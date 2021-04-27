import _ from 'lodash'

export const sampleList = (typeName = 'item') =>
  _.times(5, num => ({
    name: `${typeName} ${num}`,
  }))
