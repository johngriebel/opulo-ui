<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col">
            </div>
            <div class="col">
                <form>
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input id="username" class="form-control" type="text" placeholder="Username" v-model="username">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input id="password" class="form-control" type="password" placeholder="Password" v-model="password">
                    </div>
                </form>
                <div class="row">
                    <div class="col">
                        <p>Don't have an account? <router-link to="/sign-up">Sign up</router-link>.</p>
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-primary float-right" v-on:click="login">Login</button>
                    </div>
                </div>
            </div>
            <div class="col">
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import config from '../../config';

    export default {
      name: 'landing-page',
      data() {
        return {
          username: '',
          password: '',
        };
      },
      beforeCreate() {
        const token = localStorage.getItem('opulo_token');
        console.log('token', token);
        if (token !== undefined && token !== null) {
          this.$router.push('/my-photos');
        }
      },
      methods: {
        login() {
          axios.post(`${config.OPULO_API_URL}/api-token-auth`, { username: this.username, password: this.password })
            .then((response) => {
              localStorage.setItem('opulo_token', response.data.token);
              this.$router.push('/my-photos');
            });
        },
      },
    };
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
