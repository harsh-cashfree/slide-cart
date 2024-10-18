import "./app.css";
import App from "./App.svelte";

let app,
  appMounted = false;
const mountApp = () => {
  try {
    if (appMounted) return;
    if (document.body) {
      app = new App({
        target: document.body,
      });
      appMounted = true;
    }
  } catch (err) {
    logger(
      "error",
      `Error in mountApp: ${err?.message} :: ${window.location.href}`
    );
  }
};

// * If document body is already loaded, mount the app, else wait for it to load
if (document.readyState === "interactive" || document.readyState === "complete")
  mountApp();

// * Adding event listener to mount the app when the document is loaded
document.addEventListener("readystatechange", mountApp);

export default app;
