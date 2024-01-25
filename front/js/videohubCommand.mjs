export const sendRoutingCommand = (output, input) => {
  const callVideohub = "VIDEO OUTPUT ROUTING:\r\n";
  const sendCommand = `${callVideohub}${output} ${input}\r\n\r\n`;
  return sendCommand;
};
