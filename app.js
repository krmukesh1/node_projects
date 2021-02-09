const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const env = require('dotenv').config()
const nodemailer = require('nodemailer')
const xoauth2 = require("xoauth2");

const app = express()

const PORT= process.env.PORT || 3000


// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }))
// create application/json parser
app.use(bodyParser.json())

app.get('/', (req, res)=>{
    res.send("Hello")
})

app.get('/contact', (req, res)=>{
    res.sendFile(path.join(__dirname+'/contact.html'))
    console.log("this is the form")
})
app.post('/contact', (req, res)=>{
  const output = `
  <p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>  
    <li>Name: ${req.body.user_name}</li>
    <li>Company: ${req.body.user_company}</li>
    <li>Email: ${req.body.user_mail}</li>
    <li>Phone: ${req.body.user_mobile}</li>
  </ul>
  <h3>Message</h3>
  <p>${req.body.user_message}</p>
`;
    "use strict";
    const nodemailer = require("nodemailer");
    
    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      let testAccount = await nodemailer.createTestAccount();
    
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        type: "OAuth2",
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.GMAIL_EMAIL, // generated ethereal user
          pass: process.env.GMAIL_PASS, // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: req.body.user_mail, // sender address
        to: "krmukeshsingh51@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: req.body.user_message, // plain text body
        html:output
       
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
    
    main().catch(console.error);
res.end("Your message has been sent success")
})

app.listen(PORT, ()=>{
    console.log('you are listening on port ' + "" + PORT)
})