/* eslint-disable */
import React, { useState, useEffect,useRef } from "react";
import axios from "axios";

  
const DetailProduct = ({ history, match }) => {
  const productId = match.params.id;
  console.log(productId);
  // fetchData(orderId);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [image, setImagen] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  const handleResetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const URL =
    "https://zpje4svosl.execute-api.us-east-1.amazonaws.com/dev/products";

  const handleSubmit = (e) => {
    e.preventDefault();


    if(price<0){
      alert("los valores deben ser mayores a 1 PEN")
      return;
    }
    if(quantity<0){
      alert("los valores deben ser mayores a 1 unidad")
      return;
    }
    // Validar los campos del formulario
    if (!name || !description ||  !(price>0)  || !category || !brand || !(quantity>0)) {
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
      quantity,
      image,
    };


    if (selectedFile) {
      // Perform API operations with the selected file
      console.log('File selected:', selectedFile);
    } else {
      console.log('No file selected');
    }

    // Agregar el nuevo item usando la función pasada como prop
    editarItem(nuevoItem);

    // Limpiar los campos del formulario
    setName("");
    setQuantity("");
    setPrice("");
    setCategory("");
    setBrand("");
    setDescription("");
    setImagen("");

  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${URL}/${productId}`);
        console.log(response);
        setName(response.data.product.name);
        setDescription(response.data.product.description);
        setPrice(response.data.product.price);
        setCategory(response.data.product.category);
        setBrand(response.data.product.brand);
        setQuantity(response.data.product.quantity);
        // setImagen(response.data.product.image);
        // fileInputRef.current.value=response.data.product.image;
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [productId]);
  const editarItem = async (nuevoItem) => {
    // arrList.push(obj);
    try {
      nuevoItem.image="https://cdn.shopify.com/s/files/1/0632/7880/9324/products/IMG-7325616.jpg?v=1663002895"
      let sUrl = URL + `/${productId}`;
      const response = await axios.patch(sUrl, nuevoItem); // Use the relative path to your API endpoint
      const data = await response;
      alert(data.data.message);
      history.push("/admin/products");
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
        <label className="label1" htmlFor="cantidad">
          Imagen:
        </label>
        <input
          className="input1"
          type="file"
          id="image"
          // value={fileInputRef}
          value={image}
          // ref={fileInputRef}
          onChange={(e) => setImagen(e.target.value)}
        />

        <button className="button1" type="submit">
          Editar producto
        </button>
      </form>
      {/* <div className="container d-flex justify-center mt-2">
              <TablaProducts products={items} />
            </div> */}
    </div>
  );
};

export default DetailProduct;
