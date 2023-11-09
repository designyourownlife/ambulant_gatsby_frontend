/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */
import React from "react"
import { SearchProvider } from "./src/context/SearchContext"
require("./src/assets/css/global.css")

export const wrapRootElement = ({ element }) => (
  <SearchProvider>{element}</SearchProvider>
)
