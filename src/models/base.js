/**
 * 团队项目 建议使用分页开发模式，避免开发过程中互相覆盖或者错误修改
 */
import { getCompanyInfoOnFooter } from '../services';

export default {
  namespace: 'base',

  state: {
    // collapsed: false,
    // notices: [],
  },

  effects: {
    // *getCompanyInfoOnFooter(_, { call, put }) {
    //   const data = yield call(getCompanyInfoOnFooter);
    //   yield put({
    //     type: 'saveNotices',
    //     payload: data,
    //   });
    // },
    *getCompanyInfoOnFooter({ payload }, { call, put }) {
      const response = yield call(getCompanyInfoOnFooter, { ...payload });
      return response;
    },
  },

  reducers: {
    // changeLayoutCollapsed(state, { payload }) {
    //   return {
    //     ...state,
    //     collapsed: payload,
    //   };
    // },
    // saveNotices(state, { payload }) {
    //   return {
    //     ...state,
    //     notices: payload,
    //   };
    // },
    // saveClearedNotices(state, { payload }) {
    //   return {
    //     ...state,
    //     notices: state.notices.filter((item) => item.type !== payload),
    //   };
    // },
  },

  subscriptions: {
    // setup({ dispatch, history }) {
    //   // Subscribe history(url) change, trigger `load` action if pathname is `/`
    //   return history.listen(({ pathname, search }) => {
    //     let tok = getQueryUrlVal('token');
    //     if (tok) {
    //       setAuthority(tok);
    //       dispatch({
    //         type: 'login/loginTs',
    //         payload: {},
    //       });
    //     }
    //     if (typeof window.ga !== 'undefined') {
    //       window.ga('send', 'pageview', pathname + search);
    //     }
    //   });
    // },
  },
};
