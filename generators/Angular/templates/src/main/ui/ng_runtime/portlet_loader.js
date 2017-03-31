if (window.__ng_runtime_loaded__) {
    console.log("Bypassing injection of Angular framework runtime in portlet id=@@portletName");
} else {
    window.__ng_runtime_loaded__ = true;
    console.log("Injecting Angular framework runtime in portlet id=@@portletName");
    document.write("<script defer id='ngshim' src='/o/@@portletName/shim.js'></script>");
    document.write("<script defer id='ngzone' src='/o/@@portletName/zone.js'></script>");
    document.write("<script defer id='ngruntimeloader' src='/o/@@portletName/ng_runtime.dll.js'></script>");
}
document.write("<script defer src='/o/@@portletName/main.js'></script>");
  