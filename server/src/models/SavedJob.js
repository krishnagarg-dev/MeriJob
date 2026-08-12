const mongoose = require("mongoose");

const savedJobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    jobId: {
      type: String,
      required: true,
    },

    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      default: "",
      trim: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    redirectUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

savedJobSchema.index(
  { user: 1, jobId: 1 },
  { unique: true }
);

module.exports = mongoose.model("SavedJob", savedJobSchema);