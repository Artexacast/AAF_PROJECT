import Vue from 'vue';
import App from './App';

new Vue({
    //grab the element from index.html to render
    el:'#app',
    render:h=>{
        return h(App);
    }
});
