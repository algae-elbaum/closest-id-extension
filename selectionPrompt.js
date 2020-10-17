// Don't look at this file 🙈, css fucking sucks lmao
// uhhh semicolons are fake

cleanupOld()

// seriously don't look at me (shenanigans with this stuff already being declared on reruns)
closeButton = document.createElement("button")
idText = document.createElement("span")
idHighlight = document.createElement("button")

function showPrompt(name) {
  const promptModal = document.createElement("div")
  promptModal.id = "promptModal"
  promptModal.style.position = "fixed"
  promptModal.style.top = "10px"
  // Literally I should just figure out a better way to center, but also I like this... why do i feel like it's bad, is transform expensive?
  // I guess the problem with margin auto is it requires width and also apparently some other constraint im not sure of rn? explicit widths are kind of suck tho
  promptModal.style.left = "50%"
  promptModal.style.transform = "translateX(-50%)"
  promptModal.style.width = "750px"
  promptModal.style.padding = "8px"
  promptModal.style.backgroundColor = "rgba(250, 250, 250, .9)"
  promptModal.style.border = "1px solid #D3D3D3"
  promptModal.style.zIndex = "99999"

  const promptText = document.createElement("div")
  promptText.textContent = `Click somewhere to get the closest ${name} ID. The click event will be aborted so don't worry about links`
  promptText.style.display = "inline-block"
  promptText.style.position = "relative"
  promptText.style.left = "50%"
  promptText.style.transform = "translateX(-50%)"
  promptModal.appendChild(promptText)

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

	idHighlight.textContent = "highlight element"
  idHighlight.style.marginLeft = "5px"
  idHighlight.style.display = "none"
  let highlighted = false
  let oldBackgroundColor
  idHighlight.addEventListener("click", () => {
    if (idText.textContent === "") {
      return
    }
    const element = document.getElementById(idText.textContent)
    if (highlighted) {
        element.style.backgroundColor = oldBackgroundColor
        highlighted = false
        idHighlight.textContent = "highlight element"
    } else {
        oldBackgroundColor = element.style.backgroundColor
        element.style.backgroundColor = "rgb(227, 127, 219)"
        highlighted = true 
        idHighlight.textContent = "un-highlight element"
        addToCleanup(() => { element.style.backgroundColor = oldBackgroundColor })
    }
  })
  idDisplay.appendChild(idHighlight)

  promptModal.appendChild(document.createElement("br"))
  promptModal.appendChild(idDisplay)
  promptModal.appendChild(document.createElement("br"))

  closeButton.style.position = "relative"
  closeButton.style.left = "50%"
  closeButton.style.transform = "translateX(-50%)"
  closeButton.textContent = "close"
  closeButton.onclick = () => { cleanupOld() }
  promptModal.appendChild(closeButton)

  document.body.appendChild(promptModal)
  addToCleanup(() => { document.body.removeChild(promptModal) })
}

function addDocumentClickListener(onDocumentClick) {
  document.addEventListener("click", onDocumentClick)
  addToCleanup(() => { document.removeEventListener("click", onDocumentClick) })
}

function displayID(id) {
  idText.textContent = id
  if (id === "") {
    idHighlight.style.display = "none"
  } else {
    idHighlight.style.display = ""
  }
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


