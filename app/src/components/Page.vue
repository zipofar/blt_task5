<template>
  <div class="container">
    <div class="row">
      <h1>{{ page.title }}</h1>
    </div>
    <div class="row">
      <h2>{{ page.greeting }}</h2>
    </div>
    <div class="row">
      <p>{{ page.content }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

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
      const { id } = this.$route.params;
      axios({
        method: 'get',
        baseURL: apiBaseUrl,
        url: `/v1/pages/${id}`,
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
}
</script>
