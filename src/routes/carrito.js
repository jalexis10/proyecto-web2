const express = require('express');
const router = express.Router();
const { models } = require ('../libs/sequelize');
const persist = require('node-persist');


persist.init({
    dir: 'mydata',
    stringify: JSON.stringify,
    parse: JSON.parse,
    encoding: 'utf8',
    logging: false,
    ttl: false,
}).then(async () => {
    // Define la ruta GET para la página de tienda
    router.get('/carrito', (req, res) => {
        console.log('Recuperando el carrito...');
        // Recupera el carrito almacenado
        persist.getItem('carrito').then(carrito => {
            // Si el carrito no existe, inicialízalo como un array vacío
            carrito = carrito || [];

            // Usa el carrito en tu renderización o lógica
            
        }).catch(error => {
            console.error('Error al recuperar el carrito:', error);
            res.status(500).send('Error interno del servidor');
        });
    });


// Ejemplo de ruta en el servidor
router.post('/', async (req, res) => {
    try {
        // Recupera el carrito almacenado
        persist.getItem('carrito').then(carrito => {
            // Si el carrito no existe, inicialízalo como un array vacío
            carrito = carrito || [];

            console.log(carrito); // Esto debería imprimir el carrito correctamente
            const product = carrito.map(producto =>({
                id : producto.id,
                nombre : producto.nombre,
                precio : producto.precio,                
            }));

            // Usa el carrito en tu renderización o lógica

            const datosCliente = {
                nombre_cliente: req.body.nombre_cliente,
                apellido_cliente: req.body.apellido_cliente,
                cedula_cliente: req.body.cedula_cliente,
                telefono_cliente: req.body.telefono_cliente,
                direccion_cliente: req.body.direccion_cliente,
                fecha_compra: req.body.fecha_compra,
                productos: product,
            };

            // Crear un nuevo registro en la tabla 'Carrito' para almacenar la información del cliente y productos
            models.Car.create(datosCliente).then(newCar => {
                persist.clear().then(() => {
                    console.log('Carrito limpiado');
                }).catch(error => {
                    console.error('Error al limpiar el carrito:', error);
                });
                res.redirect('/tienda');
            }).catch(error => {
                console.error(error);
                res.json({ message: 'Error al almacenar la mascota' });
            });

        }).catch(error => {
            console.error('Error al recuperar el carrito:', error);
            res.status(500).send('Error interno del servidor');
        });
    } catch (error) {
        console.error(error);
        res.json({ message: 'Error al procesar la compra' });
    }
});


}).catch(error => console.error('Error al configurar node-persist:', error));

module.exports = router;









