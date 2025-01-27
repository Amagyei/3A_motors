3A Motors Client & Employee Portal

A Django + React full-stack application that streamlines automotive service management. Clients can track their vehicles’ service records, view & pay invoices, and monitor job status in real time. Employees can manage job queues, service records, and payment confirmations via a unified web portal.

Table of Contents
	1.	Features
	2.	Tech Stack
	3.	Project Structure
	4.	Prerequisites
	5.	Setup Instructions
	•	Backend Setup (Django)
	•	Frontend Setup (React)
	•	Environment Variables
	•	Database Migrations
	6.	Running the Project
	7.	Usage & Endpoints
	8.	Payment Integrations
	9.	Testing
	10.	Deployment Tips
	11.	License

1. Features
	•	User Authentication: JWT-based login and registration for employees and clients.
	•	Vehicle Management: Create, read, update, delete (CRUD) vehicle records and track maintenance status.
	•	Service Records: Log issues, track repairs, and assign employees.
	•	Invoices & Payments:
	•	Real-time invoice generation and secure payment handling.
	•	Integration with Paystack/Flutterwave for transaction verification.
	•	Notifications: Potential for granular alerts (e.g., upcoming due dates, completed services).

2. Tech Stack
	•	Backend:
	•	Django & Django REST Framework
	•	PostgreSQL for relational data storage
	•	SimpleJWT for token-based auth
	•	Frontend:
	•	React + Material-UI for styling and layout
	•	Axios or Fetch for API requests
	•	DataGrid components for tabular data (e.g., vehicles, invoices, payments)
	•	Payment Gateways:
	•	Paystack, Flutterwave for real-time payments

3. Project Structure

3A_Motors/
├── iMotors/                # Django project root
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── ...
├── client_portal/          # Django app handling client-facing logic
│   ├── views.py
│   ├── models.py
│   ├── serializers.py
│   ├── urls.py
│   └── ...
├── user/                   # Custom user model & auth
├── vehicle/                # Vehicle-related models & endpoints
├── ...                     # Additional apps (e.g., payments, notifications)
├── frontend/               # React frontend source
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   └── package.json
├── README.md
├── requirements.txt        # Python dependencies
├── manage.py               # Django CLI
└── ...

4. Prerequisites
	•	Python 3.8+
	•	Node.js 14+ and npm or yarn
	•	PostgreSQL installed and running
	•	(Optional) Docker for containerization

5. Setup Instructions

Backend Setup (Django)
	1.	Clone the Repository:

git clone https://github.com/username/3a_motors_portal.git
cd 3a_motors_portal


	2.	Create & Activate Virtual Environment (recommendation):

python -m venv venv
source venv/bin/activate  # Linux/Mac
.\venv\Scripts\activate   # Windows


	3.	Install Python Dependencies:

pip install -r requirements.txt


	4.	Configure settings.py:
	•	Update DATABASES for PostgreSQL credentials.
	•	Add client_portal, user, vehicle, etc. to INSTALLED_APPS.
	•	Set ALLOWED_HOSTS to include 127.0.0.1 or your domain.

Frontend Setup (React)
	1.	Navigate to Frontend Directory:

cd frontend


	2.	Install Node Dependencies:

npm install
# or yarn
yarn install


	3.	Create a .env file (optional) to store config (e.g., REACT_APP_API_URL).

Environment Variables
	•	Backend:
	•	SECRET_KEY: Django secret key.
	•	DATABASE_URL: If you prefer a single env var for DB, or specify in settings.py.
	•	PAYSTACK_SECRET_KEY, FLUTTERWAVE_SECRET_KEY: Payment gateway creds.
	•	Frontend:
	•	REACT_APP_API_URL: Base URL for the API (e.g., http://127.0.0.1:8000/client_portal/api/v1).

Database Migrations

# In project root (where manage.py resides)
python manage.py makemigrations
python manage.py migrate

(Optional) Create a superuser:

python manage.py createsuperuser

6. Running the Project

Backend

cd 3a_motors_portal
python manage.py runserver

	•	The Django server typically runs on http://127.0.0.1:8000.

Frontend

cd frontend
npm start

	•	The React app typically runs on http://127.0.0.1:3000.

7. Usage & Endpoints
	•	Vehicles:
	•	GET /client_portal/api/v1/vehicles/ lists all vehicles.
	•	POST /client_portal/api/v1/vehicles/ adds a new vehicle (auth required).
	•	Service Records:
	•	GET /client_portal/api/v1/service-records/
	•	POST /client_portal/api/v1/service-records/ for creating a record with vehicle ID, issue description, etc.
	•	Invoices:
	•	GET /client_portal/api/v1/invoices/
	•	Real-time invoice status updated after payment verification.
	•	Payments:
	•	GET /client_portal/api/v1/payments/
	•	Includes transaction details, method (cash, paystack, etc.), status, timestamps.
	•	User Auth:
	•	POST /api/v1/user/login/ obtains access tokens.
	•	POST /api/v1/user/register/ for new user registration.

8. Payment Integrations
	•	Paystack:
	•	Initialize transactions: calls Paystack’s /transaction/initialize.
	•	Verify transaction via callback or by hitting /transaction/verify.
	•	Flutterwave:
	•	Similar approach, using their /payments endpoint.
	•	Invoice Status:
	•	Marked as “Paid” or “Failed” after verification.
	•	Reflected in the React front-end instantly (or upon refresh).

9. Testing
	•	Django Tests:
	•	python manage.py test runs back-end tests (models, views, etc.).
	•	React Tests (if applicable):
	•	npm test or yarn test.
	•	Manual / Postman Testing:
	•	Confirm each endpoint (service-records, invoices, payments) returns expected data.

10. Deployment Tips
	•	Production Settings:
	•	Use DEBUG=False in settings.py.
	•	Securely store SECRET_KEY and payment keys as environment variables.
	•	Database:
	•	Migrate production DB with manage.py migrate.
	•	Docker (Optional):
	•	Create Dockerfile for Django back-end, a separate one for React, or a multi-stage build to unify.
	•	Use docker-compose.yml to orchestrate containers (Django, PostgreSQL, React).
	•	CI/CD:
	•	Implement GitHub Actions or Jenkins pipelines to automate testing and deployment.



Thank you for using the 3A Motors Client & Employee Portal! If you have questions or encounter bugs, please open an issue or contact me directly. Enjoy streamlined vehicle service management!