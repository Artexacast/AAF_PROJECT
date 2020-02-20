<template>
  <div>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">New Document</b-navbar-brand>

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
{{keyword}}
        <b-nav-item-dropdown right>
        <!-- Using 'button-content' slot -->
        <template v-slot:button-content>
          <em>User</em>
        </template>
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
  <br>
    <b-form @submit="onSubmit" @reset="onReset" class="mx-auto bg-info" style="width: 75%;" >
      <b-form-group id="input-group-1" label="Document ID:" label-for="input-1">
        <b-form-input id="input-1" v-model="form.id" type="id" required placeholder="Enter id">

        </b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Document Author:" label-for="input-2">
        <b-form-input id="input-2" v-model="form.author" required placeholder="Enter author"
        ></b-form-input>
      </b-form-group>

       <b-form-group id="input-group-3" label="Title:" label-for="input-2">
        <b-form-input id="input-2" v-model="form.title" required placeholder="Enter Title"
        ></b-form-input>
      </b-form-group>

       <b-form-group id="input-group-4" label="Additional Tags:" label-for="input-2">
        <b-form-input id="input-2" v-model="form.tag" required placeholder="Additional Tags"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

  export default {
 
    data() {
      return {
        form: {
          id: '',
          title: '',
          author: '',
          tag: '',
          name:'',
        },
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        axios.get('http://localhost:5000/user',{headers: {token: localStorage.getItem('token')}})
        .then(res=>{
        console.log(res);
        this.name = res.data.user.name;
        this.email =res.data.user.email;
        let object = {
            id: this.form.id,
            title: this.form.title,
            author: this.form.author,
            creator: this.name,
            date: moment().unix(),
            version: 1,
            checkedout: 0,
            checkedoutby: '',
            optional: this.form.tag
            };
              console.log(this.value);
              axios.post('http://localhost:5000/newdocument', object)
              .then(res =>{
                  //if success
                  if(res.status == 200){
                      console.log(object);
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

      },
         logout(){
            localStorage.clear();
            this.$router.push('/login');
        },
    }
  }
</script>