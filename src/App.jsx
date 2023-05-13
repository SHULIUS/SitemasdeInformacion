import React, {useEffect} from 'react'
import ContainerLog from './components/ContainerLog.jsx'
import Login from './Login.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from './firebaseAuth.js';


export default function App() {
  const [usuario, setUsuario] = React.useState(null);
  useEffect(()=>{
    auth.auth().onAuthStateChanged((usuarioFirebase)=>{

      console.log("Ya tienes sesion inciada con:",usuarioFirebase);
      setUsuario(usuarioFirebase);
    })
  }, []);
  

  return (
    <div className='container p-4'>
      <div>
      {usuario ? <ContainerLog/> :  <Login setUsuario = {setUsuario}/>}
    </div>
    
     <ToastContainer/> 
    </div>
  )
}

  
