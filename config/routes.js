export default [
  {
    name: '首页',
    path: '/',
    component: './Home',
  },
  {
    name: '案例',
    path: '/case',
    component: './Case',
  },
  {
    name: '设计师',
    path: '/designer',
    component: './Designer',
  },
  {
    name: '工地',
    path: '/site',
    component: './Site',
  },
  {
    name: '装修技巧',
    path: '/post',
    component: './Post',
  },
  {
    name: '装修技巧', // 务必与其父节点 name 相同， breadCrumb 需要使用
    path: '/post/:id',
    component: './Post',
    hide: true,
  },
  {
    component: './404',
  },
];
