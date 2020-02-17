<template>
 <div>

    <ul id="example-1">
      <template v-for = "(item) of items">
      <!-- <li v-for="(note, note_index) in items._id" v-bind:key="item">
        {{ item.message }} -->
   
        <li v-bind:key="item">
          
               {{item._id}}
               
      </li>
      </template>
  </ul>

</div>
  
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js"></script>
<script>

// import Multiselect from 'vue-multiselect';
// import moment from 'moment';
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
         })

         
   }
 }
</script>