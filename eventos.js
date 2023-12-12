const { Router } = require('express');
const collection = require('./mongo');
const dbvotacion = require('./crear');
const eventos = Router();

eventos.get ('/eventos', async (req, res) => {
    const votaciones = await dbvotacion.find({});
    res.json(votaciones);
});


eventos.get('/usuarios/ingresar', (req, res) => {
    res.json({"test": "test"});
});

eventos.get ('/eventos/:id', async (req, res) => {
    const votacionId = req.params.id;
    const votacion = await dbvotacion.findById(votacionId);
    res.json(votacion);
});

//actualizar estado
//como pide cambiar el estado DEL evento se tiene que especificar el id del evento
eventos.post('/eventos/:id/actualizarFecha', async (req, res) => {
    const votacionId = req.params.id;
    const votacion = await dbvotacion.findById(votacionId);
    const fecha = req.body.fecha;
    if(req.cookies.usuario){
        if (votacion) {
            votacion.fecha_fin = fecha;
            await votacion.save();
            res.send(true);
        } else {
            res.send("Votación no encontrada.");
        }
    }else{
        res.send(false);
    }
});

eventos.get('/eventos/crear', (req, res) => {
    res.json({"test": "test"});
});

eventos.post('/eventos/crear', async (req, res) => {
    try {
        const crear = {
            nombre: req.body.nombre,
            candidato1: req.body.candidato1,
            candidato2: req.body.candidato2,
            candidato3: req.body.candidato3,
            candidato1_descripcion: req.body.descripcionc1,
            candidato2_descripcion: req.body.descripcionc2,
            candidato3_descripcion: req.body.descripcionc3,
            fecha_inicio: req.body.fechaInicio,
            fecha_fin: req.body.fechaFin,
            candidato1_votos: 0,
            candidato2_votos: 0,
            candidato3_votos: 0
        };

        //if(req.cookies.usuario){
            const newVotacion = await dbvotacion.create(crear);
            res.send(true);
        //}else{
        //    res.send(false);
        //}

    } catch (err) {
        console.error(err);
        res.send("Error al crear votación.");
    }
});

eventos.post('/eventos/:id/votar', async (req, res) => {
    const votacionId = req.params.id;
    const candidatoSeleccionado = req.body.candidato;

    try {
        const votacion = await dbvotacion.findById(votacionId);
        if (votacion) {
            if (candidatoSeleccionado >= 1 && candidatoSeleccionado <= 3) {
                if (candidatoSeleccionado === '1') {
                    votacion.candidato1_votos = (votacion.candidato1_votos || 0) + 1;
                } else if (candidatoSeleccionado === '2') {
                    votacion.candidato2_votos = (votacion.candidato2_votos || 0) + 1;
                } else if (candidatoSeleccionado === '3') {
                    votacion.candidato3_votos = (votacion.candidato3_votos || 0) + 1;
                }
                await votacion.save();
                res.send(true);
            } else {
               res.send(false);
            }
        } else {
            res.send("Votación no encontrada.");
        }
    }catch (error) {
        console.error(error);
        res.send("Error al votar.");
    }
});

eventos.get('/usuarios/corriente', async (req, res) => {
    if (req.cookies.usuario) {
        res.send(req.cookies.usuario);
    }else{
        res.send(false);
    }
});

eventos.post('/ingresar', async (req, res) => {
        const rut = req.body.rut;
        const password = req.body.password;

        const userData = await collection.findOne({ rut });

        if (userData) {
            // Verificar la contraseñas
            if (userData.password === password) {
                //res.cookie('usuario', `${userData.nombre}`);
                res.send(true);
            } else {
                // Contraseña incorrecta
                res.send(false);
            }
        } else {
            // Usuario no encontrado
            res.sendStatus(404);
        }
});

eventos.post('/crear', async (req, res) => {

        const rut = req.body.rut;

        if(await collection.findOne({ rut })) {
            res.send(false);
        }else{

        const userData = {
            rut: req.body.rut,
            password: req.body.password,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            direccion: req.body.direccion,
            pais: req.body.pais,
            region: req.body.region
        };

        const newUser = await collection.create(userData);

        res.send(true);
        }
});

eventos.get('/salir', (req, res) => {
    res.clearCookie('usuario');
    res.send(true);
});

module.exports = eventos;