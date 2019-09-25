<template>
  <div class="container">

    <div class="page_content" v-if="!showEditForm">
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
      <b-button v-if="isCreator" @click="onEdit" variant="outline-primary">Edit</b-button>
    </div>

    <div v-if="showEditForm">
      <b-form @submit="onSubmit">

        <b-form-group
          label="Title"
          label-for="form-page-title"
        >
          <b-form-input
            id="form-page-title"
            v-model="form.title"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Greeting text"
          label-for="form-page-greeting"
        >
          <b-form-input
            id="form-page-greeting"
            v-model="form.greeting"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Content"
          label-for="form-page-content"
        >
          <b-form-textarea
            id="form-page-content"
            v-model="form.content"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>

        <b-button type="submit" variant="primary">Save</b-button>

      </b-form>
    </div>
    <br/>
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
      form: {},
      page: {},
      isPrimaryPage: false,
      isCreator: false,
      showEditForm: false,
    };
  },
  methods: {
    fetchPage() {
      const { id = 'primary' } = this.$route.params;
      this.isPrimaryPage = id === 'primary';

      axios({
        method: 'get',
        baseURL: apiBaseUrl,
        url: `/v1/pages/${id}`,
      })
      .then(({ data }) => {
        this.page = data;
        this.form = data;
        this.isCreator = data.user_id === this.$store.state.user.id;
      })
      .catch((err) => { console.log(err) });
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.showEditForm = false;
      const id = this.page.id;

      axios({
        method: 'post',
        baseURL: apiBaseUrl,
        url: `/v1/pages/${id}`,
        data: this.form,
        headers: {
          'x-csrf-token': this.$cookie.get('csrf'),
        },
      })
      .then(({ data }) => {
        this.page = data;
        this.form = data;
        this.isCreator = data.user_id === this.$store.state.user.id;
      })
      .catch((err) => { console.log(err) });
    },
    onEdit() {
      this.showEditForm = true;
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
