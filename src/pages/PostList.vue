<template>
  <!-- <q-page class="row items-center justify-evenly"> -->
    <!-- Page Header Start -->
    <div class="page-header">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h2>Upcoming Events</h2>
                    </div>
                    <div class="col-12">
                        <a href="">Home</a>
                        <a href="">Events</a>
                    </div>
                </div>
            </div>
    </div>
    <!-- Page Header End -->

    <!-- Event Start -->
    <div class="event">
        <div class="container">
            <div class="section-header text-center">
                <p>Upcoming Events</p>
                <h2>Be ready for our upcoming charity events</h2>
            </div>
            <div class="row  justify-around  items-stretch">
                <div class="col-sm-5">
                    <div class="event-item">
                        <img src="public/img/event-1.jpg" alt="Image">
                        <div class="event-content">
                            <div class="event-meta">
                                <p>
                                    <q-icon name="today" />
                                    01-Jan-45
                                </p>
                                <p>
                                    <q-icon name="schedule" />
                                    8:00 - 10:00
                                </p>
                                <p>
                                    <q-icon name="place" />
                                    New York
                                </p>
                            </div>
                            <div class="event-text">
                                <div class="column flex-center">
                                    <h3>Lorem ipsum dolor sit</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto quisquam dolor aliquam aspernatur eaque, saepe minus sapiente ab qui quae natus voluptates molestias libero ad hic! Iure minima mollitia odio.
                                    </p>
                                    
                                    <a class="btn btn-custom" href="">Join Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-5">
                    <div class="event-item">
                        <img src="public/img/event-1.jpg" alt="Image">
                        <div class="event-content">
                            <div class="event-meta">
                                <p>
                                    <q-icon name="today" />
                                    01-Jan-45
                                </p>
                                <p>
                                    <q-icon name="schedule" />
                                    8:00 - 10:00
                                </p>
                                <p>
                                    <q-icon name="place" />
                                    New York
                                </p>
                            </div>
                            <div class="event-text">
                                <div class="column flex-center">
                                    <h3>Lorem ipsum dolor sit</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor
                                    </p>
                                    
                                    <a class="btn btn-custom" href="">Join Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-5">
                    <div class="event-item">
                        <img src="public/img/event-1.jpg" alt="Image">
                        <div class="event-content">
                            <div class="event-meta">
                                <p>
                                    <q-icon name="today" />
                                    01-Jan-45
                                </p>
                                <p>
                                    <q-icon name="schedule" />
                                    8:00 - 10:00
                                </p>
                                <p>
                                    <q-icon name="place" />
                                    New York
                                </p>
                            </div>
                            <div class="event-text">
                                <div class="column flex-center">
                                    <h3>Lorem ipsum dolor sit</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor
                                    </p>
                                    
                                    <a class="btn btn-custom" href="">Join Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-5">
                    <div class="event-item">
                        <img src="public/img/event-1.jpg" alt="Image">
                        <div class="event-content">
                            <div class="event-meta">
                                <p>
                                    <q-icon name="today" />
                                    01-Jan-45
                                </p>
                                <p>
                                    <q-icon name="schedule" />
                                    8:00 - 10:00
                                </p>
                                <p>
                                    <q-icon name="place" />
                                    New York
                                </p>
                            </div>
                            <div class="event-text">
                                <div class="column flex-center">
                                    <h3>Lorem ipsum dolor sit</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor
                                    </p>
                                    
                                    <a class="btn btn-custom" href="">Join Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Event End -->
  <!-- </q-page> -->
</template>

<style lang="css" scoped>
@import url('assets/css/style');
    /* .single {
      padding: 90px;
    } */
</style>

<script lang="ts">
import { Todo, Meta } from 'components/models';
// import ExampleComponent from 'components/ExampleComponent.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PostList',
  // components: { ExampleComponent },
  setup () {
    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'ct1'
      },
      {
        id: 2,
        content: 'ct2'
      },
      {
        id: 3,
        content: 'ct3'
      },
      {
        id: 4,
        content: 'ct4'
      },
      {
        id: 5,
        content: 'ct5'
      }
    ]);
    const meta = ref<Meta>({
      totalCount: 1200
    });
    return { todos, meta };
  }
});
</script>
