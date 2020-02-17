<template>
 <div>
<div>
  <!-- <b-button v-b-modal.modal-1>Launch demo modal</b-button> -->
 <!-- <b-form @submit="onSubmit" @reset="onReset" v-if="show"> -->
  <b-modal id="modal-1" centered title="Edit Document">
     <form ref = "form" @submit.stop.prevent="handleSubmit">

        <b-form-group  label="Doc Title" label-for="name-input" invalid-feedback="Name is required">
          <b-form-input id="title-input" v-model="doctitle"  required>
          </b-form-input>
        </b-form-group>

        <b-form-group  label="Doc Author" label-for="name-input" invalid-feedback="Name is required">
          <b-form-input id="author-input" v-model="author" required>
          </b-form-input>
        </b-form-group>

        <b-form-group  label="Optional Tag" label-for="name-input" invalid-feedback="Name is required">
          <b-form-input id="optional-input" v-model="optional" required>
          </b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4">
          <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
          <b-form-checkbox value = "yes">Check out document</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
      
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
      </form>
    
  </b-modal>
    <!-- </b-form> -->
</div>
    <ul id="example-1">
      <template v-for = "(item) of items">
      <!-- <li v-for="(note, note_index) in items._id" v-bind:key="item">
        {{ item.message }} -->
   
        <li v-bind:key="item">

          {{item.doctitle}}
        <b-button v-b-modal.modal-1>Edit Document</b-button>           
      </li>
  
      </template>
     
  </ul>
       {{name}}
</div>
 
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js"></script>
<script>

import axios from 'axios';
import Vue from 'vue';

export default {
  
   name: 'EditDocument',
//   components: {
//     Multiselect
//   },

  data () {
    return {

  el: '#example-1',

    items: [
    ],

            doctitle: '',
            author: '',
            optional: '',
            checked: [],
            checkedoutby: this.name,
            name:'',
            email: '',
            show: true
          
    }
  },
 mounted(){
      axios.get('http://localhost:5000/editdocument')
      .then(res=>{
          console.log("Docs here");
          console.log(res);

        for(let i = 0; i< res.data.length; i++){
          this.items.push(res.data[i]);
        }
      }),

      axios.get('http://localhost:5000/user',{headers: {token: localStorage.getItem('token')}})
        .then(res=>{
        console.log(res);
        this.name = res.data.user.name;
        this.email =res.data.user.email;
      })
},

  methods:{
          checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
   sendObject(){
            axios.get('http://localhost:5000/user',{headers: {token: localStorage.getItem('token')}})
           .then(res=>{
            console.log(res);
            this.name = res.data.user.name;
            this.email =res.data.user.email;
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
        },
          onReset(evt) {
        evt.preventDefault()
        // // Reset our form values
        // this.form.doctitle = ''
        // this.form.author = ''
        // this.form.optional = null
        // this.form.checked = ''
        // // Trick to reset/clear native browser form validation state
        // this.show = false
        // this.$nextTick(() => {
        //   this.show = true
        // })
      }
  }
 }
</script>