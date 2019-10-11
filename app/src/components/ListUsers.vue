<template>
  <div class="list-pages">
    <b-list-group v-for="user in users">
        <b-list-group-item class="d-flex justify-content-between align-items-center">
          {{ user.username }}
          <b-badge variant="primary" pill>{{ user.id }}</b-badge>
        </b-list-group-item>
    </b-list-group>
    <paginate
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
      currentPaginationNumber: 1,
      countPagination: 0,
      users: [],
    }
  },
  methods: {
    fetchPages (page) {
      axios({
        method: 'get',
        baseURL: apiBaseUrl,
        url: '/v1/users',
        params: { page },
     })
      .then(({ data }) => {
        this.users = data.users.map(e => (
          { ...e, url: `#/users/${e.id}` }
        ));
        this.countPagination = parseInt(data.countPagination);
      })
      .catch((err) => { console.log(err) })
    },
    paginationHandler(numPagination) {
      this.currentPaginationNumber=numPagination;
      this.fetchPages(numPagination);
    }
  },
  created() {
    this.fetchPages(this.currentPaginationNumber);
  },
}
</script>
