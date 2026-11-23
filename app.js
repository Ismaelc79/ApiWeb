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
// PRÁCTICA 6
// ============================================================

// POST /productos - Crear nuevo producto
app.post('/productos', (req, res) => {
    const { nombre, descripcion, precio } = req.body

    //Se utiliza undefined para que precio 0 pase a la siguiente validación
    if (!nombre || !descripcion || precio === undefined) {
        return res.status(400).json({ mensaje: 'Los campos nombre, descripcion y precio son obligatorios' })
    }

    //Se convierte precio a Float
    const precioNum = parseFloat(precio)

    //Se valida el precio, no puede ser "abc" (no un número) o menor a 0
    if (isNaN(precioNum) || precioNum <= 0) {
        return res.status(400).json({ mensaje: 'El precio debe ser un número mayor a 0' })
    }

    // id = mayor id existente + 1 (productos.length + 1 puede repetir ids tras un DELETE)
    const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1

    const nuevoProducto = {
        id: nuevoId,
        nombre,
        descripcion,
        precio: precioNum
    }

    productos.push(nuevoProducto)

    //Responde 201 y devuelve el nuevo producto
    res.status(201).json(nuevoProducto)
})

// PUT /productos/:id - Actualizar producto (reemplazo completo, mismo id)
app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = productos.findIndex(p => p.id === id)

    if (index === -1) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    //Misma estructura que el POST
    const { nombre, descripcion, precio } = req.body

    if (!nombre || !descripcion || precio === undefined) {
        return res.status(400).json({ mensaje: 'Los campos nombre, descripcion y precio son obligatorios' })
    }

    const precioNum = parseFloat(precio)

    if (isNaN(precioNum) || precioNum <= 0) {
        return res.status(400).json({ mensaje: 'El precio debe ser un número mayor a 0' })
    }

    //Reemplazo completo manteniendo su id
    productos[index] = { id, nombre, descripcion, precio: precioNum }

    //Respuesta 200 y el producto actualizado
    res.status(200).json(productos[index])
})

// DELETE /productos/:id - Eliminar producto
app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = productos.findIndex(p => p.id === id)

    //Validación del producto existente
    if (index === -1) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    // splice devuelve un arreglo con los elementos eliminados
    const [eliminado] = productos.splice(index, 1)

    //Respuesta 200, mensaje de producto eliminado y los datos de dicho producto
    res.status(200).json({ mensaje: 'Producto eliminado', producto: eliminado })
})

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000')
})