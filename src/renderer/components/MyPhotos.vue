<template>
    <div class="container is-fluid">
        <figure class="image is-128x128">
            <img id="logo" src="~@/assets/logo.png" alt="opulo">
        </figure>
        <div class="card" v-for="photo in photos">
            <div class="card-image">
                <figure class="image">
                    <img :src="photo.on_disk">
                </figure>
            </div>
            <div class="card-content">
                <p class="title is-4">{{photo.provider}}</p>
                <time :datetime="photo.created_timestamp">{{photo.created_timestamp}}</time>
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
        };
      },
      created() {
        const requestConfig = {
          headers: { Authorization: `Bearer ${localStorage.getItem('opulo_token')}` },
        };
        axios.get(`${config.OPULO_API_URL}/user-media/photos/`, requestConfig)
          .then((response) => {
            this.photos = response.data.results;
            this.nextPage = response.data.next;
          });
      },
    };
</script>

<style scoped>

</style>