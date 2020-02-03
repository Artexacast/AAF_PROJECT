<template>
    <div>
        <!-- v-model is for input bindings -->
        NAME:<input type="text" v-model="name"/><br>
        EMAIL:<input type="text" v-model="email"/><br>
        PASSWORD:<input type="text" v-model="password"/><br>
        <!-- call signup function -->
        <button @click="signup">Sign up</button>
    </div>
</template>

<script>
export default {
    name: 'Signup',
    data(){
        return{
            name:'',
            email:'',
            password:''
        }
    },
    methods:{
        signup(){
            console.log(this.name);
            console.log(this.email);
            console.log(this.password);
        }
    }
}
</script>

<style scoped>
    input{
        display: block;
    }
</style>