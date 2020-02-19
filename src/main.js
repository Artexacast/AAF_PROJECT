import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import Landing from  './components/Landing';
import Login from  './components/Login';
import Signup from  './components/Signup';
import NewDocument from './components/NewDocument';
import EditDocument from './components/EditDocument';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


Vue.use(BootstrapVue)

Vue.use(IconsPlugin)

Vue.use(VueRouter);
Vue.config.productionTip = false;

const routes = [
    { path: '/', component: Landing },
    {path: '/signup', component: Signup},
    {path: '/login', component: Login},
    {path: '/newdocument', component: NewDocument},
    {path: '/editdocument', component: EditDocument},
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
