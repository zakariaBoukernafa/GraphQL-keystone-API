import Stripe from 'stripe';

const stripConfig = new Stripe(process.env.STRIPE_SECRET || '', {
  apiVersion: '2020-08-27',
});

export default stripConfig;
