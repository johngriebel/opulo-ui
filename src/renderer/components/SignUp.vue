<template>
    <div class="container is-fluid">
        <figure class="image is-128x128">
            <img id="logo" src="~@/assets/logo.png" alt="opulo">
        </figure>
        <div class="box">
            <div class="field">
                <label class="label">First Name</label>
                <div class="control">
                    <input class="input" type="text" placeholder="First name" v-model="first_name">
                </div>
            </div>
            <div class="field">
                <label class="label">Last Name</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Last name" v-model="last_name">
                </div>
            </div>
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input class="input" type="email" placeholder="Email" v-model="email">
                </div>
            </div>
            <div class="field">
                <label class="label">Username</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Username" v-model="username">
                </div>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input class="input" type="password" placeholder="Password" v-model="password">
                </div>
            </div>
            <div class="field">
                <label class="label">Confirm Password</label>
                <div class="control">
                    <input class="input" type="password" placeholder="Confirm Password" v-model="confirm_password">
                </div>
            </div>
            <div class="level">
                <div class="level-left">
                    <div class="level-item">
                        <p></p>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <button class="button" v-on:click="signUp">Sign Up</button>
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