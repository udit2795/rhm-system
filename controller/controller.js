const schemas = require('../models/schema');
const controllerHelper = require('../utils/controller_helper');


const getHouseList = async (req, res) => {
    console.log("==>>>req", req);
    try {
        const houseList = await schemas.HOUSES.find({active: true}).lean();
        const houseDetails = controllerHelper.getList(houseList);
        console.log("===>>>> sending data", houseDetails);
        // res.status(200).send( {data: houseDetails, status: 'success'})
        res.status(200).render('dashboard', {data: houseDetails, status: 'success'})
    } catch (e) {
        console.log("===>>>> error", e);
    }
};

const getSlots = async (req, res) => {
    const data = req.params;
    console.log("===>>>> req.params", req.params);
    const houseId = data.id;
    try {
        const visitingTime = await schemas.VISIT_AVAILABILITY.find({property_id: houseId, status: 'Available'}).lean();
        console.log("===>>>visitingTime", visitingTime);
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
        const realtorDetail = await schemas.REALTOR.find({realtor_id: realtor_id}).lean();
        const realtorDetails = {
            email: realtorDetail.email,
            name: realtorDetail.name,
            phone: realtorDetail.phone
        };
        await controllerHelper.sendmail(tenantDetails, homeAddress, realtorDetails);


    } catch (e) {

    }
};

const addOwner = (req, res) => {
    const data = req.body;
    let OWNER = new schemas.OWNERS();
    try {
        OWNER = controllerHelper.setNewOwnerData(OWNER, data);
        OWNER.save((err, saveObj) => {
            if (err) {
                console.error("addData:: Error in saving data. Error::", err);
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
                console.error("addData:: Error in saving data. Error::", err);
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
                console.error("addData:: Error in saving data. Error::", err);
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
                console.error("addData:: Error in saving data. Error::", err);
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

