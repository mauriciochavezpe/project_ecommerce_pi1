/* eslint-disable */
import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import TablaProducts from "../components/TablaProducts";

const ProductScreen = ({ history, match }) => {
  // const [arrList, setarrList] = useState([]);
  const [items, setItems] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [categoria, setCategoria] = useState("");
  const [brand, setBrand] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [imagen, setImagen] = useState("");
 
  const URL ="https://zpje4svosl.execute-api.us-east-1.amazonaws.com/dev/products"
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar los campos del formulario
    if (
      !nombre ||
      !descripcion ||
      !(precio>0) ||
      !categoria ||
      !brand ||
      !(cantidad>0) ||
      !imagen
    ) {
      alert("Por favor, completa todos los campos");
      return;
    }

    // Crear un nuevo objeto con los datos del formulario
    const nuevoItem = {
      name: nombre,
      description: descripcion,
      price: precio,
      category: categoria,
      brand,
      quantity: cantidad,
      image: imagen,
    };

    // Agregar el nuevo item usando la función pasada como prop
    agregarItem(nuevoItem);

    // Limpiar los campos del formulario
    setNombre("");
    setDescripcion("");
    setPrecio(0);
    setCategoria("");
    setBrand("");
    setCantidad(0);
    setImagen("");
  };
  const fetchData = async () => {
    try {

      const response = await axios(URL); // Use the relative path to your API endpoint
      const data = await response;
      let arr = data.data.products;
      setItems(arr);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // "https://cdn.shopify.com/s/files/1/0632/7880/9324/products/IMG-7325616.jpg?v=1663002895

  const agregarItem = async (nuevoItem)=>{
    // arrList.push(obj);
    try {
      nuevoItem.image = "https://cdn.shopify.com/s/files/1/0632/7880/9324/products/IMG-7325616.jpg?v=1663002895"
      // const response = await axios('/api/items'); // Use the relative path to your API endpoint
      const response = await axios.post(URL, nuevoItem); // Use the relative path to your API endpoint
      const data = await response;
      alert(data.data.message);
      items.push(data.data.product)
      // fetchData();
    } catch (error) {
      console.error(error);
    }
  }
  // const user =
  //   userInfo &&
  //   product &&
  //   product.reviews.find((review) => review.user === userInfo._id);

  return (
    <div>
          <h2>
            Administrador de productos
          </h2>
            <form className="formulario" onSubmit={handleSubmit}>
              <label className="label1" htmlFor="nombre">
                Nombre:
              </label>
              <input
                className="input1"
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />

              <label className="label1" htmlFor="descripcion">
                Descripción:
              </label>
              <input
                className="input1"
                type="text"
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />

              <label className="label1" htmlFor="precio">
                Precio:
              </label>
              <input
                className="input1"
                type="number"
                id="precio"
                value={precio}
                min="0"
                onChange={(e) => setPrecio(+e.target.value)}
              />

              <label className="label1" htmlFor="categoria">
                Categoría:
              </label>
              <input
                className="input1"
                type="text"
                id="categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              />

              <label className="label1" htmlFor="brand">
                Marca:
              </label>
              <input
                className="input1"
                type="text"
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />

              <label className="label1" htmlFor="cantidad">
                Cantidad:
              </label>
              <input
                className="input1"
                type="number"
                id="cantidad"
                min="0"
                value={cantidad}
                onChange={(e) => setCantidad(+e.target.value)}
              />
              <label className="label1" htmlFor="cantidad">
                Imagen:
              </label>
              <input
                className="input1"
                type="file"
                id="img"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
              />

              <button className="button1" type="submit">
                Agregar Producto
              </button>
            </form>
            <div className="container d-flex justify-center mt-2">
              <TablaProducts products={items} />
            </div>
          {/* </Row> */}
         
     
    </div>
  );
};

export default ProductScreen;
