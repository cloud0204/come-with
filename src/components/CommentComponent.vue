<template>
  <q-card
    class="my-card"
    flat
    bordered
    v-for="(comment, index) in getComments"
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
        <q-item-label caption> {{ comment.email }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />
    <q-card-section horizontal>
      <q-card-section
        class="col"
        v-bind:innerHTML="comment.content"
      ></q-card-section>
      <q-card-section>
        <q-card-actions>
          <q-btn
            flat
            color="yellow"
            @click="expanded[index] = !expanded[index]"
          >
            Reply
            <q-icon name="reply" />
          </q-btn>
        </q-card-actions>
      </q-card-section>
    </q-card-section>
    <q-slide-transition>
      <div v-show="expanded[index]">
        <q-separator />
        <q-card-section class="text-subitle2">
          <LeaveAcomment :parentId="comment.id" />
        </q-card-section>
      </div>
    </q-slide-transition>

    <div class="row" v-if="comment.children != undefined">
      <div class="col-1"></div>
      <div class="col-11">
        <CommentComponent :comments="comment.children" />
      </div>
    </div>
  </q-card>
</template>

<style lang="css" scoped>
@import url('assets/css/style');
img {
  width: 100%;
}
</style>

<script lang="ts">
import { defineComponent, onMounted, PropType, Ref, ref, toRef } from 'vue';
import { useQuasar } from 'quasar';
import { useApi } from 'boot/axios';
import { Post } from './models';
import LeaveAcomment from 'components/LeaveAcomment.vue';
// import CommentB from 'components/CommentB.vue';
import { Comment } from 'components/models';
// import { aaa } from 'src/stores/api-store';

export default defineComponent({
  name: 'CommentComponent',
  props: {
    comments: { type: Array as PropType<Comment[]> },
    // comments: Array,
  },
  components: { LeaveAcomment },
  setup(props) {
    // const getComments = ref(props.comments as Comment[]);
    const getComments = toRef(props, 'comments');
    const expanded: Ref<boolean[]> = ref(
      Array(getComments.value?.length).fill(false)
    );
    return { expanded, getComments };
  },
});
</script>
