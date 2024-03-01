const createRoutingCommand = () => {
  let src;
  let dst = [];
  const srcPattern = /src(?:[1-9]|[1-9][0-9]|1[0-9]{2}|2[0-8][0-8])/;
  const dstPattern = /dst(?:[1-9]|[1-9][0-9]|1[0-9]{2}|2[0-8][0-8])/;
  let selectedSrcAndDst = { src, dst };

  const selectSingleElement = (id, pattern) => {
    /////create from that dynamic function!
    if (pattern.test(id)) {
      const elementsWithSrc = document.querySelectorAll(
        `[id*="${id.slice(0, 3)}"]`
      );
      elementsWithSrc.forEach((element) => {
        element.classList.remove("active");
      });
      document.querySelector(`#${id}`).classList.add("active");
      selectedSrcAndDst.src = id;
    }
  };

  //select multiple destenation
  const selectMultipleElements = (id, pattern) => {
    if (pattern.test(id)) {
      document.querySelector(`#${id}`).classList.add("active");
      if (!dst.includes(id)) {
        dst.push(id);
      }
    }
  };

  document.addEventListener(
    "click",
    (e) => {
      const target = e.target;
      if (target.tagName.toLowerCase() !== "li") return;
      // console.log("element clicked", target.classList);
      target.classList.forEach((_class) => {
        if (_class === "active") {
          target.classList.remove("active");
          const indexOfDestenationToRemove = selectedSrcAndDst.dst.indexOf(
            target.id
          );
          if (indexOfDestenationToRemove !== -1) {
            selectedSrcAndDst.dst.splice(indexOfDestenationToRemove, 1);
          }
          return;
        } else {
          selectSingleElement(target.id, srcPattern);
          selectMultipleElements(target.id, dstPattern);
        }
        return selectedSrcAndDst;
      });
    },
    false
  );

  return selectedSrcAndDst;
};

export default createRoutingCommand;
