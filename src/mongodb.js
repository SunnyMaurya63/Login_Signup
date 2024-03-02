const mongoose = require('mongoose');

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to database');
});

mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
});

mongoose.connect("mongodb://localhost:27017/R_Form")
    .then(console.log("connection made"))
    .catch((err) => {
        console.error(`Mongoose connection error: ${err}`);
    });

    const LogInSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    });
    
    const LogInCollection = mongoose.model("Collection1", LogInSchema);
    
    module.exports = LogInCollection;
