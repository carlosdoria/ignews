import Stripe from 'stripe'
import { version } from '../../package.json'

const apiKey = process.env.STRIPE_API_KEY || ''

export const stripe = new Stripe (
  apiKey,
  {
    apiVersion: '2020-08-27',
    appInfo: {
      name: 'Ignews',
      version
    }
  }
)
