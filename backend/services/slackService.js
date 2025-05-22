
const axios = require("axios");

exports.sendToSlack = async (text) => {
  await axios.post(process.env.SLACK_WEBHOOK_URL, { text });
};
