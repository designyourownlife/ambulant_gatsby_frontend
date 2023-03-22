import * as React from "react"
import { useRef, useEffect } from "react"
import { graphql, withPrefix } from "gatsby"

import Layout from "../components/Layout"
import Loading from "../components/ui/Loading"
import Seo from "../components/Seo"
import ContentHeader from "../components/ContentHeader"
import GridProject from "../components/GridProject"
import NoResults from "../components/NoResults"
import * as styles from "../assets/css/index.module.css"

const KeywordList = ({ data, pageContext }) => {
  const loaderRef = useRef()
  const gridRef = useRef()
  const {
    works: { nodes: projects },
  } = data
  const noresults = projects.length <= 0

  useEffect(() => {
    loaderRef.current.style.display = "none"
    gridRef.current.style.opacity = "100"
  }, [data])

  return (
    <>
      <Layout>
        <main className={styles.portfolio} id="main">
          <ContentHeader title={pageContext.title} />
          {noresults && <NoResults tagName={pageContext.title} />}
          <Loading
            elemId="spinner"
            wrapperClasses="loading-spinner"
            refHandle={loaderRef}
          />

          <div
            className={styles.portfolioGrid}
            id="portfolio-grid"
            style={{}}
            ref={gridRef}
          >
            {projects.map(project => {
              const { id, title, slug, artist, Gallery } = project

              return (
                <div
                  className={`${styles.work} gridItem pr-4`}
                  key={id}
                  id={`gridItem-${id}`}
                >
                  <GridProject
                    id={id}
                    title={title}
                    slug={slug}
                    artist={artist}
                    gallery={Gallery}
                  />
                </div>
              )
            })}
          </div>
        </main>
      </Layout>
    </>
  )
}

export const query = graphql`
  query ListView($slug: String!) {
    works: allStrapiWork(
      filter: { keywords: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      nodes {
        id
        title
        slug
        artist {
          fullname
        }
        keywords {
          name
        }
        meta {
          year
          id
        }
        Gallery {
          id
          caption
          localFile {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                placeholder: BLURRED
                height: 300
              )
            }
          }
        }
      }
    }
  }
`

export const Head = ({ data, pageContext }) => {
  const seoTitle = `Keyword: ${pageContext.title}`
  return (
    <>
      <script src={withPrefix("/js/autoGrid.js")} type="text/javascript" />
      <Seo
        title={seoTitle}
        // description={excerpt}
        // image={card_image}
        // lang="de"
        // pathname={props.location.pathname}
      />
    </>
  )
}

export default KeywordList
