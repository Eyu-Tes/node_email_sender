const nodemailer = require('nodemailer')

// @desc    show send email form
module.exports.showSendEmail = (req, res) => res.render('index')

// @desc    send email
module.exports.sendEmail = async (req, res) => {
    try {
        // create transporter object
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_APP_PASSWORD
            }, 
            tls: {
                // Removes - Error: self signed certificate in certificate chain
                rejectUnauthorized: false
            }
        })

        // mail options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: req.body.receiverEmail, 
            subject: req.body.subject,
            text: req.body.message
        }

        // send email
        let info = await transporter.sendMail(mailOptions)
        console.log(`Email Sent. \t ${info.response}`, )
        req.flash('success_msg', "Email Successfully Sent!")
        res.redirect('/')
    } catch (error) {
        console.log(error)
        req.flash('error_msg', "Email Not Sent!")
        res.redirect('/')
    }
}
