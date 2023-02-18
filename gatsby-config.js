/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

// Initialize dotenv
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

// And then you can use the config in gatsby-config.js
const config = require("gatsby-plugin-config")

const strapiConfig = {
  apiURL:
    process.env.STRAPI_API_URL ||
    `https://ambulant-strapi-backend.onrender.com`,
  accessToken: process.env.STRAPI_TOKEN,
  collectionTypes: [
    {
      singularName: `work`,
      queryParams: {
        populate: {
          meta: "*",
          artist: "*",
          keywords: "*",
          Gallery: { populate: "*" },
          Weblink: "*",
          Videos: {
            populate: "*",
          },
          streamingVideo: { populate: "*" },
        },
      },
    },
    `keyword`,
    `artist`,
  ],
  singleTypes: [
    {
      singularName: `about`,
      queryParams: {
        populate: {
          MarginalColumn: { populate: "*" },
          streamingVideo: { populate: "*" },
          marginalTxt: { populate: "*" },
          seo: { populate: "*" },
        },
      },
    },
    {
      singularName: `contact`,
      queryParams: {
        populate: {
          MarginalColumn: { populate: "*" },
          streamingVideo: { populate: "*" },
          marginalTxt: { populate: "*" },
          seo: { populate: "*" },
        },
      },
    },
    {
      singularName: `imprint`,
      queryParams: {
        populate: {
          seo: { populate: "*" },
        },
      },
    },
  ],
  queryLimit: 5000,
}

module.exports = {
  // site config
  siteMetadata: {
    title: `ambulant design`,
    city: `Amsterdam`,
    description: `One-woman-studio for visual communication and editorial design based in Amsterdam – The Netherlands | Book | Catalog | Museum | Gallery | Artists | Publisher | Visual Identity | Teaching`,
    author: `Gabriele Franziska Götz`,
    siteUrl: `https://ambulantdesign.nl`,
    phone: `+31206890280`,
    email: `info@ambulantdesign.nl`,
  },
  plugins: [
    `gatsby-plugin-gatsby-cloud`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-source-strapi`,
      options: strapiConfig,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        google: {
          families: [`Karla:300,400,700`],
        },
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-embed-video`,
            options: {
              width: 800,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
              loadingStrategy: "lazy", //Optional: Enable support for lazy-load offscreen iframes. Default is disabled.
              urlOverrides: [
                {
                  id: "youtube",
                  embedURL: videoId =>
                    `https://www.youtube-nocookie.com/embed/${videoId}`,
                },
              ], //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
              containerClass: "embedVideo-container", //Optional: Custom CSS class for iframe container, for multiple classes separate them by space
              iframeId: false, //Optional: if true, iframe's id will be set to what is provided after 'video:' (YouTube IFrame player API requires iframe id)
              sandbox: "allow-same-origin allow-scripts allow-presentation", // Optional: iframe sandbox options - Default: undefined
            },
          },
          `gatsby-remark-responsive-iframe`, //Optional: Must be loaded after gatsby-remark-embed-video
        ],
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-leaflet`,
  ],
}
