<template>
    <div class="container-fluid">
        <div class="row">
            <form>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <button class="btn btn-outline-secondary" type="button" v-on:click="uploadPhotos">Upload</button>
                    </div>
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="photoUpload" v-on:change="handleFileSelection($event)" multiple>
                        <label class="custom-file-label" for="photoUpload">Choose Photos</label>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import config from '../../config';

    export default {
      name: 'PhotoUpload',
      data() {
        return {
          files: [],
        };
      },
      methods: {
        handleFileSelection(event) {
          const filesSelected = event.target.files;
          this.files = filesSelected;
        },
        uploadPhotos() {
          console.log('uploadPhotos button clicked');
          const formData = new FormData();

          for (let i = 0; i < this.files.length; i += 1) {
            const file = this.files[i];
            formData.append(`files[${i}]`, file);
          }
          console.log('formData', formData);
          const fullURL = `${config.OPULO_API_URL}/user-media/upload/`;
          const requestConfig = {
            headers: { Authorization: `Bearer ${localStorage.getItem('opulo_token')}` },
          };
          axios.post(fullURL, formData, requestConfig)
            .then((response) => {
              this.$router.push('/my-photos');
            });
        },
      },
    };
</script>

<style scoped>

</style>
