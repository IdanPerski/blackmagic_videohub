const currentTime = require("../utils/timeService");
const fsPromises = require("fs").promises;
const path = require("path");
const txtColor = require("../helpers/chalk/color");

const { day, month, year } = currentTime();

const myLogger = async (sessionId, data) => {
  const currentDate = `${day}/${month}/${year}`;
  const stringToLog = ` ${data.user}, ${currentDate} ${data.command},${sessionId}`;

  try {
    await fsPromises.appendFile(path.join(__dirname, "LOG.text"), stringToLog);
  } catch (error) {
    txtColor.danger(error);
  }
};

module.exports = myLogger;
