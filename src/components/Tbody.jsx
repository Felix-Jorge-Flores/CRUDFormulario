import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';
import Image from "next/image"

export const Tbody = () => {
  const { products, onDeleteUser, isEditing, onToggleIsEditing, setCurrentProduct } = useContext(UserContext);

  const onEdition = (product) => {
    setCurrentProduct(product);

    console.log(product);
    onToggleIsEditing();
  }
  const onCancelEdition = () => {
    onToggleIsEditing();
  }

  return (
    <tbody>
      {products.map((product) => (
        <tr key={product.id}>
          <td className="text-2sm text-white mb-6" >{product.name}</td>
          <td className="text-2sm text-white mb-6" >{product.description}</td>
          <td className="text-2sm text-white mb-6" >{product.price}</td>
          <td >
            {product.image &&
              <Image
                src={URL.createObjectURL(product.image)}
                alt="product_img"
                height="250"
                width="250"
              />
            }
          </td>
          <td>
            <button className="btn btn-danger" hidden={isEditing} onClick={() => onDeleteUser(product.id)}>X</button>
            <button className={`btn btn-danger`} onClick={() => { (!isEditing) ? onEdition(product) : onCancelEdition() }}>{(isEditing) ? 'Cancelar' : 'Editar'}</button>
          </td>
        </tr>
      ))}
    </tbody>
  )
}

