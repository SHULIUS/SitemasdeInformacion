import React, { useState, useEffect } from 'react'
import { db } from '../firebase.js'

export default function login(props) {
  const initialStateValues = {
    username: '',
    password: '',
    description: '',
    url: ''
  }

  const [values, setValues] = useState(initialStateValues);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Encriptar contraseña con cifrado de Julio César
    const encryptedPassword = julioCesar(values.password);
    // Enviar objeto con contraseña encriptada a la base de datos
    props.addOredditLogin({ ...values, password: encryptedPassword });
    setValues({ ...initialStateValues });
  };

  const getlinkbyid = async id => {
    const doc = await db.collection('Logins').doc(id).get();
    setValues({ ...doc.data() });
  }

  useEffect(() => {
    if (props.currentid === "") {
      setValues({ ...initialStateValues });
    } else {
      getlinkbyid(props.currentid);
    }
  }, [props.currentid]);

  // Función que encripta la contraseña con cifrado de Julio César
  const julioCesar = (password) => {
    const shift = 3; // Cantidad de posiciones a desplazar
    let encryptedPassword = "";
    for (let i = 0; i < password.length; i++) {
      let charCode = password.charCodeAt(i);
      if (charCode >= 65 && charCode <= 90) { // Letras mayúsculas
        charCode = ((charCode - 65 + shift) % 26) + 65;
      } else if (charCode >= 97 && charCode <= 122) { // Letras minúsculas
        charCode = ((charCode - 97 + shift) % 26) + 97;
      }
      encryptedPassword += String.fromCharCode(charCode);
    }
    return encryptedPassword;
  }

  return (
    
    <form className='card card-body' onSubmit={handleSubmit}>
        <h1>Sistema de Información</h1>
      <input type="text" placeholder='Username..' value={values.username} name='username' onChange={handleInputChange} />
      <br />
      <input type="password" placeholder='Password..' value={values.password} name='password' onChange={handleInputChange} />
      <br />
      <input type="text" placeholder='Url o Ruta de Acceso..' value={values.url} name='url' onChange={handleInputChange} />
      <br />
      <textarea placeholder='Descripción..' value={values.description} name='description' onChange={handleInputChange} />
      <br />
      <button className='btn btn-primary btn-block'>
        {props.currentid === '' ? 'Guardar Registro' : 'Actualizar Registro'}
      </button>
    </form>
  )
}
