// for dummy data generation, DO NOT use it on PROD
import _ from 'lodash'

export default (req, res) => {
  const { object } = req.query

  res.json(
    _.times(5, num => ({
      name: `${object} ${num}`,
    })),
  )
}
