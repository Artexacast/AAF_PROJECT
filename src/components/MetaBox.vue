<template>
 <div>
          <!-- <button @click="logout">Logout</button> -->
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

<script>

//import axios from 'axios';
//import moment from  'moment';
import Multiselect from 'vue-multiselect'

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
        { name: 'Vue.js', code: 'vu' },
        { name: 'Javascript', code: 'js' },
        { name: 'Open Source', code: 'os' }
      ]
    }
  },
  methods: {
     addTag (newTag) {
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
            let object = {
                title: this.value[0].name,
                author: this.value[1].author
            };
           // document.push(object);
            console.log(object);
      //      this.$router.push('/');
           // console.log(document);
        },
        mergeObject(){
            let merge = {
                name:Object.values(this.value[1])
            };
            console.log(merge);
        }
    }
}
</script>