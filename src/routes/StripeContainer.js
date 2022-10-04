import React, { useContext } from 'react'
import { Elements } from "@stripe/react-stripe-js"
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js'
import PaymentForm from '../PaymentForm'
import {UserContext} from '../context/user.context'
import Footer from '../footer'
import Banner from '../Banner'

const PUBLIC_KEY = "pk_test_51Lp1aLI627gs8DaPaR0r1daqnavua8fyMzOqS1kEWCJl1QiKwajegAKb3gb4CvkLKM6y5U0QHXQlYFCl7m2EZN5Z00vhf7wwzK"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

function StripeContiner() {

    const {currentUser} = useContext(UserContext);

    return (
        <Elements stripe={stripeTestPromise}>
            <div className='header'>
                    <header>
                        <div class="container">
                            <Link to = '/home-page' style={{textDecoration: "none"}}><h1>DEV<span>@</span>Deakin</h1></Link>
                            {currentUser !== null ? <div className='welcome-user'><h2>Welcome, <span style={{color: "darkcyan"}}>{currentUser.email}</span></h2></div> 
                            : <div className='welcome-user'></div>}
                        </div>
                    </header>
            </div>
            <div style={{marginBottom: "130px"}}></div>
            <Banner text="Payment Details..."/>
            <div style={{marginTop: "80px", width:"70%", marginLeft:"215px"}}>
                <PaymentForm />
            </div>
            <div style={{marginBottom: "230px"}}></div>
            <Footer />
        </Elements>
    )
}

export default StripeContiner;



