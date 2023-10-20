const express = require('express');
const router = express.Router();

const rolesCtl = require('../controllers/roles.controllers');
const usuariosCtl = require('../controllers/usuarios.controllers');
const cursosCtl = require('../controllers/cursos.controllers');
const usuariosCursosCtl = require('../controllers/usuarios_cursos.controllers');
const authCtl = require('../controllers/auth.controller');

const authMiddleware = require('../utils/middleware');

router.use(authMiddleware.authenticateToken);

// Roles
router.get('/roles', rolesCtl.obtenerRolesController);
router.post('/roles', rolesCtl.crearRolController);
router.put('/roles/:id', rolesCtl.actualizarRolController);
router.delete('/roles/:id', rolesCtl.eliminarRolController);

// Usuarios
router.get('/usuarios', usuariosCtl.obtenerUsuariosController);
router.post('/usuarios', usuariosCtl.crearUsuarioController);
router.put('/usuarios/:id', usuariosCtl.actualizarUsuarioController);
router.delete('/usuarios/:id', usuariosCtl.eliminarUsuarioController);

// Cursos
router.get('/cursos', cursosCtl.obtenerCursosController);
router.post('/cursos', cursosCtl.crearCursoController);
router.put('/cursos/:id', cursosCtl.actualizarCursoController);
router.delete('/cursos/:id', cursosCtl.eliminarCursoController);

// Usuarios_Cursos
router.get('/usuarios-cursos', usuariosCursosCtl.obtenerUsuariosCursosController);
router.post('/usuarios-cursos', usuariosCursosCtl.asignarCursoUsuarioController);
router.put('/usuarios-cursos/:id', usuariosCursosCtl.actualizarCursoUsuarioController);
router.delete('/usuarios-cursos/:id', usuariosCursosCtl.eliminarCursoUsuarioController);


router.post('/login', authCtl.loginController);

module.exports = router;
