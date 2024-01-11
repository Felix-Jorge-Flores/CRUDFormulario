import { useReducer, useState } from "react";
import { userReducer } from "../reducers/userReducer";
import { UserContext } from "../context/UserContext";
import { useFormik } from 'formik';
import * as yup from 'yup';
import Swal from 'sweetalert2'
import { Table } from "../components/Table";

const validationSchema = yup.object().shape({
  id: yup.date().required(),
  name: yup.string().required('El nombre es obligatorio'),
  description: yup.string().required('La descripción es obligatoria'),
  price: yup.number().required('El precio es necesario')

});

const initialState = {
  products: [],
};

const initialValues = {
  id: 1,
  name: '',
  description: '',
  price: '',
  image: null,
};

function App() {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(initialValues);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: (isEditing) ? currentProduct : initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch({
        type: 'ADD_PRODUCT',
        payload: { ...values, id: Date.now() }
      })
      Swal.fire("Producto Agregado", 'Se registró el producto correctamente', "success");
      console.log(values);
      formik.resetForm();
    },
  });

  const onDeleteUser = (productID) => {
    dispatch({
      type: 'DELETE_PRODUCT',
      payload: productID
    })
    Swal.fire("Producto Eliminado", 'Se eliminó correctamente', "success");
  };

  const onToggleIsEditing = () => {
    setIsEditing(!isEditing);
  }

  const onUpdateUser = () => {
    console.log(formik.values);
    dispatch({
      type: 'UPDATE_PRODUCT',
      payload: formik.values
    })
    onToggleIsEditing();
    formik.resetForm();
    Swal.fire("Producto Actualizado", 'Se actualizo correctamente', "success");
  };

  const handleFileChange = (event) => {
    try {
      const file = event.target.files[0];
      if (!file) {
        throw new Error('Por favor, selecciona un archivo.');
      }
      formik.setFieldValue('image', file);
    } catch (error) {
      console.error('Error al manejar el cambio de archivo:', error.message);
    }
  };

  return (
    <UserContext.Provider value={
      {
        products: state.products,
        onDeleteUser: onDeleteUser,
        onToggleIsEditing: onToggleIsEditing,
        isEditing: isEditing,
        setCurrentProduct: setCurrentProduct,
      }
    }>
      <div className="bg-gray-900 container px-60 py-20">
        <div className="row">
          <div className="col-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-6">CRUD PARA PRODUCTOS</h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  className="mt-1 p-2 bg-green-800 border border-green-600 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-100 block w-full"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-sm font-bold text-white mb-6">{formik.errors.name}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Descripción"
                  name="description"
                  className="mt-1 p-2 bg-green-800 border border-green-600 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-100 block w-full"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="text-sm font-bold text-white mb-6">{formik.errors.description}</div>
                )}
              </div>

              <div className="form-group">
                <input
                  type="number"
                  name="price"
                  placeholder="Precio"
                  className="mt-1 p-2 bg-green-800 border border-green-600 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-100 block w-full"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.price && formik.errors.price && (
                  <div className="text-sm font-bold text-white mb-6">{formik.errors.price}</div>
                )}
              </div>

              <div className="form-group">
                <input
                  id="image"
                  type="file" name="image"
                  placeholder="Imagen"
                  onChange={handleFileChange}
                  onBlur={formik.handleBlur}
                  accept="image/*" />
                {formik.touched.image && formik.errors.image && (
                  <div className="text-sm font-bold text-white mb-6">{formik.errors.image}</div>
                )}
              </div>

              {(!isEditing) ? < button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green-dark">
                REGISTRAR
              </button> :
                < button onClick={() => onUpdateUser(currentProduct)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green-dark">
                  GUARDAR CAMBIOS
                </button>
              }
            </form>
          </div>
          <div className="col-6">
            <Table />
          </div>
        </div>
      </div>
    </UserContext.Provider >
  );
}

export default App;