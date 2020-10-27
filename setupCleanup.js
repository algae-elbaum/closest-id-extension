if (typeof cleanupFuns !== "undefined") {
  // Clean up any previous extension instance
  cleanup()
}

var cleanupFuns = []

function cleanup() {
  console.debug("cleaunp")
  for (f of cleanupFuns) {
    f()
  }
  cleanupFuns = []
}

function addCleanup(f) {
  console.debug("adding cleaunp")
  cleanupFuns.push(f)
}

