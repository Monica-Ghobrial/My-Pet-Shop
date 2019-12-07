const nodemailer = require('nodemailer')
const config = require('../config/mail')

const dotenv = require('dotenv');
dotenv.config()

const transport = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port: 465,
   // secure:false,
    service: 'gmail',
    auth: {
        user: process.env.user,
        pass: process.env.pass
    },
    tls: {
        rejectUnauthorized: false
    }
})
 




module.exports = {
    sendEmail(from, to, subject, html, attachments){
        return new Promise ((resolve, reject) =>{
            transport.sendMail({ from, subject, to, html, attachments}, (err, info) => {
                if(err) {
                console.log(err)
                reject(err)
                }
                resolve(info)
                console.log(info)
            })
        })
    }
}