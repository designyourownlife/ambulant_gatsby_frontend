/* slide-in side navigation from the right */
function openNav(e) {
  e.preventDefault()
  document.querySelector(".gfgSideNav").style.width = "320px"
}

/* slide-out side navigation to the right (off canvas) */
function closeNav(e) {
  e.preventDefault()
  document.querySelector(".gfgSideNav").style.width = "0"
}

// Checks if device does support 'orientationchange' event
// if not: use 'resize' event for fallback
let supportsOrientationChange = "onorientationchange" in window,
  orientationEvent = supportsOrientationChange ? "orientationchange" : "resize"

window.addEventListener(
  orientationEvent,
  function () {
    document.querySelector(".gfgSideNav").style = ""
  },
  false
)
window.openNav = openNav
window.closeNav = closeNav
