module.exports = {
  pathPrefix: "/transdiscipline",
  siteMetadata: {
    title: "transdiscipline",
  },
  flags: { PRESERVE_WEBPACK_CACHE: true },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    // "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `./src/data/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pdf`,
        path: `./static/pdf/`,
      },
    },
    `gatsby-transformer-csv`,
    // {
    //   resolve: `gatsby-source-mysql`,
    //   options: {
    //     connectionDetails: {
    //       host: 'localhost',
    //       user: 'user1',
    //       password: 'user1',
    //       database: 'khan'
    //     },
    //     queries: [
    //       {
    //         statement: 'SELECT * FROM publication;',
    //         idFieldName: 'ID',
    //         name: 'publication_db'
    //       }
    //     ]
    //   }
    // }
  ],
};
