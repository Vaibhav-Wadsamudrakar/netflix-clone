import React, { useEffect, useState } from 'react'
import db from '../firebase'
import './PlansScreen.css'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { loadStripe } from "@stripe/stripe-js"

function PlansScreen() {

    const [products, setProducts] = useState([])
    const user = useSelector(selectUser)
    const [subscription,setSubscription]=useState(null)

    useEffect(()=>{
        db
        .collection('customers')
        .doc(user.uid)
        .collection('subscriptions')
        .get()
        .then(querySnapshot=>{
            querySnapshot.forEach(async subscription=>{
                setSubscription({
                    role:subscription.data().role,
                    current_period_end:subscription.data().current_period_end.seconds,
                    current_period_start:subscription.data().current_period_start.seconds,

                })
            })
        })
    },[user.uid])

    useEffect(() => {
        db.collection("products")
            .where("active", "==", true)
            .get()
            .then(querySnapshot => {
                const products = {}
                querySnapshot.forEach(async productDoc => {
                    products[productDoc.id] = productDoc.data();
                    const priceSnap = await productDoc.ref.collection('prices').get();
                    priceSnap.docs.forEach(price => {
                        products[productDoc.id].prices = {
                            priceId: price.id,
                            priceData: price.data()
                        }
                    })
                })
                setProducts(products);
            })
    }, [])

    // console.log(products);
    console.log(subscription);

    const loadCheckout = async (priceId) => {

        const docRef = await db
            .collection('customers')
            .doc(user.uid)
            .collection("checkout_sessions")
            .add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin,
            });
        docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data();

            if (error) {
                alert(`An error occured:${error.message}`);
            }

            if (sessionId) {
                // init stripe
                const stripe = await loadStripe('pk_test_51NSki0SGjMohrz4zbSg4JN71tlTFUkGLWemybtRS31PP94Tzd08kFLUgzTgmxUGjoPQ36S4orri0J2tT8EY5GQZk00NThIU3fu');
                stripe.redirectToCheckout({ sessionId });
            }
        });
    };

    // console.log(Object.keys(products),"test");
    return (
        <div className='plansScreen'>
        {subscription && <p>Renewal Date: {new Date(subscription?.current_period_end*1000).toLocaleDateString()}</p>}
            {Object.entries(products).map(([productId, productData]) => {
                ///TODO: Add some logic to check if user subscription is active
                const isCurrentPackage=productData.name?.includes(subscription?.role)
                return (
                    <div key={productId} 
                    className={`${
                        isCurrentPackage && "plansScreen__plan--disabled"
                        } plansScreen__plan`}>
                        <div className="planScreen__info">
                            <h3>{productData.name}</h3>
                            <h5>{productData.description}</h5>
                        </div>
                        <button onClick={() =>!isCurrentPackage && loadCheckout(productData.prices.priceId)}>
                            {isCurrentPackage?'Current Plan' : 'Subscribe'}
                        </button>
                    </div>
                );
            })}

        </div>
    )
}

export default PlansScreen
