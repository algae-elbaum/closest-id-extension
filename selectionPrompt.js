(function() {
  const promptModal = document.createElement("div")
  const idText = document.createElement("span")
  const linkText = document.createElement("input")
  let currentHighlightedElement = null
  let oldHighlightBackground = ""

  showPrompt()
  document.addEventListener("click", onDocumentClick)
  // TODO think harder about how to manage cleanup
  addCleanup(() => { document.removeEventListener("click", onDocumentClick) })
  addCleanup(undoHighlight)

  function showPrompt() {
    promptModal.id = "IDFinderPrompt"
    promptModal.style.display = "inline-block"
    promptModal.style.position = "fixed"
    promptModal.style.top = "10px"
    promptModal.style.left = "50%"
    promptModal.style.transform = "translateX(-50%)"
    promptModal.style.margin = "auto"
    promptModal.style.minWidth = "800px"
    promptModal.style.width = "auto"
    promptModal.style.padding = "8px"
    promptModal.style.backgroundColor = "rgba(250, 250, 250, .9)"
    promptModal.style.border = "1px solid #D3D3D3"
    promptModal.style.zIndex = "99999"

    const promptText = document.createElement("div")
    promptText.textContent = "Click somewhere to get the closest ID geographically above the click. The click event will be aborted so don't worry about links"
    promptText.style.display = "inline-block"
    promptText.style.position = "relative"
    promptText.style.left = "50%"
    promptText.style.transform = "translateX(-50%)"
    promptModal.appendChild(promptText)
    promptModal.appendChild(document.createElement("br"))

    const idDisplay  = document.createElement("div")
    idDisplay.style.display = "inline-block"
    idDisplay.style.position = "relative"
    idDisplay.style.margin = "5px 0px 5px 0px"
    idDisplay.style.left = "50%"
    idDisplay.style.transform = "translateX(-50%)"

    const idColon = document.createElement("span")
    idColon.textContent = "ID: "
    idDisplay.appendChild(idColon)

    idText.style.color = "green"
    idDisplay.appendChild(idText)

    promptModal.appendChild(idDisplay)
    promptModal.appendChild(document.createElement("br"))

    const linkDisplay = document.createElement("div")
    linkDisplay.style.display = "inline-block"
    linkDisplay.style.position = "relative"
    linkDisplay.style.margin = "5px 0px 5px 0px"
    linkDisplay.style.left = "50%"
    linkDisplay.style.transform = "translateX(-50%)"

    const linkColon = document.createElement("span")
    linkColon.textContent = "link: "
    linkDisplay.appendChild(linkColon)

    linkText.style.padding = "0px 3px"
    linkText.readOnly = true
    linkDisplay.appendChild(linkText)

    const linkButton = document.createElement("a")
    linkButton.style.marginLeft = "5px"
    linkButton.style.cursor = "pointer"
    linkButton.textContent = "Copy link"
    linkButton.onclick = () => {
      if (linkText.value === "") {
        return
      }
      linkText.focus()
      linkText.select()
      document.execCommand("copy")
      linkButton.textContent = "Copied!"
      setTimeout(() => {
        linkButton.textContent = "Copy link"
      }, 1000)
    }
    linkDisplay.appendChild(linkButton)
    
    promptModal.appendChild(linkDisplay)
    promptModal.appendChild(document.createElement("br"))

    const closeButton = document.createElement("button")
    closeButton.style.position = "relative"
    closeButton.style.left = "50%"
    closeButton.style.transform = "translateX(-50%)"
    closeButton.textContent = "close"
    closeButton.onclick = () => { cleanup() }
    promptModal.appendChild(closeButton)

    document.body.appendChild(promptModal)
    addCleanup(() => { document.body.removeChild(promptModal) })
  }

  function onDocumentClick(event) {
    event.preventDefault()
    const target = event.target

    promptModalChildren = [...promptModal.querySelectorAll("*")]
    if (target === promptModal || promptModalChildren.indexOf(target) !== -1) {
      return
    }

    displayID("")

    let minDist = -1
    let closestID = null
    for (element of document.querySelectorAll("[id]")) {
      const topDiff = event.pageY - getPageY(element)

      if (element.style.position === "fixed") {
        continue
      } 
      
      if (topDiff < 0) {
        continue	
      }
      if (minDist === -1 || topDiff < minDist) {
        minDist = topDiff
        closestID = element.id
      }
    }
    if (closestID !== null) {
      displayID(closestID)
    }
  }

  function displayID(id) {
    undoHighlight()
    linkText.value = ""
    idText.textContent = id
    currentHighlightedElement = document.getElementById(id)
    if (currentHighlightedElement !== null) {
      oldHighlightBackground = currentHighlightedElement.style.backgroundColor
      currentHighlightedElement.style.backgroundColor = "rgb(227, 127, 219)"

      let path = window.location.origin
      if (window.location.pathname !== undefined) {
        path = path + window.location.pathname
      }
      path = path + "#" + idText.textContent
      linkText.value = path

      const tempSpan = document.createElement("span")
      tempSpan.textContent = path
      document.body.appendChild(tempSpan)
      linkText.style.width = `${tempSpan.getBoundingClientRect().width + 10}px`
      document.body.removeChild(tempSpan)
    }
  }

  function undoHighlight() {
    if (currentHighlightedElement !== null) {
      currentHighlightedElement.style.backgroundColor = oldHighlightBackground
    }
  }
})()


function getPageY(element) {
  var pageY = 0

  while(element) {
      pageY += (element.offsetTop - element.scrollTop + element.clientTop)
      element = element.offsetParent
  }

  return pageY
}

