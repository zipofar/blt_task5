<template>
  <div class="container">
    <div>
      <h1>{{ page.title }}</h1>
    </div>
    <div>
      <h2>{{ page.greeting }}</h2>
    </div>
    <div>
      <p>{{ page.content }}</p>
    </div>
    <ListPages v-if="pageId === 'primary'"/>
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
      pageId: '',
    };
  },
  methods: {
    fetchPage: function () {
      const { id = 'primary' } = this.$route.params;
      this.pageId = id;
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
  components: {
    ListPages,
  },
}
</script>
