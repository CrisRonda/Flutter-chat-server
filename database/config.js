const mongoose = require("mongoose");

const dbChatConnection = async () => {
  try {
    await mongoose.connect(process.env.URL_DB_CHAT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("DB en linea");
  } catch (error) {
    console.log(error);
  }
};
module.exports = { dbChatConnection };
