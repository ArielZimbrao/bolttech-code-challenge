<template>
  <div class="register-container">
    <div class="form-container">
        <div class="title-container">
            <span>Bolttech TODO List</span>
        </div>
        <div class="form">
            <div class="container-field-form">
                <span class="label">Name</span>
                <input
                    type="text"
                    class="field-form"
                    placeholder="Name*"
                    v-bind:class="{ invalid: v$.form.name.$errors.length > 0 }" 
                    v-model="form.name"
                />
            </div>
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
                <button class="button" v-on:click="register">Register</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import RequestService from "@/util/request.service";
import { required, email, helpers } from '@vuelidate/validators'


export default {
    name: 'RegisterView',
    components: {
    },
    setup () {
        return { v$: useVuelidate() }
    },
    data () {
        return {
            form: {
                name: '',
                email: '',
                password: '',
            }
        }
    },
    validations () {
    return {
      form: {
        name: {
          required: helpers.withMessage('O campo de nome precisa ser preenchido!', required)
        },
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
        async register() {
            const hasValidate = await this.v$.$validate()
            if (hasValidate) {
                RequestService.SaveUser({
                    ...this.form
                }).then((result) => {
                    if (result) {
                        this.$toast.success("Successfully registered!")
                        this.$router.push("login")
                    } else {
                        this.$toast.error("There was an error registering, please try again later!")
                    }
                }).catch((error) => {
                    console.error(error)
                    this.$toast.error("There was an error registering, please try again later!")
                })
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
@import './Register.scss';
</style>