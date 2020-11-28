import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import '@/styles/index.scss'; // global css

//  个人习惯：按照字母排序
import { Button, ConfigProvider, message, Modal } from 'ant-design-vue';

message.config({
    top: `100px`,
    duration: 2,
    maxCount: 3,
});

Vue.prototype.$message = message;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;
Vue.prototype.$confirm = Modal.confirm;

Vue.use(Button);
Vue.use(ConfigProvider);
Vue.use(Modal);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
