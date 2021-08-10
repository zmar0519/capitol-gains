import React from "react"
import Lottie from "react-lottie-player"

const LoadingAnimation = (props) => {
  return (
    <div>
      <Lottie
        loop
        animationData={props.loadingData}
        play
        speed={1}
        style={{width: "100%", height: "100%"}}
        />
    </div>
  )
}

export default LoadingAnimation