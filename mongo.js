const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://admin-user:Tupungatito1.@servertest.g2kvmmu.mongodb.net/votaciones?retryWrites=true&w=majority")
  .then(() => {
    console.log("Conectado a la base de datos de usuario");
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err);
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
