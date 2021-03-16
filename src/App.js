import {useState} from 'react';
import './App.css';

function App() {
  const [paymentIntent, setPaymentIntent] = useState();

  const sendPaymentIntent = () => {
    fetch("https://api.stripe.com/v1/payment_intents", {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa("sk_test_4eC39HqLyjWDarjtT1zdp7dc:")}`
      },
      body: new URLSearchParams({
        "amount": 10,
        "currency": "usd",
        "payment_method_types[]": "card",
        "receipt_email": "jenny.rosen@example.com"
      })
    })
    .then(rsp => rsp.ok ? rsp : Promise.reject(rsp))
    .then(rsp => rsp.json())
    .then(setPaymentIntent)
    .catch(console.error)
  };

  return (
    <div className="App">
      <header className="App-header">
        {paymentIntent && (<p>
          ☕☕☕☕☕
        </p>)}
        <button onClick={sendPaymentIntent}>
          Learn React
        </button>
      </header>
    </div>
  );
}

export default App;
