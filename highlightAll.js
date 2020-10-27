addIDHighlights()
addCleanup(removeIDHighlights)

function addIDHighlights() {
  if (document.getElementsByClassName("IDFinderStyleSheet")[0] !== undefined) {
    return
  }
  const styleSheet = document.createElement("style")
  // Use class instead of ID so this extension never suggests its own stylesheet's id
  styleSheet.className = "IDFinderStyleSheet"
  styleSheet.textContent = "[id] { background-color: rgba(4, 179, 39, .25); }"
  document.head.appendChild(styleSheet)
}

function removeIDHighlights() {
  const styleSheet = document.getElementsByClassName("IDFinderStyleSheet")[0]
  if (styleSheet !== undefined) {
    document.head.removeChild(styleSheet)
  }
}

