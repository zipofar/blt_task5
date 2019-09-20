<template>
  <div class="container">
    <div>
      <h1>{{ page.title }}</h1>
    </div>
    <div>
      <h2>{{ page.greeting }}</h2>
    </div>
    <div>
      <p v-if="!isPrimaryPage">{{ page.content }}</p>
      <span v-if="isPrimaryPage" v-html="page.content"></span>
    </div>
    <a v-if="isCreator" href="#/">Edit</a>
    <ListPages v-if="isPrimaryPage"/>
  </div>
</template>

<script>
import axios from 'axios';
import ListPages from './ListPages.vue';

const apiBaseUrl = process.env.VUE_APP_APIURL;

export default {
  name: 'Page',
  data: function () {
    return {
      page: {},
      isPrimaryPage: false,
      isCreator: false,
    };
  },
  methods: {
    fetchPage: function () {
      const { id = 'primary' } = this.$route.params;
      this.isPrimaryPage = id === 'primary';
      axios({
        method: 'get',
        baseURL: apiBaseUrl,
        url: `/v1/pages/${id}`,
      })
      .then(({ data }) => {
        this.page = data;
        this.isCreator = data.user_id === this.$store.state.user.id;
      })
      .catch((err) => { console.log(err) })
    },
  },
  created: function () {
    this.fetchPage()
  },
  watch: {
    '$route': 'fetchPage'
  },
  components: {
    ListPages,
  },
}
</script>
