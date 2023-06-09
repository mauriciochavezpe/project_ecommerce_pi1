/* eslint-disable */
import React, { useState, useEffect } from "react";
import axios from "axios";

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

const DetailProduct = ({ history, match }) => {
  const productId = match.params.id;
  console.log(productId);
  // fetchData(orderId);
  const [arrList, setarrList] = useState([]);
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState("");

  const URL =
    "https://zpje4svosl.execute-api.us-east-1.amazonaws.com/dev/products";

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar los campos del formulario
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !brand ||
      !quantity
    ) {
      alert("Por favor, completa todos los campos");
      return;
    }

    // Crear un nuevo objeto con los datos del formulario
    const nuevoItem = {
      name,
      description,
      price,
      category,
      brand,
      quantity
    };

    // Agregar el nuevo item usando la función pasada como prop
    editarItem(nuevoItem);

    // Limpiar los campos del formulario
    setName("");
    setQuantity("");
    setPrice("");
    setCategory("");
    setBrand("");
    setDescription("");
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${URL}/${productId}`);
        console.log(response);
        setName(response.data.body.name);
        setDescription(response.data.body.description);
        setPrice(response.data.body.price);
        setCategory(response.data.body.category);
        setBrand(response.data.body.brand);
        setQuantity(response.data.body.quantity);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [productId]);
  const editarItem = async (nuevoItem) => {
    // arrList.push(obj);
    try {
      let sUrl = URL+ `/${productId}`;
      // const response = await axios('/api/items'); // Use the relative path to your API endpoint
      const response = await axios.patch(sUrl, nuevoItem); // Use the relative path to your API endpoint
      const data = await response;
      alert(data.data.body);
      history.push('/admin/products')
    } catch (error) {
      console.error(error);
    }
    console.log(arrList);
  };

  return (
    <div>
      <form className="formulario" onSubmit={handleSubmit}>
        <label className="label1" htmlFor="nombre">
          Nombre:
        </label>
        <input
          className="input1"
          type="text"
          id="nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="label1" htmlFor="descripcion">
          Descripción:
        </label>
        <input
          className="input1"
          type="text"
          id="descripcion"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="label1" htmlFor="precio">
          Precio:
        </label>
        <input
          className="input1"
          type="number"
          id="precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label className="label1" htmlFor="categoria">
          Categoría:
        </label>
        <input
          className="input1"
          type="text"
          id="categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <button className="button1" type="submit">
          Editar
        </button>
      </form>
      {/* <div className="container d-flex justify-center mt-2">
              <TablaProducts products={items} />
            </div> */}
    </div>
  );
};

export default DetailProduct;
