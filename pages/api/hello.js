// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var fs = require('fs');
export default function handler(req, res) {


  res.status(200).json({ name: 'John Doe' })
}

export const config = {
  api: {
    bodyParser: false
  }
}