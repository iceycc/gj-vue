// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)

import App from './App'
import router from './router'

Vue.config.productionTip = false

//加载muse-ui
/*import MuseUI from 'muse-ui'
 import 'muse-ui/dist/muse-ui.css'
 import 'muse-ui/dist/theme-light.css'
 Vue.use(MuseUI)*/

import appBar from 'muse-ui/src/appBar'
import toast from 'muse-ui/src/toast'
import raisedButton from 'muse-ui/src/raisedButton'
import iconButton from 'muse-ui/src/iconButton'
import selectField from 'muse-ui/src/selectField'
import textField from 'muse-ui/src/textField'
import menu from 'muse-ui/src/menu/menu.vue'
import menuItem from 'muse-ui/src/menu/menuItem.vue'
import divider from 'muse-ui/src/divider'
import infiniteScroll from 'muse-ui/src/infiniteScroll'
import avatar from 'muse-ui/src/avatar'
import list from 'muse-ui/src/list/list.vue'
import listItem from 'muse-ui/src/list/listItem.vue'
import dialog from 'muse-ui/src/dialog'
import icon from 'muse-ui/src/icon'

Vue.component(appBar.name, appBar);
Vue.component(toast.name, toast);
Vue.component(iconButton.name, iconButton);
Vue.component(raisedButton.name, raisedButton);
Vue.component(selectField.name, selectField);
Vue.component(textField.name, textField);
Vue.component(menu.name, menu);
Vue.component(menuItem.name, menuItem);
Vue.component(list.name, list);
Vue.component(listItem.name, listItem);
Vue.component(divider.name, divider);

Vue.component(infiniteScroll.name, infiniteScroll);
Vue.component(avatar.name, avatar);
Vue.component(dialog.name, dialog);
Vue.component(icon.name, icon);

import 'material-design-icons/iconfont/material-icons.css'
//加载iview
import 'iview/dist/styles/iview.css';    // 使用 CSS

import axios from 'axios';
import EventBus from "./service/EventBus";
import * as Constants from "./service/Constants";

axios.interceptors.response.use((response) => {
    if (response.data.code === 0) {
        return response.data;
    } else if ('code' in response.data) {
        EventBus.$emit(Constants.EventBus.showToast, {
            message: response.data.message
        });
        return Promise.reject({
            msg: response.data.message,
            data: response
        });
    } else {
        return Promise.reject({
            msg: 'api 不符合规范',
            data: response
        });
    }
}, (error) => {
    console.log(error);
    if (error.response.status !== 200) {
        console.error('服务器异常.');
    } else {
        EventBus.$emit(Constants.EventBus.showToast, {
            message: 'test'
        });
    }
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
})