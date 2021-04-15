const mongoose = require('mongoose');

class DB {
    static DBConnection() {
        mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});
        mongoose.connection.once('open', () => {
            console.log('connected to db');
        }).on('error', (err) => {
            console.log("Error in connecting DB. Error::", err)
        });
    }

    static findOperation(schema, query, options) {
        if (options && options.findOne) {
            return schema.findOne(query).lean();
        } else {
            return schema.find(query).lean();
        }
    }

    static insertOperation(Schema) {
        Schema.save();
    }
}

module.exports.DB = DB;
