/**
 * 团队项目 建议使用分页开发模式，避免开发过程中互相覆盖或者错误修改
 */

import request from '../utils/request';
import baseUrl from './config';

export async function findAllChannel(params) {
  return request(baseUrl + '/api/v1/saas/systemdic/query', {
    method: 'POST',
    body: params,
  });
}

export async function getCompanyInfoOnFooter(params) {
  return request(baseUrl + '/api/v1/wechat/website/companyinfo/get', {
    method: 'POST',
    body: params,
  });
}
