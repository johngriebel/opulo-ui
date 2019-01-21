  <template>
    <div class="container-fluid">
        <!--nav class="pagination" role="navigation" aria-label="pagination">
            <a class="pagination-previous" v-on:click="previousPageClicked">Previous</a>
            <a class="pagination-next" v-on:click="nextPageClicked">Next</a>
        </nav-->
        <div class="row">
            <div class="col">
                <nav>
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" v-on:click="previousPageClicked">Previous</a></li>
                        <li class="page-item" v-for="page in pagesToDisplay" v-bind:class="{ active: page === currentPageNum }" v-on:click="navToPageByNumber(page)"><a class="page-link">{{page}}</a></li>
                        <li class="page-item"><a class="page-link" v-on:click="nextPageClicked">Next</a></li>
                    </ul>
                </nav>
            </div>
            <div class="col">
                <router-link to="/photo-upload"><button type="button" class="btn btn-primary float-right">Upload Photo</button></router-link>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="card mb-2" v-for="photo in photos">
                    <img class="card-img-top" :src="photo.on_disk">
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <h5 class="card-title" v-if="photo.provider === 'reddit'">{{photo.provider_specific_data.title}}</h5>
                                <h5 class="card-title" v-else-if="photo.provider === '500px'">{{photo.provider_specific_data.name}}</h5>
                                <p class="card-text">{{photo.provider}}</p>
                                <p class="card-text">
                                    <span class="badge badge-info mr-1" v-for="tag in photo.tags">
                                        {{tag}}
                                        <span aria-hidden="false" v-on:click="removeTag(photo.id, tag)">&times;</span>
                                    </span>
                                    <i class="fas fa-plus" v-on:click="addTags = !addTags"></i>

                                </p>
                                <div class="input-group mb-3" v-if="addTags">
                                    <input type="text" class="form-control" placeholder="Add new tags separated with a space" aria-describedby="addTagButton">
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary" type="button" id="addTagButton">Add</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col text-right">
                                <p class="card-text">{{prettifyDate(photo.created_timestamp)}}</p>
                                <p class="card-text">Views: {{photo.view_count}}</p>
                            </div>
                        </div>
                    </div>
                </div>
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
          pagesToDisplay: [],
          addTags: false,
        };
      },
      methods: {
        calculatePagination() {
          this.pagesToDisplay = [];
          if (this.currentPageNum - 1 > 0) {
            this.pagesToDisplay.push(this.currentPageNum - 1);
          }
          this.pagesToDisplay.push(this.currentPageNum);
          if (this.currentPageNum + 1 <= this.totalPages) {
            this.pagesToDisplay.push(this.currentPageNum + 1);
          }
        },
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
                this.calculatePagination();
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
                this.calculatePagination();
              });
          }
        },
        navToPageByNumber(pageNum) {
          const requestConfig = {
            headers: { Authorization: `Bearer ${localStorage.getItem('opulo_token')}` },
          };
          const fullURL = `${config.OPULO_API_URL}/user-media/photos/?page=${pageNum}`;

          axios.get(fullURL, requestConfig)
            .then((response) => {
              this.photos = response.data.results;
              this.nextPage = response.data.next;
              this.previousPage = response.data.previousPage;
              this.currentPageNum = pageNum;
              this.calculatePagination();
            });
        },
        prettifyDate(dateStr) {
          const [date, time] = dateStr.split('T');
          const [year, month, day] = date.split('-');
          const [hour, minute] = time.split(':');
          return `${month}/${day}/${year} ${hour}:${minute}`;
        },
        removeTag(postId, tag) {
          console.log('postId', postId, 'tag', tag);
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
            this.calculatePagination();
          });
      },
    };
</script>

<style scoped>

</style>
