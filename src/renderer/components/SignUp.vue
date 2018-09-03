<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col">

            </div>
            <div class="col">
                <form>
                    <div class="form-group">
                        <label for="first_name">First Name</label>
                        <input id="first_name" class="form-control" type="text" placeholder="First name" v-model="first_name">
                    </div>
                    <div class="form-group">
                        <label for="last_name">Last Name</label>
                            <input id="last_name" class="form-control" type="text" placeholder="Last name" v-model="last_name">
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input id="email" class="form-control" type="email" placeholder="Email" v-model="email">
                    </div>
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input id="username" class="form-control" type="text" placeholder="Username" v-model="username">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input id="password" class="form-control" type="password" placeholder="Password" v-model="password">
                    </div>
                    <div class="form-group">
                        <label for="confirm_password">Confirm Password</label>
                        <input id="confirm_password" class="form-control" type="password" placeholder="Confirm Password" v-model="confirm_password">
                    </div>
                </form>
                <div class="row">
                    <div class="col">
                        <p>Already have an account? <router-link to="/login">login</router-link>.</p>
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-primary float-right" v-on:click="signUp">Sign Up</button>
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
      name: 'SignUp',
      data() {
        return {
          first_name: '',
          last_name: '',
          email: '',
          username: '',
          password: '',
          confirm_password: '',
        };
      },
      methods: {
        signUp() {
          const userData = {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            username: this.username,
            password: this.password,
            confirm_password: this.confirm_password,
          };
          axios.post(`${config.OPULO_API_URL}/auth/user/`, userData)
            .then((response) => {
              if (response.status === 201) {
                this.$router.push('/login');
              }
            });
        },
      },
    };
</script>

<style scoped>

</style>