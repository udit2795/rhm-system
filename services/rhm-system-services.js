const shortid = require('shortid');
const nodemailer = require('nodemailer');

const utils = require('../utils/utils');

class RhmSystemServices {

    static setData(schema, dataToSave) {
        for (const props in dataToSave) {
            let value = '';
            value = dataToSave[props];
            if (value) {
                schema[props] = value
            }
        }
    };

    static setHouseVisitData(schema, data) {
        const dataToSave = {
            id: shortid.generate(),
            name: data.name,
            property_id: data.property_id,
            start_time: data.start_time,
            duration: data.duration,
            day_of_week: data.dayOfWeek,
            status: data.status,
            realtor_id: data.realtor_id || null
        };
        setData(schema, dataToSave);
        return schema;
    };

    static setNewHouseData(schema, data) {
        const dataToSave = {
            id: shortid.generate(),
            title: data.title,
            description: data.description,
            address: data.address,
            owner_id: data.owner_id,
            active: true
        };
        setData(schema, dataToSave);
        return schema;
    };

    static setNewOwnerData(schema, data) {
        const dataToSave = {
            id: shortid.generate(),
            name: data.name,
            email: data.email,
            phone: data.phone
        };
        setData(schema, dataToSave);
        return schema;
    };

    static setNewRealtorData(schema, data) {
        const dataToSave = {
            id: shortid.generate(),
            name: data.name,
            email: data.email,
            phone: data.phone
        };
        setData(schema, dataToSave);
        return schema;
    };

    static getList(houses) {
        let houseDetails = [];
        houses.forEach(house => {
            houseDetails.push({
                title: house.title,
                description: house.description,
                address: house.address,
                id: house.id
            })
        });
        return houseDetails;
    };

    static getHouseVisitData(availableSlots) {
        let slots = [];
        availableSlots.forEach(slot => {
            slots.push({
                id: slot.id,
                start_time: slot.start_time,
                duration: slot.duration,
                day_of_week: slot.day_of_week,
                realtor_id: slot.realtor_id,
                value: `${utils.weekDayMap[slot.day_of_week]} ${slot.start_time} for ${slot.duration}`
            })
        });
        return slots
    };


//https://myaccount.google.com/u/1/lesssecureapps?rapt=AEjHL4Nn2xUsRB-wxmalyGIxk2YgwUeDQA0B8N18twCsu5xO6_CytlAuW5kP4kgNRxxKoFpTRot2x4goQMBfBTfpoQTSPgXFSQ
// Please Allow less secure app to access gmail

    static sendmail(tenantDetails, homeAddress, realtorDetails, cb) {
        const transporter = nodemailer.createTransport({
            service: process.env.service,
            auth: {
                user: process.env.EMAIL_ID, // add your mail ID
                pass: process.env.EMAIL_ID_PASSWORD // add your password
            }
        });
        var mailOptions = {
            from: process.env.EMAIL_ID,
            to: `${tenantDetails.email} ${realtorDetails.email}`,
            subject: 'Realtal Home visit Details',
            text: `Hi ${tenantDetails.name},
            Thank you booking. Below are the details
            Tenant Name: ${tenantDetails.name}
            Tenant Phone number: ${tenantDetails.phone}
            House address: ${homeAddress}
            Realtor Name: ${realtorDetails.name}
            Realtor phone: ${realtorDetails.phone}
         `
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return cb(error)
            } else {
                console.log('Email sent: ' + info.response);
                return cb()
            }
        });
    };
}

module.exports.RhmSystemServices = RhmSystemServices;
