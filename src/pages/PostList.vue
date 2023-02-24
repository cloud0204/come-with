<template>
  <div class="row">
    <div class="col-md-9 col-grow">
      <q-page-container>
        <router-view />
      </q-page-container>
      <div class="q-pa-md items-start q-gutter-md">
        <q-card
          class="my-card"
          flat
          bordered
          v-for="post in posts"
          :key="post.id"
        >
          <q-item clickable tag="a" :to="'/post/' + post.id">
            <q-card-section horizontal>
              <div class="col-3">
                <q-img
                  :src="post.thumbnail || 'http://placeimg.com/640/480/nature'"
                  :to="'post/' + post.id"
                />
              </div>
              <div class="col-9">
                <q-card-section>
                  <div class="text-h5 q-mt-sm q-mb-xs">{{ post.title }}</div>
                  {{ post.summary }}
                  <div class="flex justify-start col self-end">
                    <p>
                      <q-icon name="visibility" />
                      {{ post.visits }}/
                    </p>
                    <p>
                      <q-icon name="schedule" />
                      {{
                        new Date(post.updateTime).toISOString().slice(0, 10)
                      }}/
                    </p>
                    <p>
                      <q-icon name="comment" />
                      {{ post.commentCount }}
                    </p>
                  </div>
                  <q-badge outline color="primary" label="Outline" />
                </q-card-section>
              </div>
            </q-card-section>
          </q-item>
        </q-card>
        <div class="q-pa-lg flex flex-center">
          <div class="q-gutter-md">
            <q-pagination
              v-model="currentPage"
              :max="pages"
              direction-links
              outline
              color="orange"
              active-design="unelevated"
              active-color="brown"
              active-text-color="orange"
              @click="changePage(currentPage - 1)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3 col-grow">
      <TabComponent />
    </div>
  </div>
</template>

<style lang="css" scoped>
@import url('assets/css/style');
/* .single {
      padding: 90px;
    } */
</style>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useApi } from 'boot/axios';
import { Post } from '../components/models';
import TabComponent from 'components/Tabs.vue';

export default defineComponent({
  name: 'PostList',
  components: { TabComponent },
  setup() {
    const $q = useQuasar();
    const posts: Ref<Post[]> = ref([]);
    const currentPage = ref(1);
    const pages = ref(1);
    // function aaa(todos: Ref<Post[]>): Ref<Post[]> {
    //   const todoCount: Ref<Post[]> = async () => {

    //   try {
    //     const { data } = await useApi().getPosts;
    //     console.log(data.data);
    //     return data.data.content;

    //   } catch (error) {
    //     $q.notify({
    //       color: 'negative',
    //       position: 'top',
    //       message: 'Api connecting failed',
    //       icon: 'report_problem',
    //     });
    //   }
    // };
    //   return todoCount;
    // }
    const changePage = async (page: number) => {
      try {
        const { data } = await useApi().getPostsByPage(page);
        console.log(data.data);
        posts.value = data.data.content;
        currentPage.value = data.data.page + 1;
        pages.value = data.data.pages;
      } catch (error) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Api connecting failed',
          icon: 'report_problem',
        });
      }
    };

    onMounted(async () => {
      try {
        const { data } = await useApi().getPosts();
        console.log(data.data);
        posts.value = data.data.content;
        currentPage.value = data.data.page + 1;
        pages.value = data.data.pages;
      } catch (error) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Api connecting failed',
          icon: 'report_problem',
        });
      }
    });
    return { posts, currentPage, pages, changePage };
  },
});
</script>
