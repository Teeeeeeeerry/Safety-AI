/* Language selector — wired in options.html.
   Extracted to an external file so Manifest V3 CSP (default script-src 'self')
   does not block it. */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var sel = document.getElementById("langSelect");
    if (!sel || !window.__i18n) return;
    sel.value = window.__i18n.getLang();
    sel.addEventListener("change", function () {
      window.__i18n.setLang(sel.value, function () {
        location.reload();
      });
    });

    // Keep selector in sync when language is changed from another tab
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.onChanged) {
      chrome.storage.onChanged.addListener(function (changes, areaName) {
        if (areaName === "local" && changes.uiLanguage) {
          var v = changes.uiLanguage.newValue;
          if (v === "zh" || v === "en") sel.value = v;
        }
      });
    }
  });
})();
