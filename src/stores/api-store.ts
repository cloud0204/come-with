import { defineStore } from 'pinia';
import { useQuasar } from 'quasar';
import { api } from 'boot/axios';

const $q = useQuasar();

export const aaa = defineStore('hhhh', {
  state: () => ({
    hhhh: 1,
  }),
  getters: {
    doubleCount: (state) => state.hhhh,
  },
  actions: {
    increment() {
      // try {
      //   this.hhhh.editorType = await api
      //     .get('api/content/posts/slug?slug=gyhkytgfkiytf')
      //     .then(function (response) {
      //       console.log(response);
      //     });
      // } catch (error) {
      //   // console.log(error);
      //   $q.notify({
      //     color: 'negative',
      //     position: 'top',
      //     message: 'Connecting failed',
      //     icon: 'report_problem',
      //   });
      // }
      // console.log(this.hhhh.editorType);
      api
        .get('api/content/posts/slug?slug=gyhkytgfkiytf')
        .then((response) => {
          console.log(response.data.data);
          this.hhhh = response.data.data;
        })
        .catch(() => {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Connecting failed',
            icon: 'report_problem',
          });
        });
    },
    changeH() {
      this.hhhh = 2;
    },
  },
});
