<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Our Posts</div>
        <div class="text-subtitle2">by cloud</div>
      </q-card-section>

      <q-tabs v-model="tab" class="text-teal">
        <q-tab label="Popular" name="one" />
        <q-tab label="Latest" name="two" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="one">
          <q-card class="my-card" v-for="post in popularPosts" :key="post.id">
            <q-item clickable tag="a" :to="'/post/' + post.id" @click="aaa">
              <q-card class="my-card col">
                <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
                  <div class="absolute-bottom text-h6">
                    {{ post.title }}
                  </div>
                </q-img>

                <q-card-section>
                  <div class="row justify-start">
                    <p><q-icon name="visibility" /> {{ post.visits }} /</p>
                    <p>
                      <q-icon name="schedule" />
                      {{ new Date(post.updateTime).toISOString().slice(0, 10) }}
                    </p>
                  </div>
                </q-card-section>
              </q-card>
            </q-item>
          </q-card>
        </q-tab-panel>

        <q-tab-panel name="two">
          <q-card class="my-card" v-for="post in latestPosts" :key="post.id">
            <q-item clickable tag="a" :to="'/post/' + post.id">
              <q-card class="my-card col">
                <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
                  <div class="absolute-bottom text-h6">
                    {{ post.title }}
                  </div>
                </q-img>

                <q-card-section>
                  <div class="row justify-start">
                    <p><q-icon name="visibility" /> {{ post.visits }} /</p>
                    <p>
                      <q-icon name="schedule" />
                      {{ new Date(post.updateTime).toISOString().slice(0, 10) }}
                    </p>
                  </div>
                </q-card-section>
              </q-card>
            </q-item>
          </q-card>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<style lang="css" scoped>
@import url('assets/css/style');
img {
  width: 100%;
}
</style>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useApi } from 'boot/axios';
import { Post } from './models';
// import { aaa } from 'src/stores/api-store';

export default defineComponent({
  name: 'TabComponent',
  // components: { ExampleComponent },
  setup() {
    const $q = useQuasar();
    const popularPosts: Ref<Post[]> = ref([]);
    const latestPosts: Ref<Post[]> = ref([]);

    onMounted(async () => {
      try {
        const data1 = await (await useApi().getPopularPosts()).data;
        popularPosts.value = data1.data.content;

        const data2 = await (await useApi().getLatestPosts()).data;
        latestPosts.value = data2.data.content;
      } catch (error) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Api connecting failed',
          icon: 'report_problem',
        });
      }
    });
    function aaa() {
      console.log('999');
    }
    return { popularPosts, latestPosts, tab: ref('one'), aaa };
  },
});
</script>
