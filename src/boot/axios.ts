import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { Comment } from '../components/models';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: 'http://127.0.0.1:8090/',
  headers: {
    'API-Authorization': 'joe2.0',
  },
});

const useApi = () => {
  const getPosts = () =>
    api.get(
      '/api/content/posts?page=0&size=4&keyword=&sort=topPriority%2CcreateTime%2Cdesc'
    );
  const getPostsByPage = (page: number) =>
    api.get(
      '/api/content/posts?page=' +
        page +
        '&size=4&keyword=&sort=topPriority%2CcreateTime%2Cdesc'
    );
  const getPostByPostId = (postId: number) =>
    api.get('/api/content/posts/' + postId);
  const getPostContentByPostId = (postId: number) =>
    api.get('/api/content/posts/post/' + postId);
  const getListYearArchives = () => api.get('/api/content/archives/years');
  const getLatestPosts = () =>
    api.get('/api/content/posts?size=5&sort=topPriority%2CcreateTime%2Cdesc');
  const getPopularPosts = () =>
    api.get('/api/content/posts?size=5&sort=topPriority%2Cvisits%2Cdesc');
  const getTags = () => api.get('/api/content/tags/');
  const getPostsByTag = (slug: string) =>
    api.get('/api/content/tags/' + slug + '/posts');
  const getPostCommentsByPostId = (postId: number) =>
    api.get('/api/content/posts/' + postId + '/comments/tree_view');
  const getPostsByKeyword = (keyword: string) =>
    api.get('/api/content/search?string=' + keyword + '/comments/');
  const doComment = (payload: Comment) =>
    api.post('/api/content/posts/comments', payload);

  return {
    getPosts,
    getPostsByPage,
    getPostByPostId,
    getPostContentByPostId,
    getListYearArchives,
    getLatestPosts,
    getPopularPosts,
    getTags,
    getPostsByTag,
    getPostCommentsByPostId,
    getPostsByKeyword,
    doComment,
  };
};

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api, useApi };
