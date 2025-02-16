import { Link } from 'react-router-dom';
import { CartProduct } from '../lib/store';
import { store } from '../lib/store';
import { loadStripe } from "@stripe/stripe-js";
import { config } from '../../config';

const CheckoutBtn = ({ products }: {products: CartProduct[]}) => {
  const { currentUser }  = store();
  const publishableKey = "pk_test_51PTkk9Ro48HJquyfKdu1E3UBe1ruZt8dqNuZkvaknLgRgzrK1od1ooRvWaqjuH8lkZxxHWvaTFYDLaZnRXjylINs00ALirlEDl"
  const stripePromise = loadStripe(publishableKey);
  
  const handleCheckout = async() => {
    const stripe = await stripePromise;
    const response = await fetch(`${config.baseUrl}/checkout`,{
      method:'POST',
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        items: products,
        email: currentUser?.email,
      }),
    });
    const checkoutSession = await response.json();
    const result:any = await stripe?.redirectToCheckout({
      sessionId:checkoutSession.id,
    });
    if(result.error){
      window.alert(result?.error?.message);
    } 
  };
  return (
    <div className="mt-6">
        {
            currentUser 
            ? ( <button 
              onClick={handleCheckout}
              type="submit" 
              className="w-full rounded-md border border-transparent 
              bg-gray-800 px-4 py-3 text-base font-medium text-white 
              shadow-sm hover:bg-black focus:outline-none focus:ring-2
              focus:ring-skyText focus:ring-offset-2 
              focus:ring-offset-gray-50 duration-200"
              >
                Checkout
              </button>
              ) : (
                <button className="w-full text-base text-white text-center
                rounded-md border border-transparent bg-gray-500 px-4 py-3 
                cursor-not-allowed">
                  Checkout 
                </button>
              )
        }
        {!currentUser && 
          <p className="mt-2 text-sm font-medium text-red-500 text-center">
            Need to sign in to make checkout {"  "}
            <Link to={"/profile"} className="text-blue-900 font-semibold underline underline-offset-2
              decoration-[1px] hover:text-blue duration-200"> Sign in
            </Link>
          </p>
        }
    </div>
  )
}

export default CheckoutBtn