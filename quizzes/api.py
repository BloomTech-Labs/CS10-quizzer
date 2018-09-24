import stripe

from decouple import config
from django.http import JsonResponse

def make_payments(req):
    '''
    TODO: prevent requests that are not authenticated from making transactions
          this can be accomplished by checking req.body. From there we will
          most likely want to check the JWT or some header that we can send
          from the client

    TODO: dynamically set: amount, recept_email

    TODO: find out how to set currency depending on the users location
    '''
    if req.method == 'POST':
        # sets the stripe API key
        stripe.api_key = config('STRIPE_SECRET_KEY')

        # makes a charge for 500 cents ($5.00USD)
        charge = stripe.Charge.create(
            amount=500,
            currency='usd',
            source='tok_visa',
            receipt_email='bsquared18@gmail.com'
        )

        return JsonResponse({
            'statusText': 'OK',
            'statusCode': 200
        })

    return JsonResponse({ 'error': 'An error occurred while maiking a payment' })