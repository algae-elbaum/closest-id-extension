chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [],
			actions: [new chrome.declarativeContent.ShowPageAction()]
    }])
  })
})

