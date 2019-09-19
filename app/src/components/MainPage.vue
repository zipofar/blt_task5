<template>
  <div class="page">
    <h1>{{ page.title }}</h1>
    <h2>{{ page.greeting }}</h2>
    <p>{{ page.content }}</p>
    <ListPages />
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
    };
  },
  methods: {
    fetchPage: function () {
      axios({
        method: 'get',
        baseURL: apiBaseUrl,
        url: `/v1/pages/primary`,
      })
      .then(({ data }) => {
        this.page = data;
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
    }
}
</script>
