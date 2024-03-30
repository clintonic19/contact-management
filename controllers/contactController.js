const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");


//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
    // const contacts = await contact.find({ user_id: req.user.id });
    const contacts = await Contact.find({user_id: req.user.id});
    res.send(contacts);
    // res.status(200).json(contacts)
});


// @desc Get Individual contact
// @route GET /api/contacts/:id
// @access private
const getContact = asyncHandler(async (req, res) => {
    const getContactById = await Contact.findById( req.params.id );

    if (!getContactById) {
        res.status(404);
        throw new Error("Contact with ID Not Found");
    }
    res.send(getContactById);
});

//@desc Create New Contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
    console.log("created a new user :", req.body);
    const { name, email, phone_number } = req.body;

    if (!name || !email || !phone_number) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const createContact = await Contact.create({
        name, email, phone_number, user_id: req.user.id
    });
    res.status(201).json(createContact);
    console.log("Created Successfully");
});


//@desc Update individual contacts
//@route UPDATE /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const updateContactById = await Contact.findById(req.params.id);
    if (!updateContactById) {
        res.status(404);
        throw new Error("Contact with ID Not Found");
    }
    if (updateContactById.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User Not Allowed to Update");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.send(updatedContact);
    console.log("Updated Successfully");
});


//@desc Delete Individual contacts
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.findById(req.params.id);

    if (!contacts) {
        res.status(404);
        throw new Error("Contact with ID Not Found");
    };
    if (contacts.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User Not Allowed to Deleete");
    }
   const contactRmove = await Contact.findByIdAndDelete({ _id: req.params.id });
    // const deletedContact = await Contact.findByIdAndDelete(contacts);
    res.send(contactRmove);
    console.log("Deleted Successfully");
});

module.exports = { getContacts, getContact, createContact, updateContact, deleteContact }