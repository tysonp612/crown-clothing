import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publisherableKey =
    "pk_test_51JBo6VIohjXgxaSFxH9PE1jlKqkYJKn469iZZcpVxlaXZyR60tL5xKcqEBSO3Pp2hPoH8zuRYNQ4pOBRwPWcvX0500lxat7i3f";
  const onToken = (token) => {
    console.log(token);
    alert("Payment successful");
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="Crown Clothing Ltd"
      billingAddress
      shippingAddress
      image=""
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publisherableKey}
    />
  );
};

export default StripeCheckoutButton;
