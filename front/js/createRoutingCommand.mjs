const createRoutngCommand = () => {
  let src;
  let dst;
  const srcPattern = /src(?:[1-9]|[1-9][0-9]|1[0-9]{2}|2[0-8][0-8])/;
  const dstPattern = /dst(?:[1-9]|[1-9][0-9]|1[0-9]{2}|2[0-8][0-8])/;

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
      console.log(`this src is ${id}`);
      src = id;
    }
  };

  //select multiple destenation
  const selectMultipleElements = (id, pattern) => {
    if (pattern.test(id)) {
      document.querySelector(`#${id}`).classList.add("active");
      console.log(`this dst is ${id}`);
      dst = id;
    }
  };

  document.addEventListener(
    "click",
    (e) => {
      const target = e.target;
      target.classList.forEach((_class) => {
        if (_class === "active") {
          target.classList.remove("active");
        } else {
          selectSingleElement(target.id, srcPattern);
          selectMultipleElements(target.id, dstPattern);
        }
        return;
      });
    },
    false
  );
  const selectedSrcAndDst = { src, dst };
  console.log(selectedSrcAndDst);
  return selectedSrcAndDst;
};

export default createRoutngCommand;
