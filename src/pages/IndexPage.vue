<template>
  <q-page class="row items-center justify-evenly">
    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
    {{ hi }}
    <button @click="change()">jjjjjjjj</button>
  </q-page>
</template>

<script lang="ts">
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import { computed, defineComponent, onMounted, ref, toRef } from 'vue';
import { useCounterStore } from 'stores/example-store';
import { aaa } from 'stores/api-store';

export default defineComponent({
  name: 'IndexPage',
  components: { ExampleComponent },
  setup() {
    const ss = useCounterStore();
    const aaapiu = aaa();
    const hi = toRef(aaapiu, 'hhhh');

    const gg = computed(() => {
      console.log(aaapiu.hhhh);
      console.log('gg999');
      return '999';
    });

    onMounted(async () => {
      console.log(aaapiu.hhhh);
      // await aaapiu.increment();
      // hi.value = aaapiu.hhhh;
    });
    const change = () => {
      aaapiu.changeH();
      // hi.value = aaapiu.hhhh;
    };
    const tttt = () => {
      return aaapiu.hhhh;
    };

    //     const jjj=()=>{
    //       if(hi.value==null){
    // return ''
    //       }
    //       return hi.value.editorType;
    //     }

    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'ct1' + ss.uuuu(),
      },
      {
        id: 2,
        content: 'ct2',
      },
      {
        id: 3,
        content: 'ct3',
      },
      {
        id: 4,
        content: 'ct4',
      },
      {
        id: 5,
        content: 'ct5',
      },
    ]);
    const meta = ref<Meta>({
      totalCount: 1200,
    });
    return { todos, meta, hi, change, tttt, gg };
  },
});
</script>
