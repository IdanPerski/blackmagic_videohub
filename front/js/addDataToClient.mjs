import { Source } from "./srcAndDstClasses.mjs";

const addElement = (
  elementToAppend,
  elementToAdd,
  classesToAdd,
  innerHtml,
  id
) => {
  const element = document.querySelector(elementToAppend);
  const node = document.createElement(elementToAdd);
  let listClasses = classesToAdd.split(" ");
  node.classList.add(...listClasses);
  node.innerHTML += innerHtml;
  node.setAttribute("id", id);
  element.appendChild(node);
};

export default function addDataToClient(data) {
  console.log(data);
  if (data && data.id) {
    let sources = data.videohubInputsLabel;
    let routing = data.videOutputRouting;
    routing?.map((rout, i) => {
      addElement(
        "#dstList",
        "li",
        "list-group-item list-group-item-action list-group-item-info customCurser",
        data.videohubOutputsLabel[i].label,
        `dst${i + 1}`
      );
      addElement(
        "#srcList",
        "li",
        "list-group-item list-group-item-action list-group-item-danger customCurser",
        data.videohubInputsLabel[i].label,
        `src${i + 1}`
      );
      console.log(rout);
    });
  } else {
    console.log("data is:", data);
  }
}

const markOutput = () => {
  document.querySelector(`#${id}`);
};
