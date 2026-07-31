const Menu = require("../models/Menu");


// Add Menu Item
const addMenuItem = async (req, res) => {

    try {

       const menuItem = await Menu.create({

    name: req.body.name,

    category: req.body.category,

    price: req.body.price,

    description: req.body.description,

    image: req.file ? req.file.filename : ""

});

        res.status(201).json({
            success: true,
            menuItem
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Get All Menu Items
const getMenuItems = async (req, res) => {

    try {

        const menuItems = await Menu.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            menuItems
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Update Menu Item
const updateMenuItem = async (req, res) => {

    try {

        const menuItem = await Menu.findById(req.params.id);

        if (!menuItem) {

            return res.status(404).json({
                success: false,
                message: "Menu item not found"
            });

        }

        // Update text fields
        menuItem.name = req.body.name;
        menuItem.category = req.body.category;
        menuItem.price = req.body.price;
        menuItem.description = req.body.description;

        // Update image ONLY if a new one is uploaded
        if (req.file) {
            menuItem.image = req.file.filename;
        }

        await menuItem.save();

        res.status(200).json({
            success: true,
            menuItem
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Delete Menu Item
const deleteMenuItem = async (req, res) => {

    try {

        await Menu.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Menu item deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


module.exports = {

    addMenuItem,

    getMenuItems,

    updateMenuItem,

    deleteMenuItem

};