import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "./index.css";
// import "./ppcss.css";
document.body.innerHTML += '<div id="bhashini-popup-container"></div>';
// console.log(document.currentScript.src);
var styleElemnent = document.createElement("style");
styleElemnent.appendChild(
  document.createTextNode(`
@keyframes rotatet {
    to {
      transform: rotate(360deg);
    }
  }}
  `)
);
document.head.appendChild(styleElemnent);
ReactDOM.createRoot(document.getElementById("bhashini-popup-container")).render(
  <App />
);
