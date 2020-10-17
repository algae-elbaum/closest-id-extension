const highlightAll = document.getElementById('highlightAll');
const findGeographicAbove = document.getElementById('findGeographicAbove');
const findGeographicBelow = document.getElementById('findGeographicBelow');
const findAncestor = document.getElementById('findAncestor');
const findChild = document.getElementById('findChild');
	
highlightAll.onclick = function(element) {
	chrome.tabs.executeScript({file: 'highlightAll.js'})
};

findGeographicAbove.onclick = function(element) {
	chrome.tabs.executeScript({file: 'selectionPrompt.js'}, () => {
		chrome.tabs.executeScript({file: 'findGeographicallyClosestID.js'}, () => {
			chrome.tabs.executeScript({code: 'findGeographicallyClosestID(true)'})
		});
	});
};

findGeographicBelow.onclick = function(element) {
	chrome.tabs.executeScript({file: 'selectionPrompt.js'}, () => {
		chrome.tabs.executeScript({file: 'findGeographicallyClosestID.js'}, () => {
			chrome.tabs.executeScript({code: 'findGeographicallyClosestID(false)'})
		});
	});
};

findAncestor.onclick = function(element) {
	chrome.tabs.executeScript({file: 'selectionPrompt.js'}, () => {
		chrome.tabs.executeScript({file: 'findClosestAncestorID.js'})
	});
};

findChild.onclick = function(element) {
	chrome.tabs.executeScript({file: 'selectionPrompt.js'}, () => {
		chrome.tabs.executeScript({file: 'findClosestChildID.js'})
	});
};

