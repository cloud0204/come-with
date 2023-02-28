<template>
  <div class="row">
    <div class="col-md-9 col-grow">
      <q-card class="my-card" flat bordered>
        <q-card-section>
          <div class="text-overline text-blue-2">
            <q-badge
              outline
              color="primary"
              :label="tag.slug"
              v-for="tag in post.tags"
              :key="tag.slug"
              size="50px"
              class="text-h6"
            />
          </div>
          <div class="text-h1 q-mt-sm q-mb-xs">{{ post.title }}</div>
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
            {{ post.commentCount }} Comments
          </div>
          <LeaveAcomment />
          <!-- <q-card
            class="my-card"
            flat
            bordered
            v-for="comment in comments"
            :key="comment.id"
          >
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ comment.author }}</q-item-label>
                <q-item-label caption> {{ comment.email }} </q-item-label>
              </q-item-section>
            </q-item>

            <q-separator />

            <q-card-section horizontal>
              <q-card-section class="col">
                {{ comment.content }}
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
            <q-slide-transition>
              <div v-show="expanded">
                <q-separator />
                <q-card-section class="text-subitle2">
                  <LeaveAcomment />
                </q-card-section>
              </div>
            </q-slide-transition>

            <CommentComponent :children="comment.children" />
          </q-card> -->
          <CommentComponent :comments="comments" />
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-3 col-grow">
      <TabComponent :refreshPage="refreshPage()" />
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
import TabComponent from 'components/Tabs.vue';
import CommentComponent from 'src/components/CommentComponent.vue';
import { defineComponent, Ref, ref, toRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useApi } from 'boot/axios';
import { Post, Comment } from './models';

export default defineComponent({
  name: 'PostDetail',
  components: { LeaveAcomment, TabComponent, CommentComponent },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();
    // const postId = +route.params.postId as number;
    // const postId = ref(+route.params.postId as number);
    const postId = toRef(route.params, 'postId');
    const post: Ref<Post> = ref({}) as Ref<Post>;
    const postContent: Ref<{ content: string }> = ref({}) as Ref<{
      content: string;
    }>;
    const comments: Ref<Comment[]> = ref([]) as Ref<Comment[]>;
    // const postRef = ref(null);

    const refreshPage = async () => {
      try {
        const postId = route.params.postId as string;
        console.log('postId=' + postId);

        const data1 = (await useApi().getPostContentByPostId(postId)).data.data;
        console.log(data1);
        postContent.value = data1;
        const el = document.getElementById('post') as HTMLElement;
        el.innerHTML = data1.content;
        // el.innerHTML = '<h2>Lorem ipsum dolor sit amerythehrtdfet9</h2>';
        // console.log(getCurrentInstance());

        const data2 = (await useApi().getPostByPostId(+postId)).data.data;
        post.value = data2;
        console.log(data2);

        const data3 = (await useApi().getPostCommentsByPostId(+postId)).data
          .data;
        comments.value = data3.content;
        console.log(data3);
      } catch (error) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'NO post',
          icon: 'report_problem',
        });
        router.go(-1);
      }
    };

    // onMounted(async () => {
    //   try {
    //     console.log('postId=' + postId.value);
    //     const { data } = await useApi().getPostContentByPostId(
    //       postId.value as string
    //     );
    //     console.log(data.data);
    //     post.value = data.data;
    //     const el = document.getElementById('post') as HTMLElement;
    //     el.innerHTML = data.data.content;
    //     // el.innerHTML = '<h2>Lorem ipsum dolor sit amerythehrtdfet9</h2>';
    //     // console.log(getCurrentInstance());
    //   } catch (error) {
    //     $q.notify({
    //       color: 'negative',
    //       position: 'top',
    //       message: 'NO post',
    //       icon: 'report_problem',
    //     });
    //     // router.go(-1);
    //   }
    // });

    return {
      post,
      text: ref(''),
      postId,
      comments,
      expanded: ref(false),
      refreshPage,
    };
  },
});
</script>
