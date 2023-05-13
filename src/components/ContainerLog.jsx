import React, { useEffect, useState } from 'react';
import Informacion from './Informacion';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../firebase.js'
import '../estilos/container.css'


export default function ContainerLog() {

    const onDeleteLog = async id => {
        if (window.confirm("¿Seguro que quieres eliminar este registro?")) {
            await db.collection('Logins').doc(id).delete();
            toast('Registro eliminado', {
                type: 'error',
                autoClose: 2000
            });
        }
    }

    const [Logs, setLogs] = useState([]);
    const [currentid, setcurrentid] = useState('');

    const addOredditLogin = async (LoginObject) => {
        try {
            if (currentid === '') {
                await db.collection('Logins').doc().set(LoginObject);
                toast('Nuevo registro agregado', {
                    type: 'success',
                    autoClose: 2000
                });
            } else {
                await db.collection('Logins').doc(currentid).update(LoginObject);
                toast('Registro Actualizado', {
                    type: 'info',
                    autoClose: 2000
                });
                setcurrentid('');
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getLogs = async () => {
        db.collection('Logins').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setLogs(docs);
        });
    }

    useEffect(() => {
        getLogs();
    }, []);

    return (
        <div className="container">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <Informacion {...{ addOredditLogin, currentid, Logs }} />
    </div>
  </div>
  <div className="row justify-content-center">
    <div className="col-md-10">
      {Logs.map(link => (
        <div className="card mb-3" key={link.id}>
          <div className="card-body">
            <div className='d-flex justify-content-between'>
              <h4 className="mb-0">Nombre de usuario: {link.username}</h4>
              <div>
                <i className='material-icons text-danger mr-3' onClick={() => onDeleteLog(link.id)}>close</i>
                <i className='material-icons' onClick={() => setcurrentid(link.id)}>create</i>
              </div>
            </div>
            <p className="mb-0">Descripción: {link.description}</p>
            <a href={link.url} className="link-url">{link.url}</a>

            <hr/>
            <p className="mb-0">Contraseña encriptada: {link.password}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>


    )
}
