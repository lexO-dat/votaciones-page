const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/LoginDatabase")
.then(() => {
    console.log("Conectado a la db de usuario");
})
.catch((err) => {
    console.error("Error al conectar a la db:", err);
});

const UserData = new mongoose.Schema({
    rut: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    pais: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    }
});

const collection = mongoose.model('login', UserData);

//const extraData = mongoose.model('extraData', UserExtraData);
module.exports = collection;

//module.exports = { collection, extraData }; --> para varias tablas
