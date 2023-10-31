const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const hbs = require('hbs');
const collection = require('./mongo');
const dbvotacion = require('./crear');
const cookieParser = require('cookie-parser');

hbs.registerHelper('isVotacionAbierta', (fechaFin) => {
    const fechaFinVotacion = new Date(fechaFin);
    const fechaActual = new Date();

    if (fechaActual <= fechaFinVotacion) {
        return true;
    } else {
        return false;
    }
});

// Configuración de vistas y plantillas
const views_path = path.join(__dirname, 'dinamicos');
app.set('view engine', 'hbs');
app.set('views', views_path);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
hbs.registerPartials(path.join(__dirname, 'dinamicos/partials'));

// Rutas
app.get('/', (req, res) => {
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
    // Aquí debes buscar los datos de la votación específica por su ID en tu base de datos
    const votacion = await dbvotacion.findById(votacionId);
    res.render('votar', { votacion });
});

app.get('/votar_admin/:id', async (req, res) => {
    const votacionId = req.params.id;
    // Aquí debes buscar los datos de la votación específica por su ID en tu base de datos
    const votacion = await dbvotacion.findById(votacionId);
    res.render('votar_admin', { votacion });
});

app.post('/registro', async (req, res) => {
    try {
        // Crear un nuevo perfil de usuario
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

        // para el inicio de sesión
        const datos = {
            nombre: userData.nombre,
            apellido: userData.apellido
        };
        res.cookie('usuario', `${userData.nombre} ${userData.apellido}`, { path: '/index' });

        res.render('index', { datos });
    } catch (error) {
        console.error(error);
        res.send("Error en el registro de usuario.");
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

app.post('/crear', async (req, res) => {
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
            fecha_fin: req.body.fechaFin
        };

        const newVotacion = await dbvotacion.create(crear);

        res.redirect('/index');
    } catch (err) {
        console.error(err);
        res.send("Error al crear votación.");
    }
});

app.listen(port, () => {
    console.log(`La aplicación está escuchando en el puerto ${port}`);
});
