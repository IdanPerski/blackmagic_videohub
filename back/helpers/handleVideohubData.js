// const { json } = require("express");
// const colors = require("./chalk/color");
// // const { access } = require("fs");
// function processLine(lines, keyword, mainObject, key) {
//   const nonEmptyLines = lines.filter((str) => str !== "");
//   if (nonEmptyLines.length > 0) {
//     const matchingLines = nonEmptyLines.filter(
//       (line) => line.indexOf(keyword) > -1
//     );
//     const newObj = {
//       [nonEmptyLines[0]]: nonEmptyLines[1],
//     };

//     mainObject[key] = newObj;

//     return newObj;
//   }
// }

// function convertToReadableObject(array, key1, key2, sliceIndex = 2) {
//   return array.map((src, i) => {
//     return {
//       [key1]: i + "",
//       [key2]: Array.isArray(src.slice(sliceIndex))
//         ? src.slice(sliceIndex).join(" ")
//         : src.slice(sliceIndex).trim(),
//     };
//   });
// }

// function parseVideohubData(data) {
//   const convertedData = data.toString();
//   console.log(colors.lemon(convertedData));
//   let videohubData = {};
//   try {
//     const lines = convertedData.split("\n").map((line) => {
//       return line.trim();
//     });

//     if (lines.some((line) => line.indexOf("PROTOCOL PREAMBLE:") > -1)) {
//       return processLine(
//         lines,
//         "PROTOCOL PREAMBLE:",
//         videohubData,
//         "protocolPreamble"
//       );
//     }

//     const inputLabelsArray = lines.slice(12, 24).map((label) => label.trim());
//     const outputLabelsArray = lines.slice(26, 38).map((label) => label.trim());
//     const videOutputRoutingArray = lines
//       .slice(54, 66)
//       .map((route) => route.trim().split(" ").map(Number));

//     videohubData.inputLabels = convertToReadableObject(
//       inputLabelsArray,
//       "src",
//       "srcName"
//     );
//     videohubData.outputLabels = convertToReadableObject(
//       outputLabelsArray,
//       "dst",
//       "dstName"
//     );
//     videohubData.videOutputRouting = convertToReadableObject(
//       videOutputRoutingArray,
//       "dst",
//       "srcRouted",
//       1
//     );
//     videohubData.videohubDevice = {
//       devicePresent: lines[2].split(":")[1].trim() === "true",
//       modelName: lines[3].split(":")[1].trim(),
//       friendlyName: lines[4].split(":")[1].trim(),
//       uniqueID: lines[5].split(":")[1].trim(),

//       videoInputs: videohubData.inputLabels.length,
//       videoProcessingUnits: parseInt(lines[7].split(":")[1]),
//       videoOutputs: videohubData.inputLabels.length,
//       // videoMonitoringOutputs: parseInt(lines[9].split(':')[1]),
//       // serialPorts: parseInt(lines[10].split(':')[1]),
//     };

//     return videohubData;
//   } catch (error) {
//     console.log("error parsing data", error);
//   }
// }

// module.exports = parseVideohubData;
