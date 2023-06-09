/* eslint-disable */
import React, { useState, useEffect } from "react";
import axios from 'axios';

import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import NumberFormat from "react-number-format";
import TablaProducts from "../components/TablaProducts";
import AddToCartBtn from "../components/AddToCartBtn";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import Spinner from "../components/layout/Spinner";
import Message from "../components/Message";

const ProductScreen = ({ history, match }) => {
  const [arrList, setarrList] = useState([]);
  const [items, setItems] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [brand, setBrand] = useState("");
  const [cantidad, setCantidad] = useState("");
 
  const URL ="https://zpje4svosl.execute-api.us-east-1.amazonaws.com/dev/products"

 

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar los campos del formulario
    if (
      !nombre ||
      !descripcion ||
      !precio ||
      !categoria ||
      !brand ||
      !cantidad
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
    };

    // Agregar el nuevo item usando la función pasada como prop
    agregarItem(nuevoItem);

    // Limpiar los campos del formulario
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setCategoria("");
    setBrand("");
    setCantidad("");
  };
  const fetchData = async () => {
    try {

      // const response = await axios('/api/items'); // Use the relative path to your API endpoint
      const response = await axios(URL); // Use the relative path to your API endpoint
      const data = await response;
      let arr = data.data.body;
      console.log(data.data.body);
      setItems(arr);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const agregarItem = async (nuevoItem)=>{
    // arrList.push(obj);
    try {
      // const response = await axios('/api/items'); // Use the relative path to your API endpoint
      const response = await axios.post(URL, nuevoItem); // Use the relative path to your API endpoint
      const data = await response;
      alert(data.data.body);
      fetchData();
    } catch (error) {
      console.error(error);
    }
    console.log(arrList);
  }
  // const user =
  //   userInfo &&
  //   product &&
  //   product.reviews.find((review) => review.user === userInfo._id);

  return (
    <div>
      {/* <Helmet>
   
      </Helmet>
      <Button onClick={() => history.goBack()} className="mb-3">
        Volver
      </Button> */}
        
          {/* <Row> */}
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
                onChange={(e) => setPrecio(e.target.value)}
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
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
              />

              <button className="button1" type="submit">
                Agregar
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
