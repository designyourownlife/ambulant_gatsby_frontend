function autoPlayVideo(activeIndex) {
  const activeSlide =
    document.getElementsByClassName("swiper-slide")[activeIndex]

  const activeSlideVideo = activeSlide.getElementsByTagName("video")[0]

  if (activeSlideVideo) {
    activeSlideVideo.play()
  }
}

window.autoPlayVideo = autoPlayVideo
