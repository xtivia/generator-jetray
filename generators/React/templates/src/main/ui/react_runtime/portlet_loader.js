if (window.__react_runtime_loaded__) {
  console.log("Bypassing injection of React framework runtime in portlet id=@@portletName");
} else {
  window.__react_runtime_loaded__ = true;
  console.log("Injecting React framework runtime in portlet id=@@portletName");
  document.write("<script defer id='reactruntimeloader' src='/o/@@portletName/react_runtime.dll.js'></script>");
}
document.write("<script defer src='/o/@@portletName/app.js'></script>");
  