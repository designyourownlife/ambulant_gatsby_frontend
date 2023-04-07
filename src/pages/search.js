import qs from "qs"
import * as React from "react"
import { useEffect, useRef } from "react"
import { useLocation } from "@reach/router"
import { connectStateResults } from "react-instantsearch-dom"
import useLocalStorageState from "use-local-storage-state"
import styled from "styled-components"

import Layout from "../components/Layout"
import Loading from "../components/ui/Loading"
import CustomSearch from "../components/search"
import SearchResult from "../components/search/search-result"
import ContentHeader from "../components/ContentHeader"

/************** */
const initialSearchState = {
  query: "",
  page: 1,
}

const urlToSearchState = location => qs.parse(location.search.slice(1))

/************** */

export default function SearchPage(props) {
  const [searchState, setSearchState] = useLocalStorageState("searchState", {
    ssr: true,
    defaultValue: initialSearchState,
  })
  const [isLocalStorage, setIsLocalStorage] = React.useState(false)
  const { state: searchStateFromLocation } = props.location

  let headline
  searchState.query
    ? (headline = `Search for “${searchState.query}”`)
    : (headline = "All entries")

  const loaderRef = useRef()
  const location = useLocation()

  const LoadingIndicator = connectStateResults(({ isSearchStalled }) =>
    isSearchStalled ? (
      <Loading
        elemId="spinner"
        wrapperClasses="loading-spinner--alt"
        refHandle={loaderRef}
      />
    ) : null
  )

  useEffect(() => {
    let searchParams

    // console.log("***useEffect Search Page****")
    if (searchStateFromLocation) {
      if (
        "query" in searchStateFromLocation &&
        searchStateFromLocation.query !== ""
      ) {
        setIsLocalStorage(true)
        searchParams = searchStateFromLocation.query
      } else {
        searchParams = location.search
      }
    } else {
      searchParams = location.search
    }

    if (!isLocalStorage) {
      const searchObjFromUrl = urlToSearchState(location)
      // console.log("NOTHING there …")
      // console.log(searchObjFromUrl)
      setSearchState({ ...searchObjFromUrl })
    } else {
      setSearchState(searchState)
    }
  }, [])

  return (
    <>
      <Layout id="search">
        <Wrapper className="portfolio" id="main">
          <LoadingIndicator />
          <ContentHeader title={headline} subtitle="" />
          <section className="grid gap-x-0 sm:gap-12 container " id="content">
            <div className="col-1">
              <CustomSearch />
            </div>
            <div className="col-2"></div>
          </section>
        </Wrapper>
      </Layout>
    </>
  )
}

const Wrapper = styled.main`
  .grid > .col-1 {
    grid-column: span 8;
  }
  .grid > .col-2 {
    grid-column: span 4;
  }
  .grid > .col-1 h2 {
    font-weight: 400;
    color: inherit;
  }
  .grid#content footer {
    grid-column: span 12;
  }
  .grid > .col-1 ul {
    margin-left: 0;
    list-style: none;
    counter-reset: my-awesome-counter;
  }
  .grid > .col-1 ul li {
    color: var(--clr-grey-2);
    line-height: 1.2;
    counter-increment: my-awesome-counter;
  }
  .grid > .col-1 ul li::before {
    content: counter(my-awesome-counter) ". ";
    font-size: 1.875em;
    font-weight: 400;
    color: var(--clr-grey-2);
  }
  .hit-count {
    padding-bottom: 0.5em;
  }
  @media screen and (max-width: 900px) {
    .grid > .col-1,
    .grid > .col-2 {
      grid-column: span 12;
      padding-bottom: var(--space-4);
    }
    .grid > .col-2 {
      display: none;
    }
  }
`