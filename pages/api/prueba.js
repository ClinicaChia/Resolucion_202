
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
    
      fs.copyFile(file.filepath, `${process.env.BASE_FILES}${req.query.sede}/${req.query.fn}`, function (err) {
        if (err) {
          fs.mkdirSync(`./public/files/${req.query.sede}`, { recursive: true });
          fs.copyFile(file.filepath, `${process.env.BASE_FILES}${req.query.sede}/${req.query.fn}`, function (err){
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
  
 
  const python = spawn('python', [process.env.PHYTON_SCRIPT_FILE,
                                  folder,fn,process.env.JSON_FILE_PATH,
                                  process.env.BASE_SCRIPT_PATH,
                                  process.env.READY_PATH]);
  var dataToSend = "";
  python.stdout.on('data', function (data) {
 
    dataToSend = data.toString()

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
    
    //zip.extractAllTo("./",true)

     PythonScript(req.query.sede,req.query.fn,res)
    
  }
  else{
    cod = 500
    msg = "Error al subir el archivo"
    res.status(cod).json(msg)
  }
  

}
  