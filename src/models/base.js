import { getCompanyInfoOnFooter, queryCaseListForWeb } from '../services';

export default {
  namespace: 'base',

  state: {
    // collapsed: false,
    // notices: [],
  },

  effects: {
    *getCompanyInfoOnFooter({ payload }, { call, put }) {
      const response = yield call(getCompanyInfoOnFooter, { ...payload });
      return response;
    },

    *queryCaseListForWeb({ payload }, { call, put }) {
      const response = yield call(queryCaseListForWeb, { ...payload });
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
