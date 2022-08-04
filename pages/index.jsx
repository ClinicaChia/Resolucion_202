import { useState } from "react";
import { FaFileUpload,FaRegFileExcel,FaTelegramPlane } from "react-icons/fa";
import axios from "axios";
import Estados from "../components/estados";


const sedes = ["Seleccione una sede","CHOCONTA","CLINICA CHIA","FACATATIVA",
"MOSQUERA","SOGAMOSO","SUESCA","TENJO","TUNJA","VIVENZA",
"ZIPAQUIRA","ZIPAQUIRA SANITAS"] //saldra de la base de datos

export default function Home() {

  const [sede, setSede] = useState("")
  const [file, setFile] = useState("")
  const [fileName, setFileName] = useState("")
  const [estado, setEstado] = useState(0)

  const handleChange = (e) => {
    setSede(e.target.value)
    setEstado(1)
  }

  const handleChange2 = (e) => {
    
    setFile(e.target.files[0])
    setFileName(e.target.files[0].name)
    setEstado(2)
  }

  const handleSubmit = (e) => {

      //send file to server axios
      const formData = new FormData()
      formData.append("file", file)
      setEstado(3)
      axios.post(`/api/prueba?fn=${fileName}&sede=${sede}`,formData ,{
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {alert(res.data)
      
      setEstado(4)
      
      })
  }

  const handleDownload = (e) => {
    window.open(`/api/download?sede=${sede}`)
   setEstado(5)

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
            <button className="Update" onClick={handleDownload}><p><FaRegFileExcel/>Descargar</p></button>

        </article>
        
      </section>

          <section className="pasos">
            <Estados estado={estado}/>
          </section>
      
    </div>
    </>
    
  )
}
