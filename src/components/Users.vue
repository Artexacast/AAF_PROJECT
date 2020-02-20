<template>
<div>
<div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">User Control</b-navbar-brand>
      <b-navbar-brand href="/EditDocument">Edit Document</b-navbar-brand>
      <b-navbar-brand href="/NewDocument">New Document</b-navbar-brand> 


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

        <b-dropdown-item href="#" @click="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
<b-list-group style="width: 75%;" class="mx-auto bg-info">
  <template v-for = "item in sorted" >
  <b-list-group-item v-bind:key="item"> {{item.name}} 
      <div class="float-right">
  <b-button v-b-modal.modal-1 user="'item'" @click="sendInfo(item)">Edit User</b-button> 
  <b-button  @click="deleteObject()" type="submit" >Delete User</b-button>    
    </div>
  </b-list-group-item>
  </template>
</b-list-group>

  <b-modal id="modal-1" centered title="Edit Document">
    <form ref = "form" @submit.stop.prevent="sendObject">

      <b-form-group  label="User Email" label-for="name-input" invalid-feedback="Email is required">
        <b-form-input id="title-input" v-model="email"  required v-bind:placeholder= "selectedUser.email" >
          </b-form-input>
        </b-form-group>

        <b-form-group  label="Username" label-for="name-input" invalid-feedback="Name is required">
        <b-form-input id="title-input" v-model="name"  required v-bind:placeholder= "selectedUser.name" >
          </b-form-input>
        </b-form-group>

        <b-form-group  label="Password" label-for="name-input" invalid-feedback="Password is required">
        <b-form-input id="title-input" v-model="password" require type = "password">
          </b-form-input>
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
import NavBar from './NavBar';

export default {
  components: {
    NavBar,
  },
   name: 'Users',

  data () {
    return {
  keyword: '',
  el: '#list',

    form:[    
    ],
    users:[
    ],
    name:'',
    email: '',
    selectedUser: '',
    password:''
    }	
  },

  computed: {
	sorted(){
      const search = this.keyword;
      if(!search) return this.users;

      let newFilter = this.users.filter(newSearch =>{
        return newSearch.email == this.keyword
      })
      this.users = [];
      return  this.users = newFilter;
   
      }
	},
 mounted(){

      axios.get('http://localhost:5000/user',{headers: {token: localStorage.getItem('token')}})
        .then(res=>{
        console.log(res);
        this.name = res.data.user.name;
        this.email =res.data.user.email;
      })

      axios.get('http://localhost:5000/allusers')
        .then(res=>{
        console.log(res);
        for(let i = 0; i< res.data.length; i++){
          this.users.push(res.data[i]);
        }
        console.log("Users here");
        console.log(this.users);
      })
},

  methods:{
     sendInfo(item) {
        this.selectedUser = item;
    },

        checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },

    deleteObject(){
      let object = this.selectedUser;
      console.log(object);
      let objToDelete = {email: object.email}
      console.log(objToDelete)
      axios.post('http://localhost:5000/deleteuser', objToDelete).then(res=>{
      
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

            let a = this.selectedUser.name = this.name;
            let b = this.selectedUser.email = this.email;
            let c = this.selectedUser.password = this.password;
            axios.get('http://localhost:5000/user',{headers: {token: localStorage.getItem('token')}})
           .then(res=>{
            console.log(this.selectedUser);
            this.name = res.data.user.name;
            this.email =res.data.user.email;
            this.password = res.data.user.password;
            let object = {
                email: b,
                name: a,
                password: this.c
              };
              console.log(object)

              axios.post('http://localhost:5000/edituser', object)
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
        evt.preventDefault();
      },
         logout(){
            localStorage.clear();
            this.$router.push('/login');
        },
  }
 }
</script>