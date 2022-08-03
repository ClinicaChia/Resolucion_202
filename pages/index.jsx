import { useState } from "react";
import { FaFileUpload,FaRegFileExcel,FaTelegramPlane } from "react-icons/fa";
import axios from "axios";

const sedes = ["Seleccione una sede","CHOCONTA","CLINICA CHIA","FACATATIVA",
"MOSQUERA","SOGAMOSO","SUESCA","TENJO","TUNJA","VIVENZA",
"ZIPAQUIRA","ZIPAQUIRA SANITAS"] //saldra de la base de datos

export default function Home() {

  const [sede, setSede] = useState("")
  const [file, setFile] = useState("")
  const [fileName, setFileName] = useState("")

  const handleChange = (e) => {
    setSede(e.target.value)
  }

  const handleChange2 = (e) => {
    
    setFile(e.target.files[0])
    setFileName(e.target.files[0].name)
  }

  const handleSubmit = (e) => {

      //send file to server axios
      const formData = new FormData()
      formData.append("file", file)
      
      axios.post(`/api/prueba?fn=${fileName}&sede=${sede}`,formData ,{
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {alert(res.data)})
  }


  return (
    <>
    <h1>Automatización Resolución 202</h1>
    <div className='container'>
      <section className='row'>

        <select value={sede} onChange={handleChange}>
          
          {sedes.map((sede,index) => {
            return <option value={sede} key={index}>{sede}</option>
          })}
          
        </select>
          
        <article className="btns">
            <label className="File">
              <input type="file" onChange={handleChange2} accept='application/gzip,.rar, .zip'/>
              <p> <FaFileUpload />{fileName==""? "Subir Archivo":fileName}</p>
            </label>
            <button className="send" onClick={handleSubmit}><p><FaTelegramPlane/>Enviar</p></button>
            <button className="Update"><p><FaRegFileExcel/>Descargar</p></button>

        </article>
        
        
      </section>

      <table>
        <thead>
          <tr>
            <th>Sede</th>
            <th>Fecha</th>
            <th>Archivo</th>

            
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CHOCONTA</td>
            <td>2020-01-01</td>
            <td>
              <a href="#">Archivo.zip</a>
            </td>
            </tr>
        </tbody>
      </table>
    </div>
    </>
    
  )
}
