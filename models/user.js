const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  online: {
    type: Boolean,
    default: false,
  },
});
UserSchema.method("toJSON", function () {
  const { password, _id: uuid, __v, ...rest } = this.toObject();
  return {
    ...rest,
    uuid,
  };
});
module.exports = model("User", UserSchema);
