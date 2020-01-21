// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
const luxon = require("luxon");
import DefaultLayout from "~/layouts/Default.vue";

export default function(Vue, { router, head, isClient, store }) {
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
  Vue.prototype.$luxon = luxon;
}
