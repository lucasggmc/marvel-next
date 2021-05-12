const nodemailer = require('nodemailer');
require('dotenv').config()

  export default function sendEmail(req, res){       

    console.log('teste', process.env.USERMAIL)

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: process.env.USERMAIL,
            pass: process.env.PASSMAIL  
        }, 
        secure: true
    })    

    const comics = req.body.req

    let htmlComics = makeHTML(comics);

    transporter.sendMail({  
        from: `"MARVEL API 👻" <${process.env.USERMAIL}>`, // sender address
        to: req.body.email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: htmlComics, // html body
      })
      .then((response) =>{
        res.send(response)
      })
      .catch((error) =>{
        res.send(error)
      });
}

//monta o body para o envio de e-mail
function makeHTML(comics){
    
    let body = "";

    comics.map(comic => {
        const srcIMG = `${comic.thumbnail.path}.${comic.thumbnail.extension}`
        body += `<h1> ${comic.title} </h1>   <img src="${srcIMG}" width="300" height="500" /> <p> ${comic.description} </p>`; 
    })

    return body;
}