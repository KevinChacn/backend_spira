const db = require("../database-MySQL");


const obtenerRolesController = async (req, res) => {
    try {
        const roles = await obtenerRoles();
        res.json(roles);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};

// Función para obtener todos los roles de la base de datos
const obtenerRoles = async () => {
    const query = `
      SELECT * FROM roles
    `;

    const [roles] = await db.query(query);
    return roles;
};


const crearRolController = async (req, res) => {
    const { nombre_rol, descripcion_rol } = req.body;

    try {
        const result = await crearRol(nombre_rol, descripcion_rol);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};

// Función para insertar un nuevo rol en la base de datos
const crearRol = async (nombre_rol, descripcion_rol) => {
    const query = `
      INSERT INTO roles (nombre_rol, descripcion_rol)
      VALUES (?, ?)
    `;

    const [result] = await db.query(query, [nombre_rol, descripcion_rol]);
    return result;
};


const actualizarRolController = async (req, res) => {
    const { id_roles, nombre_rol, descripcion_rol } = req.body;

    try {
        const result = await actualizarRol(id_roles, nombre_rol, descripcion_rol);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};

// Función para crear o actualizar un rol en la base de datos
const actualizarRol = async (id_roles, nombre_rol, descripcion_rol) => {
    const query = `
      INSERT INTO roles (id_roles, nombre_rol, descripcion_rol)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE nombre_rol = VALUES(nombre_rol), descripcion_rol = VALUES(descripcion_rol);
    `;

    const [result] = await db.query(query, [id_roles, nombre_rol, descripcion_rol]);
    return result;
};


const eliminarRolController = async (req, res) => {
    const { id_roles } = req.body;

    try {
        const result = await eliminarRol(id_roles);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};

// Función para eliminar un rol de la base de datos
const eliminarRol = async (id_roles) => {
    const query = `
      DELETE FROM roles
      WHERE id_roles = ?
    `;

    const [result] = await db.query(query, [id_roles]);
    return result;
};



module.exports = {
    obtenerRolesController,
    crearRolController,
    actualizarRolController,
    eliminarRolController
}