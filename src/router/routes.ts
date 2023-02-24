import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'DetailPage', component: () => import('pages/DetailPage.vue') },
      {
        path: 'PostsPage',
        component: () => import('pages/PostsPage.vue'),
      },
      {
        path: 'post/:postId',
        component: () => import('components/PostDetail.vue'),
        // children: [
        //   {
        //     path: ':postId',
        //     component: () => import('components/PostDetail.vue'),
        //   },
        // ],
      },
    ],
  },
  // {
  //   path: '/post',
  //   component: () => import('pages/PostsPage.vue'),
  //   children: [
  //     {
  //       path: ':postId',
  //       component: () => import('components/PostDetail.vue'),
  //     },
  //   ],
  // },
  // {
  //   path: '/post',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/IndexPage.vue') },
  //     { path: 'DetailPage', component: () => import('pages/DetailPage.vue') },
  //   ],
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
