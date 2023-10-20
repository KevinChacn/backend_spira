const db = require("../database-MySQL");

// Obtener todos los usuarios
const obtenerUsuariosController = async (req, res) => {
    try {
        const usuarios = await obtenerUsuarios();
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};

// Función para obtener todos los usuarios de la base de datos
const obtenerUsuarios = async () => {
    const query = `
      SELECT * FROM usuarios
    `;

    const [usuarios] = await db.query(query);
    return usuarios;
};

// Crear un nuevo usuario
const crearUsuarioController = async (req, res) => {
    const { nombre_usuario, email_usuario, telefono_usuario, password, roles_id_roles } = req.body;

    try {
        const result = await crearUsuario(nombre_usuario, email_usuario, telefono_usuario, password, roles_id_roles);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};

// Función para insertar un nuevo usuario en la base de datos
const crearUsuario = async (nombre_usuario, email_usuario, telefono_usuario, password, roles_id_roles) => {
    const query = `
      INSERT INTO usuarios (nombre_usuario, email_usuario, telefono_usuario, password, roles_id_roles)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(query, [nombre_usuario, email_usuario, telefono_usuario, password, roles_id_roles]);
    return result;
};

// Actualizar un usuario
const actualizarUsuarioController = async (req, res) => {
    const { id_usuarios, nombre_usuario, email_usuario, telefono_usuario, password, roles_id_roles } = req.body;

    try {
        const result = await actualizarUsuario(id_usuarios, nombre_usuario, email_usuario, telefono_usuario, password, roles_id_roles);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};

// Función para crear o actualizar un usuario en la base de datos
const actualizarUsuario = async (id_usuarios, nombre_usuario, email_usuario, telefono_usuario, password, roles_id_roles) => {
    const query = `
      INSERT INTO usuarios (id_usuarios, nombre_usuario, email_usuario, telefono_usuario, password, roles_id_roles)
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE nombre_usuario = VALUES(nombre_usuario), email_usuario = VALUES(email_usuario), telefono_usuario = VALUES(telefono_usuario), password = VALUES(password), roles_id_roles = VALUES(roles_id_roles);
    `;

    const [result] = await db.query(query, [id_usuarios, nombre_usuario, email_usuario, telefono_usuario, password, roles_id_roles]);
    return result;
};

// Eliminar un usuario
const eliminarUsuarioController = async (req, res) => {
    const { id_usuarios } = req.body;

    try {
        const result = await eliminarUsuario(id_usuarios);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};

// Función para eliminar un usuario de la base de datos
const eliminarUsuario = async (id_usuarios) => {
    const query = `
      DELETE FROM usuarios
      WHERE id_usuarios = ?
    `;

    const [result] = await db.query(query, [id_usuarios]);
    return result;
};


module.exports = {
    obtenerUsuariosController,
    crearUsuarioController,
    actualizarUsuarioController,
    eliminarUsuarioController
};
