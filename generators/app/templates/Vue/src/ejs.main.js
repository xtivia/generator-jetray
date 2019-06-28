import Vue from 'vue'
import MainView from './MainView.vue'

new Vue({
  el: '#<%=portletNameCleaned%>',
  render: h => h(MainView)
});