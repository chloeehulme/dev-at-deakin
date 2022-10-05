import React, { useState } from 'react'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from 'axios'
import "./css/payment-form.css"

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#f98c4e",
			color: "#3E3E3E",
			fontWeight: 500,
			fontSize: "16px",
			":-webkit-autofill": { color: "#3E3E3E" },
			"::placeholder": { color: "#fff" }
		},
		invalid: {
			iconColor: "#FF0000",
			color: "#3E3E3E"
		}
	}
}

function PaymentForm() {

    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

        if(!error) {
            try {
                const {id} = paymentMethod
                const response = await axios.post("http://localhost:8000/payment", {
                    amount: 1500,
                    id: id
                })
    
                if (response.data.success) {
                    console.log("successful payment")
                    setSuccess(true)
                }
    
            } catch (error) {
                console.log("error: ", error)
            }
        } else {
            console.log(error.message)
        }
    }


    return (
        <>
        {!success ? 
        <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <span className='pay-button'><button>Pay</button></span>
        </form>
        :
       <div>
           <h2 style={{paddingTop:"100px", marginLeft:"225px", fontWeight:"normal", color:"#3E3E3E"}}>Thank you for signing up for our Premium plan...</h2>
       </div> 
        }
        </>
    )
}

export default PaymentForm;


