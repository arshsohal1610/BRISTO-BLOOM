const express = require("express");
const router = express.Router();

const {
    createReservation,
    getReservations,
    deleteReservation,
    updateReservationStatus,
} = require("../controllers/reservationController");

// Get All Reservations
router.get("/test", (req, res) => {
    res.send("Reservation Route Working");
});

router.get("/", getReservations);

// Create Reservation
router.post("/", createReservation);

router.delete("/:id", deleteReservation);

router.put("/:id", updateReservationStatus);

module.exports = router;