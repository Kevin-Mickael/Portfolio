import { onRequestPost as __api_contact_js_onRequestPost } from "/home/kevin/Portfolio/functions/api/contact.js"
import { onRequestGet as __api_indexnow_js_onRequestGet } from "/home/kevin/Portfolio/functions/api/indexnow.js"
import { onRequestPost as __api_indexnow_js_onRequestPost } from "/home/kevin/Portfolio/functions/api/indexnow.js"

export const routes = [
    {
      routePath: "/api/contact",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_contact_js_onRequestPost],
    },
  {
      routePath: "/api/indexnow",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_indexnow_js_onRequestGet],
    },
  {
      routePath: "/api/indexnow",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_indexnow_js_onRequestPost],
    },
  ]