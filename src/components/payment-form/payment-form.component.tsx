import type { SubmitEvent } from 'react';
import type { StripeCardElement } from '@stripe/stripe-js';

import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { useAppSelector } from '../../store/hooks';

import { selectCartTotal } from '../../store/cart/cart.selectors';
import { selectCurrentUser } from '../../store/user/user.selectors';

import BUTTON_TYPE_CLASS from '../button/button-type-class';

import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton,
} from './payment-form.styles';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useAppSelector(selectCartTotal);
  const currentUser = useAppSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const isValidCard = (
    card: StripeCardElement | null,
  ): card is StripeCardElement => card !== null;

  const paymentHandler = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessingPayment(true);

    try {
      const response = await fetch(
        '/.netlify/functions/create-payment-intent',
        {
          method: 'post',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ amount: amount * 100 }),
        },
      );

      if (!response.ok)
        throw new Error(
          `Error fetching create-payment-intent: ${response.status} - ${response.statusText}`,
        );

      const value = await response.json();

      const {
        paymentIntent: { client_secret },
      } = value;

      const card = elements.getElement(CardElement);

      if (!isValidCard(card)) return;

      const paymentResult = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card,
          billing_details: {
            name: currentUser ? currentUser.displayName : 'Guest',
          },
        },
      });

      if (paymentResult.error) {
        alert(paymentResult.error);
      } else {
        if (paymentResult.paymentIntent.status === 'succeeded') {
          alert('Payment Successful!');
        }
      }

      setIsProcessingPayment(false);
    } catch (error) {
      setIsProcessingPayment(false);
      console.log(error);
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <PaymentButton
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPE_CLASS.inverted}
        >
          Pay now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
