// USUARIOS_INGRESAR
const datosUsuario = {
  rut: 'valor_del_rut',
  password: 'valor_de_la_contraseña',
};

// URL de la API para ingresar usuarios
const apiUrlIngresarUsuario = '/usuarios/ingresar';

// Realizar la llamada a la API para ingresar usuarios utilizando fetch
fetch(apiUrlIngresarUsuario, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', // Indicar que se está enviando JSON
  },
  body: JSON.stringify(datosUsuario), // Convertir a JSON y enviar en el cuerpo de la solicitud
})
  .then(response => {
    // Verificar si la respuesta es exitosa (código de estado 200)
    if (!response.ok) {
      throw new Error(`Error de red - Código de estado: ${response.status}`);
    }
    // Resto del código...
    return response.json();
  })
  .then(data => {
    // Manejar la respuesta desde el servidor
    if (data === true) {
      console.log('Ingreso exitoso');
      // Realizar acciones adicionales después del ingreso exitoso
    } else {
      console.log('Ingreso fallido');
      // Realizar acciones adicionales después del ingreso fallido
    }
  })
  .catch(error => {
    // Manejar errores de red u otros errores
    console.error('Error al realizar la solicitud de ingreso:', error);
  });

  //---------------------------------------------------------------------------------------------

//USUARIOS_CREAR

const nuevoUsuario = {
  rut: 'valor_del_rut',
  password: 'valor_de_la_contraseña',
  nombre: 'valor_del_nombre',
  apellido: 'valor_del_apellido',
  email: 'valor_del_email',
  direccion: 'valor_de_la_direccion',
  pais: 'valor_del_pais',
  region: 'valor_de_la_region'
};

// URL de la API para crear usuarios
const apiUrlCrearUsuario = '/usuarios/crear';

// Realizar la llamada a la API para crear usuarios utilizando fetch
fetch(apiUrlCrearUsuario, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', // Indicar que se está enviando JSON
  },
  body: JSON.stringify(nuevoUsuario), // Convertir a JSON y enviar en el cuerpo de la solicitud
})
  .then(response => {
    // Verificar si la respuesta es exitosa (código de estado 200)
    if (!response.ok) {
      throw new Error(`Error de red - Código de estado: ${response.status}`);
    }
    // Resto del código...
    return response.json();
  })
  .then(data => {
    // Manejar la respuesta desde el servidor
    if (data === true) {
      console.log('Usuario creado exitosamente');
      // Realizar acciones adicionales después de la creación exitosa
    } else {
      console.log('Error al crear usuario');
      // Realizar acciones adicionales en caso de error al crear usuario
    }
  })
  .catch(error => {
    // Manejar errores de red u otros errores
    console.error('Error al realizar la solicitud de creación de usuario:', error);
  });

  //-------------------------------------------------

  //USUARIOS_SALIR 

  // URL de la API para cerrar sesión
const apiUrlCerrarSesion = '/usuarios/salir';

// Realizar la llamada a la API para cerrar sesión utilizando fetch
fetch(apiUrlCerrarSesion, {
  method: 'GET', // Utilizar el método GET
})
  .then(response => {
    // Verificar si la respuesta es exitosa (código de estado 200)
    if (!response.ok) {
      throw new Error(`Error de red - Código de estado: ${response.status}`);
    }
    // Resto del código...
    return response.json();
  })
  .then(data => {
    // Manejar la respuesta desde el servidor
    if (data === true) {
      console.log('Sesión cerrada exitosamente');
      // Realizar acciones adicionales después de cerrar sesión exitosamente
    } else {
      console.log('Error al cerrar sesión');
      // Realizar acciones adicionales en caso de error al cerrar sesión
    }
  })
  .catch(error => {
    // Manejar errores de red u otros errores
    console.error('Error al realizar la solicitud de cierre de sesión:', error);
  });

   //-------------------------------------------------
  //USUARIOS_ CORRIENTE

   // URL de la API para obtener la información de usuario actual
const apiUrlUsuarioCorriente = '/usuarios/corriente';

// Realizar la llamada a la API para obtener la información de usuario actual utilizando fetch
fetch(apiUrlUsuarioCorriente, {
  method: 'GET', // Utilizar el método GET
})
  .then(response => {
    // Verificar si la respuesta es exitosa (código de estado 200)
    if (!response.ok) {
      throw new Error(`Error de red - Código de estado: ${response.status}`);
    }
    // Resto del código...
    return response.json();
  })
  .then(data => {
    // Manejar la respuesta desde el servidor
    if (data !== false) {
      console.log('Información del usuario actual:', data);
      // Realizar acciones adicionales con la información del usuario
    } else {
      console.log('No hay usuario actualmente autenticado');
      // Realizar acciones adicionales en caso de que no haya usuario autenticado
    }
  })
  .catch(error => {
    // Manejar errores de red u otros errores
    console.error('Error al obtener la información del usuario actual:', error);
  });

  //-------------------------------------------------

  //VOTAR
  //AQUI NO SE ME OCURRE COMO HACER LA CUESTION DE VOTAR, PERO ESTA LA BASE 


  // Datos de la votación
const datosVotacion = {
  candidato: 'valor_del_candidato', // Reemplaza 'valor_del_candidato' con el candidato seleccionado
};

// ID de la votación
const idVotacion = 'valor_del_id'; // Reemplaza 'valor_del_id' con el ID de la votación

// URL de la API para votar en un evento
const apiUrlVotar = `/eventos/${idVotacion}/votar`;

// Realizar la llamada a la API para votar utilizando fetch
fetch(apiUrlVotar, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', // Indicar que se está enviando JSON
  },
  body: JSON.stringify(datosVotacion), // Convertir a JSON y enviar en el cuerpo de la solicitud
})
  .then(response => {
    // Verificar si la respuesta es exitosa (código de estado 200)
    if (!response.ok) {
      throw new Error(`Error de red - Código de estado: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Manejar la respuesta desde el servidor
    if (data === true) {
      console.log('Votación exitosa');
      // Realizar acciones adicionales después de votar exitosamente

      // Por ejemplo, actualizar la interfaz de usuario o realizar otras operaciones necesarias
    } else {
      console.log('Error al votar');
      // Realizar acciones adicionales en caso de error al votar

      // Por ejemplo, mostrar un mensaje de error o realizar otras operaciones necesarias
    }
  })
  .catch(error => {
    // Manejar errores de red u otros errores
    console.error('Error al realizar la solicitud de votación:', error);

    // Por ejemplo, mostrar un mensaje de error o realizar otras operaciones necesarias
  });

   //-------------------------------------------------

  // CREAR EVENTO

   // Datos para crear un evento
const datosEvento = {
  nombre: 'nombre_del_evento', // Reemplaza 'nombre_del_evento' con el nombre del evento
  candidato1: 'nombre_candidato_1', // Reemplaza 'nombre_candidato_1' con el nombre del candidato 1
  candidato2: 'nombre_candidato_2', // Reemplaza 'nombre_candidato_2' con el nombre del candidato 2
  candidato3: 'nombre_candidato_3', // Reemplaza 'nombre_candidato_3' con el nombre del candidato 3
  descripcionc1: 'descripcion_candidato_1', // Reemplaza 'descripcion_candidato_1' con la descripción del candidato 1
  descripcionc2: 'descripcion_candidato_2', // Reemplaza 'descripcion_candidato_2' con la descripción del candidato 2
  descripcionc3: 'descripcion_candidato_3', // Reemplaza 'descripcion_candidato_3' con la descripción del candidato 3
  fechaInicio: 'fecha_inicio_evento', // Reemplaza 'fecha_inicio_evento' con la fecha de inicio del evento
  fechaFin: 'fecha_fin_evento', // Reemplaza 'fecha_fin_evento' con la fecha de fin del evento
};

// URL de la API para crear un evento
const apiUrlCrearEvento = '/eventos/crear';

// Realizar la llamada a la API para crear un evento utilizando fetch
fetch(apiUrlCrearEvento, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', // Indicar que se está enviando JSON
  },
  body: JSON.stringify(datosEvento), // Convertir a JSON y enviar en el cuerpo de la solicitud
})
  .then(response => {
    // Verificar si la respuesta es exitosa (código de estado 200)
    if (!response.ok) {
      throw new Error(`Error de red - Código de estado: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Manejar la respuesta desde el servidor
    if (data === true) {
      console.log('Evento creado exitosamente');
      // Realizar acciones adicionales después de crear el evento exitosamente

      // Por ejemplo, actualizar la interfaz de usuario o realizar otras operaciones necesarias
    } else {
      console.log('Error al crear el evento');
      // Realizar acciones adicionales en caso de error al crear el evento

      // Por ejemplo, mostrar un mensaje de error o realizar otras operaciones necesarias
    }
  })
  .catch(error => {
    // Manejar errores de red u otros errores
    console.error('Error al realizar la solicitud de creación de evento:', error);

    // Por ejemplo, mostrar un mensaje de error o realizar otras operaciones necesarias
  });


   //-------------------------------------------------

  // ACTUALIZAR ESTADO - FECHA 

  // Datos para actualizar la fecha de un evento
const datosActualizacionFecha = {
  fecha: 'nueva_fecha', // Reemplaza 'nueva_fecha' con la nueva fecha para el evento
};

// ID del evento que deseas actualizar
const idEventoActualizarFecha = 'id_evento'; // Reemplaza 'id_evento' con el ID del evento que deseas actualizar

// URL de la API para actualizar la fecha de un evento
const apiUrlActualizarFecha = `/eventos/${idEventoActualizarFecha}/actualizarFecha`;

// Realizar la llamada a la API para actualizar la fecha de un evento utilizando fetch
fetch(apiUrlActualizarFecha, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', // Indicar que se está enviando JSON
  },
  body: JSON.stringify(datosActualizacionFecha), // Convertir a JSON y enviar en el cuerpo de la solicitud
})
  .then(response => {
    // Verificar si la respuesta es exitosa (código de estado 200)
    if (!response.ok) {
      throw new Error(`Error de red - Código de estado: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Manejar la respuesta desde el servidor
    if (data === true) {
      console.log('Fecha actualizada exitosamente');
      // Realizar acciones adicionales después de actualizar la fecha exitosamente

      // Por ejemplo, actualizar la interfaz de usuario o realizar otras operaciones necesarias
    } else {
      console.log('Error al actualizar la fecha');
      // Realizar acciones adicionales en caso de error al actualizar la fecha

      // Por ejemplo, mostrar un mensaje de error o realizar otras operaciones necesarias
    }
  })
  .catch(error => {
    // Manejar errores de red u otros errores
    console.error('Error al realizar la solicitud de actualización de fecha:', error);

    // Por ejemplo, mostrar un mensaje de error o realizar otras operaciones necesarias
  });


  //-----------------------------------------------------------

  //EVENTOS ID 

  // ID del evento que deseas obtener
const idEvento = 'id_evento'; // Reemplaza 'id_evento' con el ID del evento que deseas obtener

// URL de la API para obtener la información de un evento por su ID
const apiUrlObtenerEvento = `/eventos/${idEvento}`;

// Realizar la llamada a la API para obtener la información del evento utilizando fetch
fetch(apiUrlObtenerEvento)
  .then(response => {
    // Verificar si la respuesta es exitosa (código de estado 200)
    if (!response.ok) {
      throw new Error(`Error de red - Código de estado: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Manejar la respuesta desde el servidor
    console.log('Información del evento:', data);
    // Realizar acciones adicionales según la información del evento
  })
  .catch(error => {
    // Manejar errores de red u otros errores
    console.error('Error al realizar la solicitud de obtener evento:', error);
    // Realizar acciones adicionales en caso de error
  });

  //-----------------------------------------------------------
  //EVENTOS

  // URL de la API para obtener la información de todos los eventos
const apiUrlObtenerEventos = '/eventos';

// Realizar la llamada a la API para obtener la información de todos los eventos utilizando fetch
fetch(apiUrlObtenerEventos)
  .then(response => {
    // Verificar si la respuesta es exitosa (código de estado 200)
    if (!response.ok) {
      throw new Error(`Error de red - Código de estado: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Manejar la respuesta desde el servidor
    console.log('Información de todos los eventos:', data);
    // Realizar acciones adicionales según la información de todos los eventos
  })
  .catch(error => {
    // Manejar errores de red u otros errores
    console.error('Error al realizar la solicitud de obtener todos los eventos:', error);
    // Realizar acciones adicionales en caso de error
  });