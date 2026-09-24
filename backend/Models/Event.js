const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: String,
    date: String,
    time: String,
    location: String,
    description: String,
  },
  { timestamps: true }
);

eventSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;