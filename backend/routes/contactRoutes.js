const express = require("express");

const router = express.Router();

const {
    createContact,
    getContacts,
    deleteContact
} = require("../controllers/contactController");


// Test Route
router.get("/test", (req,res)=>{
    res.send("Contact Route Working");
});


// Create Message
router.post("/", createContact);


// Get All Messages
router.get("/", getContacts);


// Delete Message
router.delete("/:id", deleteContact);


module.exports = router;