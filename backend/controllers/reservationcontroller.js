const Reservation = require("../models/Reservation");

// Create Reservation
const createReservation = async (req, res) => {

    try {

        const reservation = await Reservation.create(req.body);

        res.status(201).json({
            success: true,
            message: "Reservation Created Successfully",
            reservation,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// Get All Reservations
const getReservations = async (req, res) => {

    try {

        const reservations = await Reservation.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            reservations,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// Delete Reservation
const deleteReservation = async (req, res) => {

    try {

        await Reservation.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Reservation Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Update Reservation Status
const updateReservationStatus = async (req, res) => {

    try {

        const reservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            {
                status: "Confirmed"
            },
            {
                new: true
            }
        );

        res.status(200).json({
            success: true,
            reservation
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Export Functions
module.exports = {
    createReservation,
    getReservations,
    deleteReservation,
    updateReservationStatus,
};