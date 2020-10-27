chrome.tabs.executeScript({file: 'setupCleanup.js'})
chrome.tabs.executeScript({file: 'highlightAll.js'})
chrome.tabs.executeScript({file: 'selectionPrompt.js'})

// Close extension popup
window.close()

