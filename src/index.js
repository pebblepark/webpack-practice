import _ from "lodash";
import "./common.css";

function component() {
  var element = document.createElement("div");
  element.classList.add("text");

  /* lodash is required for the next line to work */
  element.innerHTML = _.join(["Hello", "webpack"], " ");

  return element;
}

document.body.appendChild(component());
