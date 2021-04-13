const schemas = require('../models/schema');
const controllerHelper = require('../utils/controller_helper');


const getHouseList = async (req, res) => {
    try {
        const houseList = await schemas.HOUSES.find({active: true}).lean();
        const houseDetails = controllerHelper.getList(houseList);
        res.status(200).send(houseDetails)
    } catch (err) {
        console.error("Error in fetching house list", err);
        res.status(400).send("Error in fetching house list" + err)
    }
};

const getSlots = async (req, res) => {
    const data = req.params;
    const houseId = data.id;
    try {
        const visitingTime = await schemas.VISIT_AVAILABILITY.find({property_id: houseId, status: 'Available'}).lean();
        const slots = controllerHelper.getHouseVisitData(visitingTime);
        res.status(200).send(slots)

    } catch (err) {
        console.log("Error in fetching data. Error::", err);
        res.status(400).send('Error in saving data. Error::' + err)
    }
};

const bookSlots = async (req, res) => {
    const data = req.body;
    const tenantDetails = {
        name: data.name,
        email: data.email,
        phone: data.phone
    };
    const homeAddress = data.address;
    const realtor_id = data.realtor_id;
    try {
        const realtorDetail = await schemas.REALTOR.findOne({id: realtor_id}).lean();
        console.log("===>>>realtorDetail", realtorDetail);
        const realtorDetails = {
            email: realtorDetail.email,
            name: realtorDetail.name,
            phone: realtorDetail.phone
        };
        controllerHelper.sendmail(tenantDetails, homeAddress, realtorDetails, function (error) {
            if (error) {
                res.status(400).send("Error" + e)
            } else {
                res.status(200).send("Success")
            }
        });

    } catch (err) {
        console.error("Error In booking slot", err)
        res.status(400).send("Error" + err)
    }
};

const addOwner = (req, res) => {
    const data = req.body;
    let OWNER = new schemas.OWNERS();
    try {
        OWNER = controllerHelper.setNewOwnerData(OWNER, data);
        OWNER.save((err, saveObj) => {
            if (err) {
                console.error("addOwner:: Error in saving data. Error::", err);
                res.status(400).send('Error in saving data. Error::', err);
            } else {
                console.debug('data saved', saveObj);
                res.status(200).send('data saved');
            }
        })

    } catch (err) {
        res.send('Error in saving data. Error::', err)
    }
};

const addHouse = (req, res) => {
    const data = req.body;
    let HOUSES = new schemas.HOUSES();
    try {
        HOUSES = controllerHelper.setNewHouseData(HOUSES, data);
        HOUSES.save((err, saveObj) => {
            if (err) {
                console.error("addHouse:: Error in saving data. Error::", err);
                res.status(400).send('Error in saving data. Error::', err);
            } else {
                console.debug('data saved', saveObj);
                res.status(200).send('data saved');
            }
        })

    } catch (err) {
        res.send('Error in saving data. Error::', err)
    }
};


const addHouseVisibilitySlot = (req, res) => {
    const data = req.body;
    let VISIT_AVAILABILITY = new schemas.VISIT_AVAILABILITY();
    try {
        VISIT_AVAILABILITY = controllerHelper.setHouseVisitData(VISIT_AVAILABILITY, data);
        VISIT_AVAILABILITY.save((err, saveObj) => {
            if (err) {
                console.error("addHouseVisibilitySlot:: Error in saving data. Error::", err);
                res.status(400).send('Error in saving data. Error::' + err.toString());
            } else {
                console.debug('data saved', saveObj);
                res.status(200).send('data saved');
            }
        })
    } catch (err) {
        console.log("Error in saving data. Error::", err);
        res.status(400).send('Error in saving data. Error::' + err)
    }
};

const addRealtor = (req, res) => {
    const data = req.body;
    let REALTOR = new schemas.REALTOR();
    try {
        REALTOR = controllerHelper.setNewRealtorData(REALTOR, data);
        REALTOR.save((err, saveObj) => {
            if (err) {
                console.error("addRealtor:: Error in saving data. Error::", err);
                res.status(400).send('Error in saving data. Error::', err);
            } else {
                console.debug('data saved', saveObj);
                res.status(200).send('data saved');
            }
        })

    } catch (err) {
        res.send('Error in saving data. Error::', err)
    }
};

module.exports = {
    addHouseVisibilitySlot: addHouseVisibilitySlot,
    getHouseList: getHouseList,
    getSlots: getSlots,
    bookSlots: bookSlots,
    addOwner: addOwner,
    addRealtor: addRealtor,
    addHouse: addHouse
};

