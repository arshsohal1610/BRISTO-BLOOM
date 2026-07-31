const upload = require("../middleware/upload");
const express = require("express");

const router = express.Router();

const {

    addMenuItem,

    getMenuItems,

    updateMenuItem,

    deleteMenuItem

} = require("../controllers/menuController");


// Get All Menu Items
router.get("/", getMenuItems);


// Add Menu Item
router.post("/", upload.single("image"), addMenuItem);


// Update Menu Item
router.put("/:id", upload.single("image"), updateMenuItem);

// Delete Menu Item
router.delete("/:id", deleteMenuItem);


module.exports = router;