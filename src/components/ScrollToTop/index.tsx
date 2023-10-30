"use client"

import React, { useEffect } from "react"

const ScrollToTop = () => {

  const [show, setShow] = React.useState(false)

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 500)

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return <button
    className={`p-4 bg-gray-300 dark:bg-gray-950 text-gray-900 dark:text-gray-100 fixed bottom-0 left-0 w-full font-bold
    transition-all duration-300 ease-in-out translate-y-0 ${show ? "translate-y-0" : "translate-y-full"}
    `}
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  >
    Scroll to top ↑
  </button>
}

export default ScrollToTop