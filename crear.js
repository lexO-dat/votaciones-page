const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/LoginDatabase")
  .then(() => {
    console.log("Conectado a la base de datos de votación");
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err);
  });

const datos_votacion = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  candidato1: {
    type: String,
    required: true
  },
  candidato1_descripcion: {
    type: String,
    required: true
  },
  candidato2: {
    type: String,
    required: true
  },
  candidato2_descripcion: {
    type: String,
    required: true
  },
  candidato3: {
    type: String,
    required: true
  },
  candidato3_descripcion: {
    type: String,
    required: true
  },
  fecha_inicio: {
    type: String,
    required: true
  },
  fecha_fin: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    required: false
  },
  candidato1_votos: {
    type: Number,
    required: false
  },
  candidato2_votos: {
    type: Number,
    required: false
  },
  candidato3_votos: {
    type: Number,
    required: false
  },
  ganador: {
    type: String,
    required: false
  },
  candidato1_imagen: String,
  candidato2_imagen: String,
  candidato3_imagen: String,
});

const votacion = mongoose.model('votacion', datos_votacion);

module.exports = votacion;
