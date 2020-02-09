<template>
 <div>
          <!-- <button @click="logout">Logout</button> -->
              <p>{{name}}</p>
              <p>{{email}}</p><br>
              <div>
    <label class="typo__label">Document Title</label>
    <multiselect v-model="value" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="code" :options="options" :multiple="false" :taggable="true" @tag="addTag"></multiselect>
    <pre class="language-json"><code>{{ value }}</code></pre>
  </div>
    <br>
  <div>
    <label class="typo__label">Document Author</label>
    <multiselect v-model="value" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="code" :options="options" :multiple="false" :taggable="true" @tag="addTagTwo"></multiselect>
    <pre class="language-json"><code>{{ value }}</code></pre>
  </div>
    <br>
  <div>
    <label class="typo__label">Optional Tags</label>
    <multiselect v-model="value" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="code" :options="options" :multiple="false" :taggable="true" @tag="addTagThree"></multiselect>
    <pre class="language-json"><code>{{ value }}</code></pre>
  </div>
        <button @click="sendObject">Submit</button>

</div>
  
</template>

<script>

import Multiselect from 'vue-multiselect';
import moment from 'moment';
import axios from 'axios' 

export default {
  name: 'NewDocument',
  components: {
    Multiselect
  },
  data () {
    return {
      value: [
  
      ],
      options: [
      ],
      name:'',
      email: ''
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
//   created(){

  methods: {
     addTag(newTag) {
          const tag = {
                  name: newTag,
            //     code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))   
              }
              //
              this.options.push(tag)
              this.value.push(tag)
        },
        addTagTwo(tag2){
               const tag = {
                author: tag2
            }
            this.value.push(tag);
            console.log(tag);
            // this.$router.push('/');
        },
        addTagThree(tag2){
               const tag = {
                optional: tag2
            }
            this.value.push(tag);
            console.log(tag);
            // this.$router.push('/');
        },
        sendObject(){
            axios.get('http://localhost:5000/user',{headers: {token: localStorage.getItem('token')}})
           .then(res=>{
              console.log(res);
                this.name = res.data.user.name;
              this.email =res.data.user.email;
            let local = localStorage.getItem("token");
            console.log(local);
          console.log(this.value)
          let object = {
                  title: this.value[0].name,
                  author: this.value[1].author,
                  creator: this.name,
                  date: moment().unix(),
                  checkedout: 0,
                  checkedoutby: '',
                  optional: this.value[2].optional
              };
              console.log(object);
              axios.post('http://localhost:5000/newdocument', object)
              .then(res =>{
                  //if success
                  if(res.status == 200){
                     console.log("Success");
                    // this.$router.push('/newdocument');
                  }
                  this.error = '';
              }, err => {
                  console.log("error here");
                  console.log(err.response);
                  this.error = err.response.data.error;
              })
            })
        }
  }
}
</script>