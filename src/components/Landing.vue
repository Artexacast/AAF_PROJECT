<template>
    <div>
        <button @click="logout">Logout</button>
            <!-- <p>{{name}}</p> -->
            <!-- <p>{{email}}</p><br> -->
            <div>
  <label class="typo__label">Tagging</label>
  <multiselect v-model="value" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="code" :options="options" :multiple="false" :taggable="true" @tag="addTag"></multiselect>
  <pre class="language-json"><code>{{ value  }}</code></pre>
</div>
        <br>
        <div>
            <label class="typo__label">Tagging</label>
            <multiselect v-model="value" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="code" :options="options" :multiple="false" :taggable="true" @tag="addTagTwo"></multiselect>
            <pre class="language-json"><code>{{ value  }}</code></pre>
        </div>
        <!-- <button @click="mergeObjects">Merge</button> -->

</div>
  
    
</template>

<script type="text/x-template" id="modal-template">

import axios from 'axios';
import Multiselect from 'vue-multiselect';
//import objectmerge from 'object-merge';

export default {

        name: 'Landing',
        components: {
        Multiselect
    },
    data(){
       return {
      value: [
      ],
      document:[],
      options: [
        { name: 'Vue.js', code: 'vu' },
        { name: 'Javascript', code: 'js' },
        { name: 'Open Source', code: 'os' }
      ]
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
       //         this.name = res.data.user.name;
         //       this.email =res.data.user.email;
            })
        },
    methods:{
        logout(){
            localStorage.clear();
            this.$router.push('/login');
        },
       
        // newDocument(){
        //     let document = this.value;

        //     axios.post('http://localhost:5000/newdocument', document)
        //     .then(res =>{
        //         console.log(res);
        //         this.error = '';
        //         this.$router.push('/landing');
        //     }, err=>{
        //         console.log(err.response);
        //         this. error = err.response.data.error
        //     })
        // }
       
    }
}

</script>