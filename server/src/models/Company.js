const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    name: { type: String, required: true, trim: true },
    logo: { type: String, default: "" },
    description: { type: String, default: "", trim: true },
    website: { type: String, default: "", trim: true },
    industry: { type: String, default: "", trim: true },
    location: { type: String, default: "", trim: true },
    companySize: { type: String, default: "" },
    foundedYear: { type: Number, default: null },
    verified: { type: Boolean, default: false },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "approved" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
