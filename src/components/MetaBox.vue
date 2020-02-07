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
    <br>
  <div>
    <label class="typo__label">Tagging</label>
    <multiselect v-model="value" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="code" :options="options" :multiple="false" :taggable="true" @tag="addTagThree"></multiselect>
    <pre class="language-json"><code>{{ value  }}</code></pre>
  </div>
        <button @click="mergeObject">Merge</button>

</div>
  
</template>

<script>

//import axios from 'axios';
//import moment from  'moment';
import Multiselect from 'vue-multiselect';
import moment from 'moment';

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
        mergeObject(){
        let object = {
                title: this.value[0].name,
                author: this.value[1].author,
                date: moment().unix(),
                checkedout: 0,
                checkedoutby: '',
                optional: this.value[2].optional
            };
            console.log(object);
        }
    }
}
</script>