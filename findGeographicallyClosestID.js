function findGeographicallyClosestID(above) {
  if (above) {
    showPrompt("geographically above")
  } else {
    showPrompt("geographically below")
  }
  addDocumentClickListener(onDocumentClick)

  function onDocumentClick(event) {
    event.preventDefault()
    const target = event.target

    const promptModal = document.getElementById("promptModal")
    promptModalChildren = [...promptModal.querySelectorAll("*")]
    if (target === promptModal || promptModalChildren.indexOf(target) !== -1) {
      return
    }

    if (target.id !== "") {
      displayID(target.id)
      return
    }

    displayID("")

    const targetTop = getPosition(target)
    let minDist = -1
    let closestID = null
    for (element of document.querySelectorAll("[id]")) {
      let topDiff
      if (above) {
        topDiff = targetTop - getPosition(element)
      } else {
        topDiff = getPosition(element) - targetTop
      }

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

  function getPosition(element) {
      var xPosition = 0;
      var yPosition = 0;

      while(element) {
          yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
          element = element.offsetParent;
      }

      return yPosition
  } 
}
