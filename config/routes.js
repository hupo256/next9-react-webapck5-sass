export default [
  {
    path: '/',
    routes: [
      {
        path: '/',
        routes: [
          {
            name: 'Home Page',
            path: '/',
            component: './Home',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
