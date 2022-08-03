import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1920}
    height={1080}
    viewBox="15.5 10 700 600"
    backgroundColor="#fff"
    foregroundColor="#f3f3f3"
    {...props}
  >
    <rect x="42" y="5" rx="0" ry="0" width="60.6vw" height="1500" />
  </ContentLoader>
)

export default MyLoader;