showPrompt("ancestor")
addDocumentClickListener(onDocumentClick)

function onDocumentClick(event) {
  console.log("ancestor")
  event.preventDefault()
  const target = event.target

  const promptModal = document.getElementById("promptModal")
  promptModalChildren = [...promptModal.querySelectorAll("*")]
  if (target === promptModal || promptModalChildren.indexOf(target) !== -1) {
    return
  }

  displayID("")

  let id = target.id
  let currEl = target
  while (id === "" && currEl.parentElement !== null) {
    currEl = currEl.parentElement
    id = currEl.id
  }

  displayID(id)
}
