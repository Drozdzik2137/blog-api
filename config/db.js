const mongoose = require('mongoose');

const connectionToDB = async () => {
    try{
        dbUrl = process.env.DB_URL;
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        });
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    connectionToDB: connectionToDB
}