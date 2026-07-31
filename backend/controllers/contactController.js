const Contact = require("../models/Contact");


// Create Contact Message
const createContact = async (req, res) => {

    try {

        const contact = await Contact.create(req.body);

        res.status(201).json({
            success:true,
            contact
        });

    } catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};


// Get All Contact Messages
const getContacts = async (req, res) => {

    try {

        const contacts = await Contact.find()
        .sort({createdAt:-1});

        res.status(200).json({
            success:true,
            contacts
        });

    } catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};


// Delete Contact Message
const deleteContact = async (req,res)=>{

    try{

        await Contact.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success:true,
            message:"Contact deleted successfully"
        });


    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};


module.exports = {
    createContact,
    getContacts,
    deleteContact
};