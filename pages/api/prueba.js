
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');
const AdmZip = require('adm-zip');
const {spawn} = require('child_process');


export const config = {
  api: {
    bodyParser: false,
  },
};

async function SaveRaR(req) {
  let File = null
  var Name = ""

  await new formidable.IncomingForm().parse(req)
  .on('file', function(name, file) {
       
    
      Name =  file.filepath.split("\\")[file.filepath.split("\\").length - 1]
    
      fs.copyFile(file.filepath, `E:/paginas_web/resolucion_202/public/files/${req.query.sede}/${req.query.fn}`, function (err) {
        if (err) {
          fs.mkdirSync(`./public/files/${req.query.sede}`, { recursive: true });
          fs.copyFile(file.filepath, `E:/paginas_web/resolucion_202/public/files/${req.query.sede}/${req.query.fn}`, function (err){
            if (err) {
              throw err;
            }
          })
        }
      })

      
      //fs.createWriteStream('./public/files/SUESCA/prueba.rar').write(file.PersistentFile);

  })
  .on('field', function(name, field) {
      
  })
  .on('error', function(err) {
      throw (err);
  })
  .on('end', function() {
    
    
  });
  return true
}

async function PythonScript(folder,fn,res) {
  
  console.log("si")
  const python = spawn('C:/Users/juansc/AppData/Local/Programs/Python/Python310/python.exe', ['E:/paginas_web/resolucion_202/pages/api/script.py', folder,fn]);
  var dataToSend = "";
  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    dataToSend = data.toString()
    console.log(dataToSend)
  });

  python.stderr.on('data', (data) => {
    console.error(data.toString())
    return false
});

  python.on('close', (code) => {
    fs.readdirSync(`./public/files/${folder}`).forEach(file => {
      fs.unlinkSync(`./public/files/${folder}/${file}`);})

      res.status(200).json("Archivo creado correctamente")

    return true
    });

  

}
export default async function handler(req, res) {

  const file_path= await SaveRaR(req)
  let cod = 200
  let msg = "Archivo subido correctamente"
  if(file_path){
    console.log("si entro")
    //zip.extractAllTo("./",true)

     PythonScript(req.query.sede,req.query.fn,res)
    
  }
  else{
    cod = 500
    msg = "Error al subir el archivo"
    res.status(cod).json(msg)
  }
  

}
  