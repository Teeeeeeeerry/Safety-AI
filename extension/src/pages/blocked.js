/* Show the blocked domain on the blocked page.
   Extracted to an external file so Manifest V3 CSP (default script-src 'self')
   does not block it. */
(function () {
  "use strict";

  var params = new URLSearchParams(location.search);
  var url = params.get("url") || document.referrer;
  if (url) {
    try {
      document.getElementById("blockedDomain").textContent = new URL(url).hostname;
    } catch (e) {}
  }
})();
