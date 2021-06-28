const { Schema, model } = require("mongoose");

const MessageSchema = Schema(
  {
    uidSender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    uidReceiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
MessageSchema.method("toJSON", function () {
  const { _id, __v, ...rest } = this.toObject();
  return {
    ...rest,
  };
});
module.exports = model("Message", MessageSchema);
