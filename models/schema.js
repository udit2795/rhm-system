const mongoose = require('mongoose');

const realtorSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    phone: String,
    houseVisit: [{
        houseId: String,
        converted: Boolean,
        reason: String
    }]
});

const ownerSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    Phone: String
});

const houseInfoSchema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    address: String,
    owner_id: String,
    active: Boolean
});

const visitAvailabilitySchema = new mongoose.Schema({
    id: String,
    property_id: String,
    start_time: String,
    duration: String,
    day_of_week: Number,
    status: String,
    realtor_id: String
});


const REALTOR = mongoose.model('realtor', realtorSchema);
const VISIT_AVAILABILITY = mongoose.model('visit_availability', visitAvailabilitySchema);
const HOUSES = mongoose.model('houses', houseInfoSchema);
const OWNERS = mongoose.model('owners', ownerSchema);

module.exports = {
    REALTOR: REALTOR,
    VISIT_AVAILABILITY: VISIT_AVAILABILITY,
    HOUSES: HOUSES,
    OWNERS: OWNERS
};

