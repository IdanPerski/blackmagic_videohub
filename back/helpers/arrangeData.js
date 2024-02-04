// const chalk = require("chalk");

// const getDatafromStringByRegex = (str, keyword) => {
//   const regexPattern = new RegExp(`${keyword}\\s*(.*?)(,|$)`);
//   const matchArray = str.match(regexPattern);
//   console.log(matchArray);
// };

// const arrangeData = (data) => {
//   console.log(data);
//   const videoInputs = getDatafromStringByRegex(data, "Video inputs:");
//   console.log(videoInputs, "GGGGGGGGGGGGGGGGGGGGGG");
// };

// function convertToReadableObject(array, key1, key2, sliceIndex = 2) {
//   const resultArray = array.map((src, i) => {
//     const newObj = {
//       [key1]: i + "",
//       [key2]: Array.isArray(src.slice(sliceIndex))
//         ? src.slice(sliceIndex).join(" ")
//         : src.slice(sliceIndex).trim(),
//     };

//     // Remove null or undefined keys from the current object
//     for (const key in newObj) {
//       if (
//         newObj.hasOwnProperty(key) &&
//         (newObj[key] === null || newObj[key] === undefined)
//       ) {
//         delete newObj[key];
//       }
//     }

//     return newObj;
//   });

//   return resultArray;
// }
// module.exports = arrangeData;
// module.exports = convertToReadableObject;
