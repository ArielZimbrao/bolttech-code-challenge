<template>
  <div class="login-container">
    <div class="form-container">
        <div class="title-container">
            <span>Bolttech TODO List</span>
        </div>
        <div class="form">
            <div class="container-field-form">
                <span class="label">Email</span>
                <input
                    type="text"
                    class="field-form"
                    placeholder="E-mail*"
                    v-bind:class="{ invalid: v$.form.email.$errors.length > 0 }" 
                    v-model="form.email"
                />
            </div>
            <div class="container-field-form">
                <span class="label">Password</span>
                <input
                    type="password"
                    class="field-form"
                    placeholder="Password*"
                    v-bind:class="{ invalid: v$.form.password.$errors.length > 0 }" 
                    v-model="form.password"
                />
            </div>
            <div class="button-container">
                <button class="button" :type="type" v-on:click="login">Entrar</button>
            </div>
        </div>
        <div class="link-register">
            <a href="/register">Not registered yet? Register here!</a>
        </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import RequestService from "@/util/request.service";
import { required, email, helpers } from '@vuelidate/validators'


export default {
    name: 'LoginView',
    components: {
    },
    setup () {
        return { v$: useVuelidate() }
    },
    data () {
        return {
            form: {
                email: '',
                password: '',
            }
        }
    },
    validations () {
        return {
            form: {
                email: {
                    required: helpers.withMessage('O campo de email precisa ser preenchido!', required),
                    email: helpers.withMessage('É nescessário informar um endereço de email válido!', email)
                },
                password: {
                    required: helpers.withMessage('O campo de senha precisa ser preenchido!', required)
                },
            }
        }
    },
    methods: {
        async login() {
            const hasValidate = await this.v$.$validate()
            if (hasValidate) {
                RequestService.Login(this.form.email, this.form.password)
                .then((result) => {
                    if (result) {
                        this.$router.push("/home");
                        this.$toast.success("Welcome to Bolttech TODO list!");
                    } else {
                        this.$toast.error("The email or password is incorrect!");
                    }
                })
                .catch(() => {
                    this.$toast.error("The email or password is incorrect!");
                });
            } else {
                await this.v$.$errors.forEach((error) => {
                    this.$toast.error(error.$message)
                })
            }
        },
    }
}
</script>
<style lang="scss" scoped>
@import './Login.scss';
</style>