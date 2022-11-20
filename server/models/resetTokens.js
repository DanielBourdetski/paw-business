const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// ? when changing this value, the tll might not work correctly so
// ? dropping the collection to reset the index might be required first 
const expireAfterSeconds = 86400 // 24 hours

const resetTokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    token: {
        type: String,
        required: true,
    },
    "expireAt": { type: Date, default: Date.now , expires: expireAfterSeconds }
});

const ResetToken = mongoose.model('ResetToken', resetTokenSchema);

module.exports = {
  resetTokenSchema,
  ResetToken
};

