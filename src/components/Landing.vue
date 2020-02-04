<template>
    <div>
        <button @click="logout">Logout</button>
        <p>{{name}}</p>
        <p>{{email}}</p>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    name: 'Landing',
    data(){
        return{
            name:'',
            email: ''
        }
    },
    created(){
        //if no token, send to login page
        if(localStorage.getItem('token')==null){
            this.$router.push('/login');
        }
    },
    mounted(){
        axios.get('http://localhost:5000/user',{headers: {token: localStorage.getItem('token')}})
            .then(res=>{
                console.log(res);
                this.name = res.data.user.name;
                this.email =res.data.user.email;
            })
        },
    methods:{
        logout(){
            localStorage.clear();
            this.$router.push('/login');
        }
    }
}
</script>