<template>
  <div v-show="fetchStatePages === 'success'" class="list-pages">
    <div v-for="page in pages">
      <b-card
        :title="page.title"
      >
        <b-card-text>{{ page.greeting }}</b-card-text>
        <b-link v-bind:href=page.url>Read more...</b-link>
      </b-card>
    </div>
    <paginate
      :force-page=numCurrentPagination
      :page-count=countPagination
      :click-handler="paginationHandler"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :pageLinkClass="'page-link'"
      :prevClass="'page-item'"
      :prevLinkClass="'page-link'"
      :nextClass="'page-item'"
      :nextLinkClass="'page-link'"
    >
    </paginate>
  </div>
</template>

<script>
import axios from 'axios';

const apiBaseUrl = process.env.VUE_APP_APIURL;

export default {
  name: 'ListPages',
  data: function () {
    return {
      numCurrentPagination: 1,
      countPagination: 0,
      pages: [],
      fetchStatePages: '',
    }
  },
  methods: {
    fetchPages(page) {
      this.fetchStatePages = 'request';
      axios({
        method: 'get',
        baseURL: apiBaseUrl,
        url: '/v1/pages',
        params: { page },
     })
      .then(({ data }) => {
        this.fetchStatePages = 'success';
        this.pages = data.pages.map(e => (
          { ...e, url: `#/pages/${e.id}` }
        ));
        this.countPagination = parseInt(data.countPagination);
      })
      .catch((err) => { console.log(err) })
    },
    paginationHandler(numPagination) {
      this.numCurrentPagination=numPagination;
      this.fetchPages(numPagination)
    }
  },
  created() {
    const numCurrentPagination = this.$store.getters.numCurrentPagination;
    this.numCurrentPagination = numCurrentPagination;
    this.fetchPages(numCurrentPagination);
  },
}
</script>
