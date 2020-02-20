<template>
<div>
<div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Edit Document</b-navbar-brand>
      <b-navbar-brand href="/NewDocument">New Document</b-navbar-brand> 
      <b-navbar-brand href="/Users">User Control</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
      <!-- <b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav> -->

      <b-navbar-nav class="ml-auto">
        <b-nav-form>
        <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="keyword" ></b-form-input>
        <b-button size="sm" class="my-2 my-sm-0" type="submit"  v-model="sorted">Search</b-button>
        </b-nav-form>
        <b-nav-item-dropdown right>
        <!-- Using 'button-content' slot -->
        <template v-slot:button-content>
          <em>User</em>
        </template>

        <b-dropdown-item href="#"  @click="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
<b-list-group>
  <template v-for = "item in sorted" class="nubull">
  <b-list-group-item v-bind:key="item"> {{item.doctitle}} -{{item.checkedoutby}}
    <div class="float-right">
  <b-button v-b-modal.modal-1 user="'item'" @click="sendInfo(item)">Edit Document</b-button> 
  <b-button  @click="deleteObject()" type="submit" >Delete Document</b-button>    
  </div>
  </b-list-group-item>
  </template>
</b-list-group>

  <b-modal id="modal-1" centered title="Edit Document">
    <form ref = "form" @submit.stop.prevent="sendObject">
      <b-form-group  label="Doc Title" label-for="name-input" invalid-feedback="Title is required">
        <b-form-input id="title-input" v-model="doctitle"  required v-bind:placeholder= "selectedDoc.doctitle" >
          </b-form-input>
        </b-form-group>

        <b-form-group  label="Doc Author" label-for="name-input" invalid-feedback="Name is required">
          <b-form-input id="author-input" v-model="author" required v-bind:placeholder= "selectedDoc.author">
          </b-form-input>
        </b-form-group>

        <b-form-group  label="Optional Tag" label-for="name-input" invalid-feedback="Tag is required">
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
  </div> 
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js"></script>
<script>


import axios from 'axios';
import Vue from 'vue';
import moment from 'moment';


export default {
  components: {
    
  },
   name: 'EditDocument',

  data () {
    return {
  keyword: '',
  el: '#list',

    items: [
    ],

    form:[    
    ],

    checkedoutdocs:[],
 
    name:'',
    email: '',
    selectedDoc: '',
    checkedoutBy: '',
    version: '',
    checked: 'no',

    }	
  },
    created(){
        //if no token, send to login page
        if(localStorage.getItem('token')==null){
            this.$router.push('/login');
        }
    },
  computed: {
		sorted(){
      const search = this.keyword;
      if(!search) return this.items;

      let newFilter = this.items.filter(newSearch =>{
        return newSearch.doctitle == this.keyword
      })
      this.items = [];
      return  this.items = newFilter;
   
      }
	},
 mounted(){
     axios.get('http://localhost:5000/user',{headers: {token: localStorage.getItem('token')}})
        .then(res=>{
        console.log(res);
        this.name = res.data.user.name;
        this.email =res.data.user.email;
      }),
      axios.get('http://localhost:5000/editdocument')
      .then(res=>{

        for(let i = 0; i< res.data.length; i++){
          this.items.push(res.data[i]);
           if(res.data[i].checkedoutby == this.name)
          this.checkedoutdocs.push(res.data[i]);
        }
         console.log(checkedoutdocs);
     

        console.log("Here");
        console.log(this.checkedoutdocs);
         
      })
    
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

    deleteObject(){
      let object = this.selectedDoc;
      console.log(object);
      let objToDelete = {id: object.id}
      console.log(objToDelete)
      axios.post('http://localhost:5000/deletedocument', objToDelete).then(res=>{

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
   },
   sendObject(){
  let a = this.selectedDoc.doctitle = this.doctitle;
  let b = this.selectedDoc.author = this.author;
  let c = this.selectedDoc.optional = this.optional;
  console.log(this.checked);

  console.log(a);
            axios.get('http://localhost:5000/user',{headers: {token: localStorage.getItem('token')}})
           .then(res=>{
            console.log(res);
        
            })
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
        },
          onReset(evt) {
        evt.preventDefault();
      },
         logout(){
            localStorage.clear();
            this.$router.push('/login');
        },
  }
 }
</script>