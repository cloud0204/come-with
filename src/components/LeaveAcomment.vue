<template>
  <div class="comment-form">
    <h2>Leave a comment</h2>
    <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset">
      <q-input ref="nameRef" filled v-model="name" label="Your name *" hint="Name and surname" lazy-rules
        :rules="nameRules" />

      <q-input ref="emailRef" filled v-model="email" label="Your email *" lazy-rules :rules="emailRules" />

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
        <q-btn label="Submit" type="submit" class="btn btn-custom" />
        <q-btn label="Reset" type="reset" color="red" flat class="q-ml-sm btn btn-custom" />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar'

const name = ref('')
const nameRef = ref(null)

const email = ref('')
const emailRef = ref(null)
const emailErrorMsg = ref('')

const accept = ref(false)

const editor = ref('What you see is <b>what</b> you get.')



export default defineComponent({
  name: 'LeaveAcomment',
  // props: {
  //   editor: {
  //     type: String,
  //     default: ''
  //   },

  //   caption: {
  //     type: String,
  //     default: ''
  //   },

  //   link: {
  //     type: String,
  //     default: '#'
  //   },

  //   icon: {
  //     type: String,
  //     default: ''
  //   }
  // },
  setup() {
    const $q = useQuasar();
    const mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    function isEmail(val: string): boolean {
      let check = val.match(mailformat)
      if (check != null && val.length != 0) {
        return true;
      }
      return false
    }

    return {
      // name: ref(''),
      // email: ref(''),
      editor,

      saveWork() {
        $q.notify({
          message: 'Saved your text to local storage',
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done'
        })
      },
      name,
      nameRef,
      nameRules: [
        (val: string) => (val.length > 0) || 'Please type something'
      ],

      email,
      emailRef,
      emailRules: [
        (val: string) => (isEmail(val)) || 'Email format error',
        // (val: string) => ((val !== '' && typeof val === 'string' ? val.match(mailformat) : false)) || (val !== '' ? 'Email format error' : 'Please type your email'),
        // (val: string) => val.match(mailformat) || 'Email format error',
      ],
      emailErrorMsg,

      accept,

      onSubmit() {
        // nameRef.value.validate()
        // emailRef.value.validate()

        // if (nameRef.value.hasError || emailRef.value.hasError) {
        //   // form has error
        // }
        if (accept.value !== true) {
          $q.notify({
            color: 'negative',
            // message: 'You need to finish the table',
            message: editor.value
          })
        }
        else {
          $q.notify({
            icon: 'done',
            color: 'positive',
            message: 'Submitted',
          })
        }
      },

      onReset() {
        name.value = ''
        email.value = ''
        editor.value = ''

        // nameRef.value.resetValidation()
        // emailRef.value.resetValidation()
      },

      // isEmail(val: string): boolean {
      //   let check = val.match(mailformat)
      //   if (check != null && aa.length != 0) {
      //     return true;
      //   }

      //   emailErrorMsg.value = check != null ? 'Email format error' : 'Please type your email'
      //   return false
      // },
      // emailErrorMsg(){

      // }
    }
  }
});
</script>
