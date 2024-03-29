function parseToObject(array, key1, key2, sliceIndex = 2) {
  return array.map((src, i) => {
    return {
      [key1]: i + "",
      [key2]: Array.isArray(src.slice(sliceIndex))
        ? src.slice(sliceIndex).join(" ")
        : src.slice(sliceIndex).trim(),
    };
  });
}

const findData = (findKey, afterThisString, array) => {
  const searchText = array.find((line) => line.includes(findKey));

  if (searchText) {
    const indexOfString = searchText.indexOf(afterThisString);
    const value = searchText.substring(indexOfString + 1).trim();
    // console.log("found:", value);
    return value;
  } else {
    console.log(`No line contains ${findKey}`);
    // return
  }
};

const videohubChanges = (array, arryLength) => {
  if (array.length === arryLength) {
    let routingData = array.filter((entry) => entry.trim() != "");
    routingData = [...routingData.slice(0, 1), ...routingData[1].split(/\s+/)];
    routingData = { dst: routingData[1], src: routingData[2] };
    return routingData;
  }
};

const parseVideohubData = (data) => {
  let videoHubData;
  const lines = data.split("\n").map((line) => {
    return line.trim();
  });

  if (lines.length === 4) {
    return videohubChanges(lines, 4);
  }
  if (lines.length <= 73) {
    const inputLabelsArray = lines.slice(12, 24).map((label) => label.trim());
    const outputLabelsArray = lines.slice(26, 38).map((label) => label.trim());
    const videOutputRoutingArray = lines
      .slice(54, 66)
      .map((route) => route.trim().split(" ").map(String));

    const videohubInputsLabel = parseToObject(inputLabelsArray, "src", "label");
    const videohubOutputsLabel = parseToObject(
      outputLabelsArray,
      "dst",
      "label"
    );
    const videOutputRouting = parseToObject(
      videOutputRoutingArray,
      "dst",
      "src",
      1
    );

    videoHubData = {
      id: findData("Unique ID:", ":", lines),
      modelName: findData("Model name", ":", lines),
      videoInputs: videOutputRouting.length,
      videoOutputs: videOutputRouting.length,
      videOutputRouting: videOutputRouting,
      videohubInputsLabel: videohubInputsLabel,
      videohubOutputsLabel: videohubOutputsLabel,
    };
  }
  return videoHubData ? videoHubData : null;
};

export default parseVideohubData;

// module.exports = parseVideohubData;
