import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import Landing from  './components/Landing';
import Signup from  './components/Login';
import Login from  './components/Signup';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Landing },
    {path: '/signup', component: Signup},
    {path: '/login', component: Login}
]

const router = new VueRouter({
    //make URL's look normal rather than hashing
    mode: 'history',
    routes
})
new Vue({
    //grab the element from index.html to render
    el:'#app',
    router,
    render:h=>{
        return h(App);
    }
});
