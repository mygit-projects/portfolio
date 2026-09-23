import Script from "next/script";

/**
 * Bitdefender (and similar security tools) inject attributes like
 * `bis_skin_checked` into the DOM before React hydrates. React 19 treats
 * those extra attributes as a hydration mismatch. This script runs before
 * hydration and removes the injected attributes for the first paint window.
 */
const STRIP_EXTENSION_ATTRS = `
(function () {
  var WATCHED = ["bis_skin_checked", "bis_register", "bis_id"];
  function shouldStrip(name) {
    return WATCHED.indexOf(name) !== -1 || name.indexOf("__processed_") === 0;
  }
  function clean(el) {
    if (!el || el.nodeType !== 1 || !el.attributes) return;
    var remove = [];
    for (var i = 0; i < el.attributes.length; i++) {
      var name = el.attributes[i].name;
      if (shouldStrip(name)) remove.push(name);
    }
    for (var j = 0; j < remove.length; j++) el.removeAttribute(remove[j]);
  }
  function sweep(root) {
    clean(root);
    if (!root || !root.getElementsByTagName) return;
    var all = root.getElementsByTagName("*");
    for (var i = 0; i < all.length; i++) clean(all[i]);
  }
  var root = document.documentElement;
  sweep(root);
  var obs = new MutationObserver(function (records) {
    for (var i = 0; i < records.length; i++) {
      var rec = records[i];
      if (rec.type === "attributes" && rec.target) clean(rec.target);
      var nodes = rec.addedNodes;
      if (!nodes) continue;
      for (var j = 0; j < nodes.length; j++) {
        clean(nodes[j]);
        if (nodes[j].getElementsByTagName) {
          var nested = nodes[j].getElementsByTagName("*");
          for (var k = 0; k < nested.length; k++) clean(nested[k]);
        }
      }
    }
  });
  obs.observe(root, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: WATCHED
  });
  window.addEventListener("load", function () {
    setTimeout(function () {
      sweep(root);
      obs.disconnect();
    }, 2500);
  });
})();
`;

export function StripExtensionAttrs() {
  return (
    <Script
      id="strip-extension-attrs"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: STRIP_EXTENSION_ATTRS }}
    />
  );
}
