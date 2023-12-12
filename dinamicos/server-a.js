const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const port = 3000;
const mongoose = require('mongoose');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: 'GET,POST',
    credentials: true
}));


app.use((req, res, next) => {
    console.log(`Recibida solicitud para la ruta: ${req.url}`);
    next(); // Continuar con el manejo de la solicitud
});

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
    candidato1_imagen: {
      type: String,
      required: false
    },
    candidato2_imagen: {
      type: String,
      required: false
    },
    candidato3_imagen: {
      type: String,
      required: false
    }
  });
  
const dbvotacion = mongoose.model('votacion', datos_votacion);

hbs.registerHelper('isVotacionAbierta', (fechaFin) => {
    const fechaFinVotacion = new Date(fechaFin);
    const fechaActual = new Date();

    if (fechaActual <= fechaFinVotacion) {
        return true;
    } else {
        return false;
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/img'); // Directorio donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// Configuración de vistas y plantillas
const views_path = path.join(__dirname, 'dinamicos');
app.set('view engine', 'hbs');
app.set('views', views_path);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('json spaces', 2);
app.use(cookieParser());
app.use(express.json());
hbs.registerPartials(path.join(__dirname, 'dinamicos/partials'));


app.get('/', async (req, res) => {
        res.render('indexInicial'); 
});

app.get('/iniciar', (req, res) => {
    res.render('iniciar');
});

app.get('/registro', (req, res) => {
    res.render('registro');
});

app.get('/crear', (req, res) => {
    res.render('crear');
});

app.get('/indexInicial', (req, res) => {
    res.render('indexInicial');
});

app.get('/votos_candidato', (req, res) => {
    res.render('votos_candidato');
});

app.get('/resultados/:id', async (req, res) => {
    const votacionId = req.params.id;

    try {
        const votacion = await dbvotacion.findById(votacionId);
        if (votacion) {
            res.render('resultados', { votacion });
        } else {
            res.send("Votación no encontrada.");
        }
    } catch (error) {
        console.error(error);
        res.send("Error al cargar los resultados.");
    }
});

app.get('/resultados_admin/:id', async  (req, res) => {
    const votacionId = req.params.id;

    try {
        const votacion = await dbvotacion.findById(votacionId);
        if (votacion) {
            res.render('resultados_admin', { votacion });
        } else {
            res.send("Votación no encontrada.");
        }
    } catch (error) {
        console.error(error);
        res.send("Error al cargar los resultados.");
    }
});

app.get('/index', (req, res) => {
    if (req.cookies.usuario) {
        const nombreApellido = req.cookies.usuario;
        const [nombre, apellido] = nombreApellido.split(' ');
        const datos = { nombre, apellido };
        res.render('index', { datos });
    } else {
        res.render('indexInicial');
    }
});

app.get('/votaciones_admin', async (req, res) => {
    try {
        const votaciones = await dbvotacion.find({});
        if (votaciones.length > 0) {
            res.render('votaciones_admin', { votaciones });
        } else {
            res.send("No se encontraron votaciones.");
        }
    } catch (error) {
        console.error(error);
        res.send("Error al cargar las votaciones.");
    }
});

app.get('/votaciones', async (req, res) => {
    try {
        const votaciones = await dbvotacion.find({});
        if (votaciones.length > 0) {
            res.render('votaciones', { votaciones });
        } else {
            res.send("No se encontraron votaciones.");
        }
    } catch (error) {
        console.error(error);
        res.send("Error al cargar las votaciones.");
    }
});

app.get('/votar/:id', async (req, res) => {
    const votacionId = req.params.id;
    const votacion = await dbvotacion.findById(votacionId);
    res.render('votar', { votacion });
});

app.get('/Resultados_Finales/:id', async (req, res) => { 
    const votacionId = req.params.id;

    try {
        const votacion = await dbvotacion.findById(votacionId);
        if (votacion) {
            res.render('Resultados_Finales', { votacion });
        } else {
            res.send("Votación no encontrada.");
        }
    } catch (error) {
        console.error(error);
        res.send("Error al cargar los resultados.");
    }
});

app.get('/Resultados_Finales_Admin/:id', async (req, res) => { 
    const votacionId = req.params.id;

    try {
        const votacion = await dbvotacion.findById(votacionId);
        if (votacion) {
            res.render('Resultados_Finales_Admin', { votacion });
        } else {
            res.send("Votación no encontrada.");
        }
    } catch (error) {
        console.error(error);
        res.send("Error al cargar los resultados.");
    }
});

app.get('/votar_admin/:id', async (req, res) => {
    const votacionId = req.params.id;
    const votacion = await dbvotacion.findById(votacionId);
    res.render('votar_admin', { votacion });
});

app.post('/registro', async (req, res) => {
    try {
        const rut = req.params.rut;
        if(await collection.findOne({ rut })) {
            res.send("El rut ya está registrado.");
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

        const datos = {
            nombre: userData.nombre,
            apellido: userData.apellido
        };
        res.cookie('usuario', `${userData.nombre} ${userData.apellido}`, { path: '/index' });
        res.render('index', { datos });
        }
    } catch (error) {
        console.error(error);
        res.send("Error en el registro de usuario.");
    }
});

app.get('/borrar_usuarios', async (req, res) => {
    try {
        // Utiliza el método `deleteMany` para eliminar todos los usuarios
        const result = await collection.deleteMany({});

        if (result.deletedCount > 0) {
            res.send(`Se han eliminado ${result.deletedCount} usuarios.`);
        } else {
            res.send("No se encontraron usuarios para eliminar.");
        }
    } catch (error) {
        console.error(error);
        res.send("Error al eliminar todos los usuarios.");
    }
});

app.post('/iniciar', async (req, res) => {
    try {
        const rut = req.body.rut;
        const password = req.body.password;

        const userData = await collection.findOne({ rut });

        if (userData) {
            // Verificar la contraseña
            if (userData.password === password) {
                res.cookie('usuario', `${userData.nombre} ${userData.apellido}`, { path: '/index' });
                res.redirect('/index');
            } else {
                res.send("Contraseña incorrecta");
            }
        } else {
            res.send("Usuario no encontrado, cree un usuario nuevo o verifique los datos ingresados.");
        }
    } catch (error) {
        console.error(error);
        res.send("Error al iniciar sesión.");
    }
});

app.get('/cerrar_sesion', (req, res) => {
    res.clearCookie('usuario');
    res.redirect('/indexInicial');
});

app.post('/crear', upload.fields([
    { name: 'candidato1_imagen', maxCount: 1 },
    { name: 'candidato2_imagen', maxCount: 1 },
    { name: 'candidato3_imagen', maxCount: 1 },
  ]), async (req, res) => {
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
            candidato3_votos: 0,
            candidato1_imagen: req.files['candidato1_imagen'][0].path.replace(/\\/g, '/').replace(/public\//, ''),
            candidato2_imagen: req.files['candidato2_imagen'][0].path.replace(/\\/g, '/').replace(/public\//, ''),
            candidato3_imagen: req.files['candidato3_imagen'][0].path.replace(/\\/g, '/').replace(/public\//, '')
        };

        const newVotacion = await dbvotacion.create(crear);

        res.redirect('/index');
    } catch (err) {
        console.error(err);
        res.send("Error al crear votación.");
    }
});

app.post('/votaciones_admin/:id', async (req, res) => {
    const votacionId = req.params.id;

    try {
        // Busca y elimina la votación por su ID
        const result = await dbvotacion.findByIdAndDelete(votacionId);

        if (result) {
            // Votación eliminada con éxito
            res.redirect('/votaciones_admin'); // Redirige a la página de votaciones admin u otra página de tu elección
        } else {
            res.send("Votación no encontrada."); // Votación no encontrada
        }
    } catch (error) {
        console.error(error);
        res.send("Error al eliminar la votación.");
    }
});

app.post('/votar/:id', async (req, res) => {
    const votacionId = req.params.id;
    const candidatoSeleccionado = req.body.candidato;

    // Comprueba si la cookie ya existe para esta votación.
    if (req.cookies[`voto_${votacionId}`]) {
        res.send("Ya has votado en esta votación.");
        return;
    }

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

                res.cookie(`voto_${votacionId}`, 'votado', { path: `/votar/${votacionId}` });

                await votacion.save();
                res.redirect(`/resultados/${votacionId}`);
            } else {
                res.send("Candidato seleccionado no válido.");
            }
        } else {
            res.send("Votación no encontrada.");
        }
    } catch (error) {
        console.error(error);
        res.send("Error al votar.");
    }
});

app.post('/votar_admin/:id', async (req, res) => {
    const votacionId = req.params.id;
    const candidatoSeleccionado = req.body.candidato;

    // Comprueba si la cookie ya existe para esta votación.
    if (req.cookies[`voto_${votacionId}`]) {
        res.send("Ya has votado en esta votación.");
        return;
    }

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

                res.cookie(`voto_${votacionId}`, 'votado', { path: `/votar/${votacionId}` });

                await votacion.save();
                res.redirect(`/resultados_admin/${votacionId}`);
            } else {
                res.send("Candidato seleccionado no válido.");
            }
        } else {
            res.send("Votación no encontrada.");
        }
    } catch (error) {
        console.error(error);
        res.send("Error al votar.");
    }
});

app.listen(port, () => {
    console.log(`La aplicación está escuchando en el puerto ${port}`);
});

app.get ('/eventos', async (req, res) => {
    const votaciones = await dbvotacion.find({});
    res.json(votaciones);
});

app.get('/usuarios/ingresar', (req, res) => {
    res.json({"test": "test"});
  });

app.get ('/eventos/:id', async (req, res) => {
    const votacionId = req.params.id;
    const votacion = await dbvotacion.findById(votacionId);
    res.json(votacion);
});

//actualizar estado
//como pide cambiar el estado DEL evento se tiene que especificar el id del evento
app.post('/eventos/:id/actualizarFecha', async (req, res) => {
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

app.post('/eventos/crear', async (req, res) => {
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

        if(req.cookies.usuario){
            const newVotacion = await dbvotacion.create(crear);
            res.send(true);
        }else{
            res.send(false);
        }
    } catch (err) {
        console.error(err);
        res.send("Error al crear votación.");
    }
});

app.post('/eventos/:id/votar', async (req, res) => {
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

app.get('/usuarios/corriente', async (req, res) => {
    if (req.cookies.usuario) {
        res.send(req.cookies.usuario);
    }else{
        res.send(false);
    }
});

app.post('/usuarios/ingresar', async (req, res) => {
        const rut = req.body.rut;
        const password = req.body.password;

        console.log('Recibido una solicitud en /usuarios/ingresar');

        const userData = await collection.findOne({ rut });

        if (userData) {
            // Verificar la contraseñas
            if (userData.password === password) {
                res.cookie('usuario', `${userData.nombre}`);
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

app.post('/usuarios/crear', async (req, res) => {

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

app.get('/usuarios/salir', (req, res) => {
    res.clearCookie('usuario');
    res.send(true);
});
