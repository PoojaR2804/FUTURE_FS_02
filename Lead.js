const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
name: String,
email: String,
source: String,
status: String,
notes: String
});

module.exports = mongoose.model("Lead", LeadSchema);
