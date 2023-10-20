const bcrypt = require('bcrypt');

// Generar un hash para la contraseña
const generatePasswordHash = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// Verificar si la contraseña coincide con el hash almacenado
const comparePassword = async (password, hash) => {
    try {

        console.log('password: ', password);
        console.log('hash: ', hash)
        if (!password || !hash) {
            throw new Error('Se requieren datos y argumentos de hash');
        }

        return await bcrypt.compare(password, hash);
    } catch (error) {
        console.error('Error en comparePassword:', error.message);
        throw error;
    }
};



module.exports = {
    generatePasswordHash,
    comparePassword,
};
