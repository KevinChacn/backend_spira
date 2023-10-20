const db = require("../database-MySQL");

const obtenerUsuariosCursosController = async (req, res) => {
    try {
        const usuariosCursos = await obtenerUsuariosCursos();
        res.json(usuariosCursos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};

// Función para obtener todas las relaciones usuarios-cursos de la base de datos
const obtenerUsuariosCursos = async () => {
    const query = `
      SELECT * FROM usuarios_has_cursos
    `;

    const [usuariosCursos] = await db.query(query);
    return usuariosCursos;
};

const asignarCursoUsuarioController = async (req, res) => {
    const { usuarios_id_usuarios, cursos_id_cursos } = req.body;

    try {
        const result = await asignarCursoUsuario(usuarios_id_usuarios, cursos_id_cursos);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};

// Función para asignar un curso a un usuario en la base de datos
const asignarCursoUsuario = async (usuarios_id_usuarios, cursos_id_cursos) => {
    const query = `
      INSERT INTO usuarios_has_cursos (usuarios_id_usuarios, cursos_id_cursos)
      VALUES (?, ?)
    `;

    const [result] = await db.query(query, [usuarios_id_usuarios, cursos_id_cursos]);
    return result;
};

const actualizarCursoUsuarioController = async (req, res) => {
    const { id_usuario_curso, usuarios_id_usuarios, cursos_id_cursos } = req.body;

    try {
        const result = await actualizarCursoUsuario(id_usuario_curso, usuarios_id_usuarios, cursos_id_cursos);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};

// Función para actualizar la relación usuario-curso en la base de datos
const actualizarCursoUsuario = async (id_usuario_curso, usuarios_id_usuarios, cursos_id_cursos) => {
    const query = `
      UPDATE usuarios_has_cursos
      SET usuarios_id_usuarios = ?, cursos_id_cursos = ?
      WHERE id_usuario_curso = ?
    `;

    const [result] = await db.query(query, [usuarios_id_usuarios, cursos_id_cursos, id_usuario_curso]);
    return result;
};

const eliminarCursoUsuarioController = async (req, res) => {
    const { id_usuario_curso } = req.body;

    try {
        const result = await eliminarCursoUsuario(id_usuario_curso);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};

// Función para eliminar la relación usuario-curso de la base de datos
const eliminarCursoUsuario = async (id_usuario_curso) => {
    const query = `
      DELETE FROM usuarios_has_cursos
      WHERE id_usuario_curso = ?
    `;

    const [result] = await db.query(query, [id_usuario_curso]);
    return result;
};

module.exports = {
    obtenerUsuariosCursosController,
    asignarCursoUsuarioController,
    actualizarCursoUsuarioController,
    eliminarCursoUsuarioController
};