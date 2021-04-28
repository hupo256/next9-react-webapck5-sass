// import creatFech from './fetch'
import ajaxinstance from './index'

const caseCreate = () => {
  const cases = {}

  //案例查询选项(网站)
  cases.queryCaseOptionsForWeb = params => {
    return ajaxinstance.post('api/v1/wechat/case/queryCaseOptionsForWeb', params)
  }

  //查询案例列表(网站)
  cases.queryCaseListForWeb = params => {
    return ajaxinstance.post('api/v1/wechat/case/queryCaseListForWeb', params)
  }

  //根据案例ID查询案例(网站)
  cases.getCaseByUidForWeb = params => {
    return ajaxinstance.post('api/v1/wechat/case/getCaseByUidForWeb', params)
  }

  return cases
}

export default caseCreate()
