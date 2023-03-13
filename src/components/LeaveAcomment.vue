<template>
  <div class="comment-form">
    <div class="text-overline text-orange-9" style="font-size: 16px">
      Leave a comment
    </div>
    <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset">
      <q-input
        ref="nameRef"
        filled
        v-model="name"
        label="Your name *"
        hint="Name and surname"
        lazy-rules
        :rules="nameRules"
      />

      <q-input
        ref="emailRef"
        filled
        v-model="email"
        label="Your email *"
        lazy-rules
        :rules="emailRules"
      />

      <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

      <div class="form-group">
        <label for="message">Message *</label>
        <div class="q-pa-md q-gutter-sm">
          <q-editor v-model="editor" min-height="5rem" />

          <q-card flat bordered>
            <q-card-section>
              <pre style="white-space: pre-line">{{ editor }}</pre>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div>
        <q-btn label="Post Comment" type="submit" class="btn btn-custom" />
        <q-btn
          label="Reset"
          type="reset"
          color="red"
          flat
          class="q-ml-sm btn btn-custom"
        />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref, toRef } from 'vue';
import { useQuasar } from 'quasar';
import { useApi } from 'boot/axios';
import { Comment } from './models';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'LeaveAcomment',
  props: {
    // postId: {
    //   type: Number,
    //   default: 1,
    // },

    parentId: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const postId = toRef(route.params, 'postId');
    const mailformat =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    const name = ref('');
    const nameRef = ref(null);

    const email = ref('');
    const emailRef = ref(null);
    // const dasf:string = []

    const accept = ref(false);

    const editor = ref('What you see is <b>what</b> you get.');

    const commentList = ref(null);

    const payload: Ref<Comment> = ref({
      author: name,
      // authorUrl: string;
      content: editor,
      email: email,
      postId: +postId.value,
      parentId: props.parentId,
    });

    function isEmail(val: string): boolean {
      let check = val.match(mailformat);
      if (check != null && val.length != 0) {
        return true;
      }
      return false;
    }

    const doComment = async () => {
      try {
        const { data } = await useApi().doComment(payload.value);
        console.log(data.data);
        if (nameRef.value !== null) {
          console.log(nameRef.value);
        }

        commentList.value = data.data;
      } catch (error) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Api connecting failed',
          icon: 'report_problem',
        });
      }
    };

    return {
      postId,
      commentList,
      // name: ref(''),
      // email: ref(''),
      editor,

      // saveWork() {
      //   $q.notify({
      //     message: 'Saved your text to local storage',
      //     color: 'green-4',
      //     textColor: 'white',
      //     icon: 'cloud_done'
      //   })
      // },
      name,
      nameRef,
      nameRules: [(val: string) => val.length > 0 || 'Please type something'],

      email,
      emailRef,
      emailRules: [
        (val: string) => isEmail(val) || 'Email format error',
        // (val: string) => ((val !== '' && typeof val === 'string' ? val.match(mailformat) : false)) || (val !== '' ? 'Email format error' : 'Please type your email'),
        // (val: string) => val.match(mailformat) || 'Email format error',
      ],
      // errorMsg,

      accept,
      payload,

      onSubmit() {
        // nameRef.value.validate()
        // emailRef.value.validate()

        // if (nameRef.value.hasError || emailRef.value.hasError) {
        //   // form has error
        // }
        const errorMsg: string[] = [];

        if (name.value === '') errorMsg.push('Please type your name');
        if (!isEmail(email.value))
          errorMsg.push('Please check your Email format');
        if (editor.value === '') errorMsg.push('Please type your message');

        if (errorMsg.length > 0) {
          for (let msg of errorMsg) {
            $q.notify({
              color: 'negative',
              // message: 'You need to finish the table',
              message: msg,
            });
          }
        } else {
          doComment();
          router.go(0);
          $q.notify({
            icon: 'done',
            color: 'positive',
            message: 'Submitted',
          });
        }
      },

      onReset() {
        name.value = '';
        email.value = '';
        editor.value = '';

        // nameRef.value.resetValidation()
        // emailRef.value.resetValidation()
      },
    };
  },
});
</script>
