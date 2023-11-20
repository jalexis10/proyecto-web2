const express = require('express');
const router = express.Router();
const session = require('express-session');
const persist = require('node-persist');
const multer = require('multer');
const sequelize = require('../libs/sequelize');
// Módulos internos
const { models } = require('../libs/sequelize');




// Rutas
// obtener categorias
router.get('/categorias', async (req, res) => {
    try {
        let categorias = await models.Cat.findAll({
            attributes: ['id_categoria', 'nombre_categoria'],
        });

        res.json(categorias);
        
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
// obtener productos
router.get('/', async (req, res)=>{
    
    let tienda = await models.Tien.findAll();

    res.render('tienda/adminproducts', { tienda: tienda });
});
//web crear
router.get('/create', (req, res) => {
    console.log("ENTRO A OBTENER EL FORMULARIO")
    res.render('tienda/create');
});


//web eliminar
router.post('/delete/:id', async (req, res) => {
    //console.log(req.params.id);

    const id = req.params.id;

  
    try {
        const deletedCount = await models.Tien.destroy({ where: { id } });
        if (deletedCount === 0) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }
        res.redirect('/adminproducts');
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Web ACTUALIZAR (Vista)
router.get('/update/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const tienda = await models.Tien.findByPk(id);
        if (tienda) {
            res.render('tienda/update',{ tienda });
        } else {
            res.status(404).send('Registro no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error interno del servidor');
    }
});

// Procesar la actualización
router.post('/update/:id', async (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    try {
        const tienda = await models.Tien.findByPk(id);

        if (tienda) {
            await tienda.update(newData);
            res.redirect('/adminproducts');
        } else {
            res.status(404).send('Registro no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;

