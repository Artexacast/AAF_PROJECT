<template>
 <div>

    <ul id="list">
      <template v-for = "(item, index) of items">
      <!-- <li v-for="(note, note_index) in items._id" v-bind:key="item">
        {{ item.message }} -->
   
        <li v-bind:key="item">
          
          {{item.doctitle}} - {{index}}
        <b-button v-b-modal.modal-1 user="'item'" @click="sendInfo(item)">Edit Document</b-button>           
      </li>
    
      </template>
     
  </ul>

  <!-- <b-button v-b-modal.modal-1>Launch demo modal</b-button> -->
 <!-- <b-form @submit="onSubmit" @reset="onReset" v-if="show"> -->
  <b-modal id="modal-1" centered title="Edit Document">
    hello {{selectedDoc}}
     <form ref = "form" @submit.stop.prevent="sendObject">

        <b-form-group  label="Doc Title" label-for="name-input" invalid-feedback="Name is required">
          <b-form-input id="title-input" v-model="doctitle"  required v-bind:placeholder= "selectedDoc.doctitle" >
          </b-form-input>
        </b-form-group>

        <b-form-group  label="Doc Author" label-for="name-input" invalid-feedback="Name is required">
          <b-form-input id="author-input" v-model="author" required v-bind:placeholder= "selectedDoc.author">
          </b-form-input>
        </b-form-group>

        <b-form-group  label="Optional Tag" label-for="name-input" invalid-feedback="Name is required">
          <b-form-input id="optional-input" v-model="optional" required>
          </b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4">
          <b-form-checkbox-group v-model="checked" id="checkboxes-4">
          <b-form-checkbox value="Yes" unchecked-value="No">Check out document</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
      </form>
    
  </b-modal>
    <!-- </b-form> -->

  </div>
     

 
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js"></script>
<script>

import axios from 'axios';
import Vue from 'vue';
import moment from 'moment';

export default {
  
   name: 'EditDocument',

  data () {
    return {

  el: '#list',

    items: [
    ],

    form:[    
    ],
 
    name:'',
    email: '',
    selectedDoc: '',
    checkedoutBy: '',
    version: '',
    checked: 'no'
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
    //  this.currDocument = items;
},

  methods:{
     sendInfo(item) {
        this.selectedDoc = item;
    },
          checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
   sendObject(){

  let a = this.selectedDoc.doctitle = this.doctitle;
  let b = this.selectedDoc.author = this.author;
  let c = this.selectedDoc.optional = this.optional;
console.log(this.checked);
             

  //let checkedout = null;  
          console.log(a);
               axios.get('http://localhost:5000/user',{headers: {token: localStorage.getItem('token')}})
           .then(res=>{
            console.log(res);
            this.form.checked;
            this.name = res.data.user.name;
            this.email =res.data.user.email;
            console.log(this.checked);
            if(this.checked == "Yes"){
                  
                    this.checkedoutBy = this.name;
                    console.log(this.checkedout);
                    console.log(this.form)
                  }
                  else{
                    this.checkedoutBy = null;
                  }
     
            let object = {
                id: this.selectedDoc.id,
                title: a,
                version: this.selectedDoc.version+1,
                author: b,
                creator: this.selectedDoc.creator,
                date: moment().unix(),
                checkedout: this.checked,
                checkedoutby: this.checkedoutBy,
                optional: c
              };
              console.log(a, b, c);
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
      // this.form.checked.value = "No";
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