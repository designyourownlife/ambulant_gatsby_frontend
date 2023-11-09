/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

function Seo({ description, title, pathname, children }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title: studioName
            description
            author
            authorShort
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = `${site.siteMetadata?.title} – ${site.siteMetadata?.authorShort}`

  return (
    <>
      <link rel="icon" href="/favicon.ico" sizes="any"></link>
      <link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
      <link rel="manifest" href="/manifest.json"></link>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      ></link>
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      ></link>
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      ></link>
      <link rel="manifest" href="/site.webmanifest"></link>
      <link
        rel="mask-icon"
        href="/safari-pinned-tab.svg"
        color="#5bbad5"
      ></link>
      <meta name="robots" content="noindex, follow" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />

      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      <meta name="description" content={metaDescription} />
      <meta
        property="og:title"
        content={defaultTitle ? `${title} | ${defaultTitle}` : title}
      />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata?.author || ``} />
      <meta
        name="twitter:title"
        content={defaultTitle ? `${title} | ${defaultTitle}` : title}
      />
      <meta name="twitter:description" content={metaDescription} />
      {children}
    </>
  )
}

Seo.defaultProps = {
  description: ``,
  title: ``,
  pathname: `/`,
}

Seo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  pathname: PropTypes.string,
  children: PropTypes.node,
}

export default Seo
