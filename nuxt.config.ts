import vuetify from "vite-plugin-vuetify";

// PWA Config
const title = "ThePortPub";
const shortTitle = "ThePortPub";
const description =
  "Template to get you up and running with Nuxt 3 & Vuetify 3";
const image = "https://vuetify3nuxt3starter.behonbaker.com/starter.png";
const url = "https://vuetify3nuxt3starter.behonbaker.com/";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // import styles
  css: ["@/assets/main.scss"],
  // enable takeover mode
  typescript: { shim: false },
  build: { transpile: ["vuetify", "@vuepic/vue-datepicker"] },
  modules: [
    '@nuxtjs/tailwindcss',
    "@kevinmarrec/nuxt-pwa",
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) =>
        // @ts-ignore
        config.plugins.push(vuetify())
      );
    },
  ],
  buildModules: [
    "~/plugins/vue-pic-vue-datepicker.ts"
  ],
  app: {
    head: {
      script: [
        {
          src:"https://unpkg.com/@tinybirdco/flock.js",
          defer: true,
          'data-host':"https://api.tinybird.co",
          'data-token':"p.eyJ1IjogImJmNGE1NGU5LWExYTMtNGZmMC1hZDA0LThmYWE1N2Y0ZDgxMSIsICJpZCI6ICI3Y2Y2MjI2NS03NzJjLTRlMjctOGYyMC1hZGUzNmM3ZjM3YmIifQ.Oz57esvRowIX90p9X8M3hL6JB1t0u8Wv-F-en5olNiI"
        }
      ],
      title: "THEPORTPUB",
      titleTemplate: "%s | Mersin",
      link: [
        { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
        { rel: "preconnect", href: "https://rsms.me/" },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "canonical", href: url },
      ],
      meta: [
        {
          hid: "description",
          name: "description",
          content: description,
        },
        { property: "og:site_name", content: title },
        { hid: "og:type", property: "og:type", content: "website" },
        {
          hid: "og:url",
          property: "og:url",
          content: url,
        },
        {
          hid: "og:image:secure_url",
          property: "og:image:secure_url",
          content: image,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: title,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: description,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: image,
        },
        //Twitter
        { name: "twitter:card", content: "summary_large_image" },
        {
          hid: "twitter:url",
          name: "twitter:url",
          content: url,
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: title,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: description,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: image,
        },
      ],
    },
  },

  pwa: {
    meta: {
      name: shortTitle,
      author: "Behon Baker",
      theme_color: "#4f46e5",
      description: description,
    },
    manifest: {
      name: shortTitle,
      short_name: shortTitle,
      theme_color: "#4f46e5",
      description: description,
    },
  },
});
