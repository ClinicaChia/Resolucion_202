// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var fs = require('fs');
var path = require('path');
export default async function handler(req, res) {

  //send file to client

  const filePath = path.resolve('.', 'public/listos/VIVENZA.xlsx')
  const fileBuffer = fs.readFileSync(filePath)
  res.setHeader('Content-Type', 
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8')

 //res.send(fileBuffer)
 res.status(200).send("holi")
}

