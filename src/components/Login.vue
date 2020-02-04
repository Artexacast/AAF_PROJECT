<template>
    <div>
        Email:<input type = "text" v-model="email"/><br>
        Password:<input type = "password" v-model="password"/><br>
        <button @click="login">Submit</button>
        {{error}}
    </div>
</template>

<script>

import axios from 'axios';
export default {
    name: 'Login',
     data(){
        return{
       
            email:'',
            password:'',
            error: '',
        }
    },
    methods:{
        login(){
            let user = {
                email: this.email,
                password: this.password
            }
           // console.log(user);
            axios.post('http://localhost:5000/login', user)
            .then(res =>{
                console.log(res);
                console.log(user);
                this.error = '';
            }, err => {
                console.log("error here");
                console.log(err.response);
                this.error = err.response.data.error;
            })
        }
    }
}
</script>