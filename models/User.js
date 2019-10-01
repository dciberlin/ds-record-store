const mongoose = require("mongoose");
const { Schema } = mongoose;
const Address = require("./Address");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minlength: 1
    },
    tokens: [
      {
        access: {
          type: String,
          required: true
        },
        token: {
          type: String,
          required: true
        }
      }
    ],
    password: {
      type: String,
      required: true
    },
    address: Address
  },
  {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  }
);

UserSchema.virtual("fullName").get(function() {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = "auth";

  const token = jwt
    .sign({ _id: user._id.toHexString(), access }, "superSecretKey")
    .toString();

  user.tokens.push({ access, token });

  return token;
};

module.exports = mongoose.model("User", UserSchema);
