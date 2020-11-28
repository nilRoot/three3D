import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'model',
        component: () => import('../views/model.vue'),
    },
];

const router = new VueRouter({
    routes,
});

export default router;
