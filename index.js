const express = require('express')
const nodemailer = require("nodemailer");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()
const port = process.env.PORT || 9010

let smptp_login = process.env.SMPTP_LOGIN ||'---'
let smptp_password = process.env.SMPTP_PASSWORD ||'---'
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let transporter = nodemailer.createTransport({
    service:'gmail',
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'olexandr.kk@gmail.com' , // generated ethereal user
        pass: '210130Kj', // generated ethereal password
    },
});

app.get('/',(req,res)=>{
    console.log('world get')
    res.send('Hello World')
})

app.post('/sendMassage', async (req, res) => {
    console.log('send Message')
    let {name, email, message}= req.body
    // create reusable transporter object using the default SMTP transport

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'From Hr your portfolio', // sender address
        to: "olexandr.kk@gmail.com", // list of receivers
        subject: "Hr wont You",
        html: `
<div>
<h1>Собщение с вашего портфолио</h1>
<p><strong>name:</strong>${name}</p>
<p><strong>email:</strong>${email}</p>
<p><strong>message:</strong>${message}</p>
</div>`
    });
    res.end('ok')

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})