const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
          },
    },
    {
        timestamps: true, //Adding entry time to the database
    }
);

const todo = mongoose.model("todo", todoSchema);
module.exports = todo;
