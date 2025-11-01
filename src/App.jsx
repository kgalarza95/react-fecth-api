import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const URL_API = "https://69067edbee3d0d14c135f0a0.mockapi.io/product";

  const [productos, setProductos] = useState([]);

  const [precio, setPrecio] = useState("");
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");

  //Forma de leer del back
  useEffect(() => {
    fetch(URL_API)
      .then((response) => response.json())
      .then((data) => setProductos(data));
  }, []);

  //Forma de crear un recurso en el back
  const crearProducto = () => {
    const nuevoProducto = {
      name: nombre,
      price: precio,
      category: categoria,
    };

    fetch(URL_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoProducto),
    })
      .then((res) => res.json())
      .then((data) => {
        setProductos([...productos, data]);
        // Limpiar formulario
        setNombre("");
        setPrecio("");
        setCategoria("");
      });
  };

  //Forma de eliminar un recurso en el back
  const eliminarProducto = (id) => {

    fetch(`${URL_API}/${id}`, {
      method: "DELETE",
    }).then(() => {
      // Quitar de la lista
      setProductos(  productos.filter((p) => p.id !== id)    );
    });

  };

  return (
    <div className="app">
      <h1>🛒 CRUD de Productos</h1>

      {/* Formulario para crear */}
      <div className="formulario">
        <h2>Crear Producto</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <input
          type="text"
          placeholder="Categoría"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />

        <button onClick={crearProducto}>Crear</button>
      </div>

      {/* Lista de productos */}
      <div className="lista">
        <h2>Lista de Productos</h2>

        {productos.map((producto) => (

          <div key={producto.id} className="producto">
            <h3>{producto.name}</h3>
            <p>Precio: ${producto.price}</p>
            <p>Categoría: {producto.category}</p>


            <button onClick={() => eliminarProducto(producto.id)}>
              Eliminar
            </button>

            
          </div>


        ))}
      </div>
    </div>
  );
}

export default App;
