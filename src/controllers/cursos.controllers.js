const db = require("../database-MySQL");

const obtenerCursosController = async (req, res) => {
    try {
        const cursos = await obtenerCursos();
        res.json(cursos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};

// Función para obtener todos los cursos de la base de datos
const obtenerCursos = async () => {
    const query = `
      SELECT * FROM cursos
    `;

    const [cursos] = await db.query(query);
    return cursos;
};

const crearCursoController = async (req, res) => {
    const { nombre_curso, intensidad_horaria } = req.body;

    try {
        const result = await crearCurso(nombre_curso, intensidad_horaria);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};

// Función para insertar un nuevo curso en la base de datos
const crearCurso = async (nombre_curso, intensidad_horaria) => {
    const query = `
      INSERT INTO cursos (nombre_curso, intensidad_horaria)
      VALUES (?, ?)
    `;

    const [result] = await db.query(query, [nombre_curso, intensidad_horaria]);
    return result;
};

const actualizarCursoController = async (req, res) => {
    const { id_cursos, nombre_curso, intensidad_horaria } = req.body;

    try {
        const result = await actualizarCurso(id_cursos, nombre_curso, intensidad_horaria);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};

// Función para crear o actualizar un curso en la base de datos
const actualizarCurso = async (id_cursos, nombre_curso, intensidad_horaria) => {
    const query = `
      INSERT INTO cursos (id_cursos, nombre_curso, intensidad_horaria)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE nombre_curso = VALUES(nombre_curso), intensidad_horaria = VALUES(intensidad_horaria);
    `;

    const [result] = await db.query(query, [id_cursos, nombre_curso, intensidad_horaria]);
    return result;
};

const eliminarCursoController = async (req, res) => {
    const { id_cursos } = req.body;

    try {
        const result = await eliminarCurso(id_cursos);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};

// Función para eliminar un curso de la base de datos
const eliminarCurso = async (id_cursos) => {
    const query = `
      DELETE FROM cursos
      WHERE id_cursos = ?
    `;

    const [result] = await db.query(query, [id_cursos]);
    return result;
};

module.exports = {
    obtenerCursosController,
    crearCursoController,
    actualizarCursoController,
    eliminarCursoController
};
