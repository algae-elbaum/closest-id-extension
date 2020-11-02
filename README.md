# closest-id-extension
Chrome extension to help find IDs for targeting in links

Clicking the extension will highlight all elements with an `id` and bring up a prompt modal

Clicking on the page with the prompt open will find the element with an `id` positioned
closest above the click (excluding `position: fixed` elements), highlight the element, and
provide a `www.url.com/path#id` link to copy
