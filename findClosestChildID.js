showPrompt("child")
addDocumentClickListener(onDocumentClick)

function onDocumentClick(event) {
  event.preventDefault()

  const target = event.target

  const promptModal = document.getElementById("promptModal")
  promptModalChildren = [...promptModal.querySelectorAll("*")]
  if (target === promptModal || promptModalChildren.indexOf(target) !== -1) {
    return
  }

  displayID("")

  if (target.id !== "") {
    displayID(target.id)
    return
  }

  let idChildren = target.querySelectorAll("[id]")
  console.log(idChildren)
  if (idChildren.length !== 0) {
    displayID(idChildren[0].id)
  }
}
