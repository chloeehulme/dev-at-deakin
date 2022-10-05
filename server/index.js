const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
require("dotenv").config()

const sgMail = require("@sendgrid/mail")
var validator = require("email-validator");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)

app.post("/payment", cors(), async (req, res) => {
	let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "AUD",
			description: "Dev@Deakin Premium Plan",
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})

const sendMail = async (msg) => {
    try {
        await sgMail.send(msg)
        console.log("Message sent successfully...")
    } catch (error) {
        console.error(error)

        if (error.response) {
            console.error(error.response.body)
        }
    }
}

app.post("/signup", cors(), async (req, res) => {
    const email = req.body.email

    if (validator.validate(email)) {
		try {
			const response = await sendMail({
				to: email,
				from: "chloeehulme@gmail.com",
				subject: "Welcome!",
				text: "Hi " + email + ", \n\nWelcome to DEV@Deakin! \n\n Best Wishes, \n The Dev@Deakin Team",
			})
			console.log("email sent to: ", email)
			res.status(200).json("email sent successfully")
		} catch (error) {
			console.log("Error", error)
			res.status(400).json("email failed to send")
		}

    }
})

app.listen(process.env.PORT || 8000, () => {
	console.log("Sever is listening on port 8000...")
})