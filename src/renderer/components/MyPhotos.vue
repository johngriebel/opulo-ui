<template>
    <div class="container is-fluid">
        <figure class="image is-128x128">
            <img id="logo" src="~@/assets/logo.png" alt="opulo">
        </figure>
        <nav class="pagination" role="navigation" aria-label="pagination">
            <a class="pagination-previous" v-on:click="previousPageClicked">Previous</a>
            <a class="pagination-next" v-on:click="nextPageClicked">Next</a>
        </nav>
        <div class="card" v-for="photo in photos">
            <div class="card-image">
                <figure class="image">
                    <img :src="photo.on_disk">
                </figure>
            </div>
            <div class="card-content">
                <p class="title is-4" v-if="photo.provider === 'reddit'">{{photo.provider_specific_data.title}}</p>
                <p class="title is-4" v-else-if="photo.provider === '500px'">{{photo.provider_specific_data.name}}</p>
                <p class="subtitle is-6">{{photo.provider}}</p>
            </div>
        </div>

    </div>

</template>

<script>
    import axios from 'axios';
    import config from '../../config';

    export default {
      name: 'MyPhotos',
      data() {
        return {
          photos: [],
          nextPage: '',
          previousPage: '',
          currentPageNum: 1,
          totalPages: 0,
        };
      },
      methods: {
        previousPageClicked() {
          const requestConfig = {
            headers: { Authorization: `Bearer ${localStorage.getItem('opulo_token')}` },
          };
          if (this.previousPage !== '') {
            axios.get(this.previousPage, requestConfig)
              .then((response) => {
                this.photos = response.data.results;
                this.previousPage = response.data.previous;
                this.nextPage = response.data.next;
                this.currentPageNum -= 1;
              });
          }
        },
        nextPageClicked() {
          const requestConfig = {
            headers: { Authorization: `Bearer ${localStorage.getItem('opulo_token')}` },
          };
          if (this.nextPage !== '') {
            axios.get(this.nextPage, requestConfig)
              .then((response) => {
                this.photos = response.data.results;
                this.previousPage = response.data.previous;
                this.nextPage = response.data.next;
                this.currentPageNum += 1;
              });
          }
        },
      },
      created() {
        const requestConfig = {
          headers: { Authorization: `Bearer ${localStorage.getItem('opulo_token')}` },
        };
        axios.get(`${config.OPULO_API_URL}/user-media/photos/?page=${this.currentPageNum}`, requestConfig)
          .then((response) => {
            this.photos = response.data.results;
            this.nextPage = response.data.next;
            this.previousPage = response.data.previous;
            this.totalPages = Math.ceil(response.data.count / this.photos.length);
          });
      },
    };
</script>

<style scoped>

</style>