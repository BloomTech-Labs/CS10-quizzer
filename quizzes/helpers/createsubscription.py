import json
import jwt
import stripe

from decouple import config
from quizzes.models import Teacher

class CreateSubscription:
    def __init__(self, stripe_secret_key, body, plan, sub):
        self.stripe_secret_key = stripe_secret_key
        self.body              = body
        self.plan              = plan
        self.sub               = sub
        self.jwt               = None
        self.id                = None
        self.email             = None
        self.customer          = None
        self.Teacher           = None

    def set_api_key(self):
        stripe.api_key = self.stripe_secret_key

    def get_teacher(self):
        self.set_api_key()

        secret       = config('SECRET_KEY')
        algorithm    = 'HS256'
        decJWT       = jwt.decode(self.jwt, secret, algorithms=[ algorithm ])
        teacherID    = decJWT['sub']['id']
        self.Teacher = Teacher.objects.get(TeacherID=teacherID)

        return self.Teacher

    def check_if_customer_exists(self):
        teacher = self.get_teacher()
        customerID = teacher.CustomerID
        
        try:
            stripe.Customer.retrieve(id=customerID)['subscriptions']['data']
            return True

        except:
            return False
        
    def parse_body(self):
        self.body  = json.loads(self.body.decode('utf-8'))
        self.id    = self.body['token']['id']
        self.email = self.body['token']['email']
        self.jwt   = self.body['jwt']

    def create_customer(self):
        self.customer = stripe.Customer.create(
            email=self.email,
            source=self.id
        )

    def update_teacher(self):
        self.create_customer()
        self.Teacher.CustomerID = self.customer.id
        self.Teacher.Subscription = self.sub
        print(self.Teacher.CustomerID)
        self.Teacher.save(update_fields=['CustomerID', 'Subscription'])

    def create_subscription(self):
        self.update_teacher()
        
        stripe.Subscription.create(
            customer=self.customer.id,
            items=[{ 'plan': self.plan }]
        )