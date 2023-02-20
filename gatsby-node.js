const path = require("path")

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /node_modules/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

// create pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const resultWorks = await graphql(`
    query Projects {
      works: allStrapiWork {
        nodes {
          slug
        }
      }
    }
  `)
  const resultArtists = await graphql(`
    query Artitsts {
      artists: allStrapiArtist {
        nodes {
          slug
          fullname
        }
      }
    }
  `)
  const resultKeywords = await graphql(`
    query Keywords {
      keywords: allStrapiKeyword {
        nodes {
          slug
          name
        }
      }
    }
  `)

  resultWorks.data.works.nodes.forEach(work => {
    createPage({
      path: `/works/${work.slug}`,
      component: path.resolve(`src/templates/work-details.js`),
      context: {
        slug: work.slug,
      },
      defer: false, // defer page generation to the first user request? (DSG)
    })
  })
  resultArtists.data.artists.nodes.forEach(artist => {
    createPage({
      path: `/artists/${artist.slug}`,
      component: path.resolve(`src/templates/artist-list.js`),
      context: {
        slug: artist.slug,
        title: artist.fullname,
      },
      defer: false, // Defer page generation to the first user request? (DSG)
    })
  })
  resultKeywords.data.keywords.nodes.forEach(keyword => {
    createPage({
      path: `/keywords/${keyword.slug}`,
      component: path.resolve(`src/templates/keyword-list.js`),
      context: {
        slug: keyword.slug,
        title: keyword.name,
      },
      defer: false, // Defer page generation to the first user request? (DSG)
    })
  })
}
