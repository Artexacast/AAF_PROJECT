<template>
    <div>
        <!-- v-model is for input bindings -->
        NAME:<input type="text" v-model="name"/><br>
        EMAIL:<input type="text" v-model="email"/><br>
        PASSWORD:<input type="password" v-model="password"/><br>
        <!-- call signup function -->
        <button @click="signup">Sign up</button>
        {{error}}
    </div>
    
</template>

<script>
import axios from 'axios';

export default {
    name: 'Signup',
    data(){
        return{
            name:'',
            email:'',
            password:'',

            error: '',
        }
    },
    methods:{
        signup(){
            let newUser = {
                name: this.name,
                email: this.email,
                password: this.password
            }
            axios.post('http://localhost:5000/signup', newUser)
            .then(res =>{
                console.log(res);
                this.error = '';
                this.$router.push('/login');
            }, err=>{
                console.log(err.response);
                this. error = err.response.data.error
            })
        },
    }
}
</script>

<style scoped>
    input{
        display: block;
    }
</style>