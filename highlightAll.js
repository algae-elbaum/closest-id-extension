cleanupOld()

{ // scope me
  if (typeof window["IdFinderStyleSheet"] === "undefined") {
    window["IdFinderStyleSheet"] = document.createElement("style")
  }

  const styleSheet = window["IdFinderStyleSheet"]
  styleSheet.textContent = "[id] { background-color: rgba(4, 179, 39, .25); }"

  const promptModal = document.createElement("div")
  promptModal.id = "promptModal"
  promptModal.style.position = "fixed"
  promptModal.style.top = "10px"
  promptModal.style.left = "50%"
  promptModal.style.transform = "translateX(-50%)"
  promptModal.style.width = "200px"
  promptModal.style.padding = "8px"
  promptModal.style.backgroundColor = "#FAFAFA"
  promptModal.style.border = "1px solid #D3D3D3"
  promptModal.style.zIndex = "99999"

  const buttonContainer = document.createElement("div")
  buttonContainer.style.position = "relative"
  buttonContainer.style.display = "inline-block"
  buttonContainer.style.left = "50%"
  buttonContainer.style.transform = "translateX(-50%)"

  const highlightButton = document.createElement("button")
  highlightButton.style.marginRight = "4px"
  highlightButton.textContent = "toggle highlight"
  highlightButton.onclick = () => {
    if (styleSheet.parentElement === null) {
      document.head.appendChild(styleSheet)
    } else {
      document.head.removeChild(styleSheet)
    }
  }
  buttonContainer.appendChild(highlightButton)

  const closeButton = document.createElement("button")
  closeButton.style.marginLeft = "4px"
  closeButton.textContent = "close"
  closeButton.onclick = () => { cleanupOld() }
  buttonContainer.appendChild(closeButton)

  promptModal.appendChild(buttonContainer)

  document.body.appendChild(promptModal)
  addToCleanup(() => { document.body.removeChild(promptModal) })
}

function addToCleanup(func) {
  window["IdFinderCleanup"].push(func)
}

function cleanupOld() {
  if (typeof window["IdFinderCleanup"] === "object") {
    for (const func of window["IdFinderCleanup"]) {
      func()
    }
  }
  window["IdFinderCleanup"] = []
}


