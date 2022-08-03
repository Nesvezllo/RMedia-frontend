import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={864}
    height={900}
    viewBox="50 0 1000 700"
    backgroundColor="#fff"
    foregroundColor="#f3f3f3"
    {...props}
  >
    <rect x="42" y="5" rx="17" ry="17" width="45vw" height="700" />
  </ContentLoader>
)

export default MyLoader;