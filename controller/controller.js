const schemas = require('../models/schema');
const db = require('../models/db').DB;
const RhmSystemServices = require('../services/rhm-system-services').RhmSystemServices;

class RhmSystemController {

    static async getHouseList(req, res) {
        try {
            const houseList = await db.findOperation(schemas.HOUSES, {active: true});
            const houseDetails = RhmSystemServices.getList(houseList);
            res.status(200).send(houseDetails)
        } catch (err) {
            console.error("Error in fetching house list", err);
            res.status(400).send("Error in fetching house list" + err)
        }
    };

    static async getSlots(req, res) {
        const data = req.params;
        const houseId = data.id;
        try {
            const visitingTime = await db.findOperation(schemas.VISIT_AVAILABILITY, {
                property_id: houseId,
                status: 'Available'
            });
            const slots = RhmSystemServices.getHouseVisitData(visitingTime);
            res.status(200).send(slots)

        } catch (err) {
            console.log("Error in fetching data. Error::", err);
            res.status(400).send('Error in saving data. Error::' + err)
        }
    };

    static async bookSlots(req, res) {
        const data = req.body;
        const tenantDetails = {
            name: data.name,
            email: data.email,
            phone: data.phone
        };
        const homeAddress = data.address;
        const realtor_id = data.realtor_id;
        try {
            const realtorDetail = await db.findOperation(schemas.REALTOR, {id: realtor_id}, {findOne: true});
            const realtorDetails = {
                email: realtorDetail.email,
                name: realtorDetail.name,
                phone: realtorDetail.phone
            };
            RhmSystemServices.sendmail(tenantDetails, homeAddress, realtorDetails, function (error) {
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

    static async addOwner(req, res) {
        const data = req.body;
        let OWNER = new schemas.OWNERS();
        OWNER = RhmSystemServices.setNewOwnerData(OWNER, data);
        db.insertOperation(OWNER)
            .then(() => {
                console.debug('data saved.');
                res.status(200).send('data saved');
            }).catch(err => {
            console.error("addHouse:: Error in saving data. Error::", err);
            res.status(400).send('Error in saving data. Error::' + err.toString());
        })
    };

    static async addHouse(req, res) {
        const data = req.body;
        let HOUSES = new schemas.HOUSES();
        HOUSES = RhmSystemServices.setNewHouseData(HOUSES, data);
        db.insertOperation(HOUSES)
            .then(() => {
                console.debug('data saved.');
                res.status(200).send('data saved');
            }).catch(err => {
            console.error("addHouse:: Error in saving data. Error::", err);
            res.status(400).send('Error in saving data. Error::' + err.toString());
        })
    };


    static async addHouseVisibilitySlot(req, res) {
        const data = req.body;
        let VISIT_AVAILABILITY = new schemas.VISIT_AVAILABILITY();
        VISIT_AVAILABILITY = RhmSystemServices.setHouseVisitData(VISIT_AVAILABILITY, data);
        db.insertOperation(VISIT_AVAILABILITY)
            .then(() => {
                console.debug('data saved.');
                res.status(200).send('data saved');
            }).catch(err => {
            console.error("addHouseVisibilitySlot:: Error in saving data. Error::", err);
            res.status(400).send('Error in saving data. Error::' + err.toString());
        })
    };

    static async addRealtor(req, res) {
        const data = req.body;
        let REALTOR = new schemas.REALTOR();
        REALTOR = RhmSystemServices.setNewRealtorData(REALTOR, data);
        db.insertOperation(REALTOR)
            .then(() => {
                console.debug('data saved.');
                res.status(200).send('data saved');
            }).catch(err => {
            console.error("addRealtor:: Error in saving data. Error::", err);
            res.status(400).send('Error in saving data. Error::' + err.toString());
        })
    };
}

module.exports.RhmSystemController = RhmSystemController;

