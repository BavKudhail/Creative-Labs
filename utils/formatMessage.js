// get date from moment
const moment = require("moment");

// function to format the message for the chat box
function formatMessage(username, message) {
  return {
    username: username,
    message: message,
    time: moment().format("h:mm a"),
  };
}

module.exports = formatMessage;
