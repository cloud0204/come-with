<template>
  <div class="row">
    <div class="col-md-9 col-grow">
      <q-card class="my-card" flat bordered>
        <q-card-section>
          <div class="text-overline text-blue-9">
            <q-badge outline color="primary" label="tag.name" />
          </div>
          <div class="text-h1 q-mt-sm q-mb-xs">Title</div>
          <div
            class="text-caption text-grey"
            id="post"
            style="font-size: 16px"
          ></div>
        </q-card-section>

        <q-card-actions>
          <q-btn flat color="dark" label="Share" />
          <q-btn flat color="primary" label="Book" />

          <q-space />

          <q-btn
            color="grey"
            round
            flat
            dense
            :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click="expanded = !expanded"
          />
        </q-card-actions>

        <q-card-section>
          <div class="text-overline text-orange-9" style="font-size: 16px">
            3 Comments
          </div>
          <q-card class="my-card" flat bordered>
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>Title</q-item-label>
                <q-item-label caption> Subhead </q-item-label>
              </q-item-section>
            </q-item>

            <q-separator />

            <q-card-section horizontal>
              <q-card-section class="col">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </q-card-section>

              <q-separator vertical />

              <q-card-section>
                <q-card-actions>
                  <q-btn flat color="yellow">
                    Reply
                    <q-icon name="reply" />
                  </q-btn>
                </q-card-actions>
              </q-card-section>
            </q-card-section>
          </q-card>
        </q-card-section>

        <q-slide-transition>
          <div v-show="expanded">
            <q-separator />
            <q-card-section class="text-subitle2">
              <LeaveAcomment />
            </q-card-section>
          </div>
        </q-slide-transition>
      </q-card>
    </div>
    <div class="col-md-3 col-grow">
      <TabComponent />
    </div>
  </div>
</template>

<style lang="css" src="assets/css/style.css">
/* .single {
  padding: 90px;
} */
</style>

<script lang="ts">
// import { Todo, Meta } from 'components/models';
import LeaveAcomment from 'components/LeaveAcomment.vue';
import { defineComponent, onMounted, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useApi } from 'boot/axios';
import TabComponent from 'components/Tabs.vue';

export default defineComponent({
  name: 'PostDetail',
  components: { LeaveAcomment, TabComponent },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();
    // const postId = +route.params.postId as number;
    const postId = ref(+route.params.postId as number);
    const post: Ref<{ content: string }> = ref({ content: '' });
    const postRef = ref(null);

    onMounted(async () => {
      try {
        console.log('postId=' + postId.value);
        const { data } = await useApi().getPostContentByPostId(postId.value);
        console.log(data.data);
        post.value = data.data;
        const el = document.getElementById('post') as HTMLElement;
        el.innerHTML = data.data.content;
        // el.innerHTML = '<h2>Lorem ipsum dolor sit amerythehrtdfet9</h2>';
        // console.log(getCurrentInstance());
      } catch (error) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'NO post',
          icon: 'report_problem',
        });
        // router.go(-1);
      }
    });

    return {
      post,
      text: ref(''),
      postRef,
      postId,
      expanded: ref(false),
    };
  },
});
</script>
