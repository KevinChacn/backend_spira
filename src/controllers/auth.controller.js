const jwt = require('jsonwebtoken');
const db = require('../database-MySQL');
const { comparePassword } = require('../utils/passwordUtils');

const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await getUserByEmail(email);
        console.log('usuario en logincontroller', user)

        if (comparePassword(password, user.password)) {
            const token = generateToken(user);
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


const getUserByEmail = async (email) => {
    try {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM spiradb.usuarios WHERE email_usuario = ? LIMIT 1', [email], (err, result) => {
                if (err) {
                    console.error('Error en la consulta de usuario por correo electrónico:', err);
                    reject(err);
                } else {
                    if (result && result.length > 0) {
                        console.log('Usuario encontrado: ', result[0]);
                        resolve(result[0]);
                    } else {
                        console.log('Usuario no encontrado');
                        resolve(null);
                    }
                }
            });
        });
    } catch (error) {
        console.error('Error en la consulta de usuario por correo electrónico:', error);
        throw error;
    }
};







const generateToken = (user) => {
    const payload = {
        id_usuarios: user.id_usuarios,
        email_usuario: user.email_usuario,
    };
    const secretKey = 'spira';
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
};

module.exports = {
    loginController,
};

