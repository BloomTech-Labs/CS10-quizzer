import stripe

from decouple import config
from django.http import JsonResponse

def make_payments(req):
    print(req.method)
    
    if req.method is 'POST':
        # sets the stripe API key
        stripe.api_key = config('STRIPE_SECRET_KEY')

        # makes a charge for 500 cents ($5.00USD)
        charge = stripe.Charge.create(
            amount=500,
            currency='usd',
            source='tok_visa',
            receipt_email='bsquared18@gmail.com'
        )

        return JsonResponse({ 'data': charge })

    return JsonResponse({ 'error': 'An error occurred while maiking a payment' })