if (window.__vue_runtime_loaded__) {
  console.log("Bypassing injection of Vue framework runtime in portlet id=@@@portletName@@@");
} else {
  window.__vue_runtime_loaded__ = true;
  console.log("Injecting Vue framework runtime in portlet id=@@@portletName@@@");
  document.write("<script defer id='vueruntimeloader' src='/o/@@@portletName@@@/vue_runtime.dll.js'></script>");
}
document.write("<script defer src='/o/@@@portletName@@@/app.js?buildNumber=$$buildNumber$$'></script>");
  