import { UseForm } from '@/hooks/useForm';
import React, { useState } from 'react';
// formValues = {
//   id: 1,
//   name: '',
//   description: '',
//   price: '',
//   image: null,
// };

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  // const { formValues, handleInputChange, reset } = UseForm(formValues);
  const [newProduct, setNewProduct] = useState({
    id: 1,
    name: '',
    description: '',
    price: '',
    image: null,
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const addProduct = () => {
    if (editingIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editingIndex] = newProduct;
      setProducts(updatedProducts);
      setEditingIndex(null);
    } else {
      setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    }
    setNewProduct({ id: newProduct.id + 1, name: '', description: '', price: '', image: null });
  };

  const updateProduct = (index, product) => {
    setNewProduct(product);
    setEditingIndex(index);
  };

  const deleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts.map((product, index) => ({ ...product, id: index + 1 })));
    setEditingIndex(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'price') {
      const nonNegativePrice = Math.max(0, parseFloat(value));
      setNewProduct({ ...newProduct, [name]: nonNegativePrice });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  return (
    <div className='bg-gray-900'>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-6">CRUD PARA PRODUCTOS</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">Nombre</label>
        <input
          type="text"
          name="name"
          className="mt-1 p-2 bg-green-800 border border-green-600 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-100 block w-full"
          placeholder="Nombre del producto"
          value={newProduct.name}
          onChange={handleInputChange}
        />
      </div>


      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">Descripción</label>
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          className="mt-1 p-2 bg-green-800 border border-green-600 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-100 block w-full"
          value={newProduct.description}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">Precio en soles</label>
        <input
          type="number"
          name="price"
          placeholder="Precio en soles"
          className="mt-1 p-2 bg-green-800 border border-green-600 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-100 block w-full"
          value={newProduct.price}
          onChange={handleInputChange}
        />
      </div>
      <input
        type="file" name="image" onChange={handleImageChange}
      />
      {/* <input type="file" name="image" onChange={handleImageChange} /> */}
      <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green-dark" onClick={addProduct}>
        {editingIndex !== null ? 'Guardar Cambios' : 'Agregar Producto'}
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white border border-green-600">
          <thead>
            <tr>
              <th className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green-dark">ID</th>
              <th className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green-dark" >Producto</th>
              <th className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green-dark" >Descripción</th>
              <th className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green-dark" >Precio S/.</th>
              <th className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green-dark" >Imagen</th>
              <th className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green-dark" >Modificación</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>
                  {product.image && <img src={URL.createObjectURL(product.image)} alt="Product" />}
                </td>
                <td>
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green-dark" onClick={() => updateProduct(index, product)}>Editar</button>
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green-dark" onClick={() => deleteProduct(index)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}