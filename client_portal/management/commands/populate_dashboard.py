# client_portal/management/commands/populate_dashboard.py
from decimal import Decimal, ROUND_HALF_UP
from django.core.management.base import BaseCommand
from django.utils import timezone
from django.db.utils import IntegrityError
from django.contrib.auth import get_user_model
from client_portal.models import (
    ServiceType,
    
    ServiceRecord,
    Invoice,
    Payment,
    Notification
)
import uuid
from vehicle.models import Vehicle
import random
from decimal import Decimal
from faker import Faker

fake = Faker()
User = get_user_model()

class Command(BaseCommand):
    help = 'Populate the database with sample data for the dashboard'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Starting to populate the database...'))

        # Create ServiceTypes
        service_types = ['Engine Repair', 'Oil Change', 'Brake Replacement', 'Tire Rotation', 'Transmission Repair']
        service_type_objs = []
        for st in service_types:
            obj, created = ServiceType.objects.get_or_create(name=st)
            service_type_objs.append(obj)
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created ServiceType: {st}'))
            else:
                self.stdout.write(f'ServiceType already exists: {st}')

        # Create Vehicles
        vehicle_models = ['Toyota Camry', 'Honda Accord', 'Ford Mustang', 'Chevrolet Impala', 'BMW 3 Series']
        vehicle_objs = []
        for i in range(1, 11):  # Create 10 vehicles
            model = random.choice(vehicle_models)
            registration_number = fake.unique.bothify(text='???-####')
            color = random.choice(['Red', 'Blue', 'Black', 'White', 'Silver'])
            vin = fake.unique.bothify(text='???????????????????')
            status = random.choice(['Active', 'In Maintenance', 'Inactive'])
            queue_position = random.randint(1, 10)
            year = random.randint(2000, 2022)
            owner = random.choice(User.objects.all())
            
            vehicle, created = Vehicle.objects.get_or_create(
                vehicle_id=i,
                defaults={
                    'model': model,
                    'registration_number': registration_number,
                    'color': color,
                    'vin': vin,
                    'status': status,
                    'queue_position': queue_position,
                    'year': year,
                    'owner': owner,
                }
            )
            vehicle_objs.append(vehicle)
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created Vehicle: {model} ({registration_number})'))
            else:
                self.stdout.write(f'Vehicle already exists: {model} ({registration_number})')

        # Create Employees (Users)
        employee_objs = []
        for i in range(1, 6):  # Create 5 employees
            username = f'employee{i}'
            email = f'employee{i}@example.com'
            full_name = fake.name()
            password = 'password123'  # In production, use secure passwords
            user, created = User.objects.get_or_create(
                username=username,
                defaults={
                    'email': email,
                    'full_name': full_name,
                    'user_type': 'employee', 
                }
            )
            if created:
                user.set_password(password)
                user.save()
                self.stdout.write(self.style.SUCCESS(f'Created Employee User: {username}'))
            else:
                self.stdout.write(f'Employee User already exists: {username}')
            employee_objs.append(user)

        # Create ServiceRecords
        service_records = []
        for i in range(1, 101):  # Create 50 service records
            service_type = random.choice(service_type_objs)
            vehicle = random.choice(vehicle_objs)
            assigned_to = random.choice(employee_objs)
            issue_description = fake.sentence(nb_words=6)
            status = random.choice(['Pending', 'In Progress', 'Completed'])
            payment_status = random.choice(['Unpaid', 'Paid'])
            date_initiated = fake.date_time_between(start_date='-2y', end_date='now')
            date_completed = date_initiated + timezone.timedelta(days=random.randint(1, 30)) if status == 'Completed' else None
            cost_estimate = round(random.uniform(100, 1000), 2)
            user = random.choice(User.objects.all())
            
            service_record, created = ServiceRecord.objects.get_or_create(
                serviceRecord_id=i,
                defaults={
                    'issue_description': issue_description,
                    'status': status,
                    'payment_status': payment_status,
                    'service_type': service_type,
                    'vehicle': vehicle,
                    'assigned_to': assigned_to,
                    'date_initiated': date_initiated,
                    'date_completed': date_completed,
                    'cost_estimate': cost_estimate,
                    'user': user,
                }
            )
            service_records.append(service_record)
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created ServiceRecord ID: {i}'))
            else:
                self.stdout.write(f'ServiceRecord already exists ID: {i}')

        # Create Invoices
        invoices = []
        for i in range(1, 21):  # Create 20 invoices
            try:  
                service_record = random.choice(service_records)
            except IntegrityError:
                continue
            amount = float(str(round(random.uniform(20, 100), 2)))
            status = random.choice(['Unpaid', 'Paid', 'Overdue'])
            due_date = fake.date_time_between(start_date=service_record.date_initiated, end_date='now')
            user = random.choice(User.objects.all())

            
            invoice, created = Invoice.objects.get_or_create(
                invoice_id=i,
                defaults={
                    'amount': amount,
                    'status': status,
                    'service_record': service_record,
                    'due_date': due_date,
                    'user': user,
                }
            )
            invoices.append(invoice)
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created Invoice ID: {i}'))
            else:
                self.stdout.write(f'Invoice already exists ID: {i}')

        # Create Payments
        payments = []
        for i in range(1, 31):  # Create 30 payments
            invoice = random.choice(invoices)
            if invoice.status == 'Paid':
                amount = invoice.amount
                status = 'Completed'
            else:
                # Define the minimum payment
                min_payment = Decimal('50.00')
                max_payment = invoice.amount

                if max_payment < min_payment:
                    payment_amount = max_payment
                else:
                    # Generate random cents to maintain precision
                    min_cents = int(min_payment * 100)
                    max_cents = int(max_payment * 100)
                    rand_cents = random.randint(min_cents, max_cents)
                    payment_amount = Decimal(rand_cents) / Decimal('100.00')
                
                status = 'Completed' if payment_amount >= invoice.amount else 'Pending'
                amount = payment_amount

            # Generate a unique transaction_id
            transaction_id = fake.unique.bothify(text='TXN-########')

            # Assign a random payment method
            payment_method = random.choice(['paystack', 'cheque', 'cash'])

            # Optionally, generate a paystack_reference if payment_method is 'paystack'
            if payment_method == 'paystack':
                paystack_reference = fake.unique.bothify(text='PSH-######')
            else:
                paystack_reference = None

            date = fake.date_time_between( end_date='now')

            try:
                payment, created = Payment.objects.get_or_create(
                    transaction_id=transaction_id,  # Use transaction_id as the lookup
                    defaults={
                        'amount': amount,
                        'status': status,
                        'payment_method': payment_method,
                        'paystack_reference': paystack_reference,
                        'payment_date': date,  
                        'invoice': invoice,
                    }
                )
                payments.append(payment)
                if created:
                    self.stdout.write(self.style.SUCCESS(f'Created Payment ID: {payment.id}'))
                else:
                    self.stdout.write(f'Payment already exists with Transaction ID: {transaction_id}')
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Error creating Payment: {e}'))

        # Create Notifications
        notification_types = ['info', 'warning', 'error']
        for i in range(1, 51):  # Create 50 notifications
            user = random.choice(employee_objs + [None])  # Some notifications might not be linked to a user
            message = fake.sentence(nb_words=8)
            notif_type = random.choice(notification_types)
            created_at = fake.date_time_between(start_date='-1y', end_date='now')
            read = random.choice([True, False])
            
            try:
                notification = Notification.objects.create(
                    message=message,
                    notification_type=notif_type,
                    created_at=created_at,
                    read=read,
                    user=user,
                )
                self.stdout.write(self.style.SUCCESS(f'Created Notification ID: {notification.id}'))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Error creating Notification: {e}'))

        self.stdout.write(self.style.SUCCESS('Database population complete!'))