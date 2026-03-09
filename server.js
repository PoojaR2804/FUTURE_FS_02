const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const Lead = require("./models/Lead");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://127.0.0.1:27017/crm");

app.get("/", (req, res) => {
res.sendFile(__dirname + "/public/index.html");
});
app.post("/addLead", async (req, res) => {

const lead = new Lead({
name: req.body.name,
email: req.body.email,
source: req.body.source,
status: req.body.status,
notes: req.body.notes
});

await lead.save();

res.redirect("/dashboard.html");

});
app.get("/getLeads", async (req, res) => {

const leads = await Lead.find();

res.json(leads);

});
app.get("/deleteLead/:id", async (req, res) => {

await Lead.findByIdAndDelete(req.params.id);

res.redirect("/dashboard.html");

});
app.get("/updateStatus/:id/:status", async (req,res)=>{

await Lead.findByIdAndUpdate(req.params.id,{
status:req.params.status
});

res.send("updated");

});

app.listen(3000, () => {
console.log("Server running on port 3000");
});
