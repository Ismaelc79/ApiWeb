const express = require('express')
const app = express()

app.use(express.json())

const productos = [
    {
        id: 1,
        nombre: 'Teclado inalambrico',
        descripcion: 'Teclado 101 teclas idioma ingles',
        precio: 1500.00
    },
    {
        id: 2,
        nombre: 'Mouse inalambrico',
        descripcion: 'Mouse optico inalambrico.',
        precio: 600.00
    },
    {
        id: 3,
        nombre: 'Monitor 23.5 pulgadas full hd',
        descripcion: 'Monitor Full HD panel IPS',
        precio: 6500.00
    }
]

// GET - Listar todos los productos
app.get('/productos', (req, res) => {
    res.json(productos)
})

// GET - Obtener un producto por id
app.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const producto = productos.find(p => p.id === id)

    if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    res.json(producto)
})


// ============================================================
// PRÁCTICA 6: Completa los siguientes métodos de la API
// ============================================================

// TODO: POST /productos - Crear nuevo producto
app.post('/productos', (req, res) => {
    const { nombre, descripcion, precio } = req.body
    const precioNum = parseFloat(req.body.precio)

    if (!nombre || !descripcion || !precio) {
        return res.status(400).json({ mensaje: 'Datos del producto son requeridos' })
    }

    if(precioNum <= 0){
        return res.status(400).json({ mensaje: 'El precio debe ser mayor a 0' })
    }

    const nuevoProducto = {
        id: productos.length + 1,
        nombre,
        descripcion,
        precio: precioNum
    }

    productos.push(nuevoProducto)

    res.status(201).json(nuevoProducto)
})

// TODO: PUT /productos/:id - Actualizar producto
app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const producto = productos.findIndex(p => p.id === id)

    if (producto === -1) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    if (!nombre || !descripcion || !precio) {
        return res.status(400).json({ mensaje: 'Datos del producto son requeridos' })
    }

    if(precio <= 0){
        return res.status(400).json({ mensaje: 'El precio debe ser mayor a 0' })
    }

    const { nombre, descripcion, precio } = req.params

    if (nombre) producto.nombre = nombre
    if (descripcion) producto.descripcion = descripcion
    if (precio) producto.precio = precio

    res.status(200).json(producto)
})

// TODO: DELETE /productos/:id - Eliminar producto
app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = productos.findIndex(p => p.id === id)

    if (index === -1) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    productos.splice(index, 1)

    const { nombre, descripcion, precio } = req.params

    res.json({ producto: { nombre, descripcion, precio }, mensaje: 'Producto eliminado' })

})

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000')
})
