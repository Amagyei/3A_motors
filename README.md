# 3A Motors Client & Employee Portal

A **Django + React** full-stack application that manages all aspects of an automotive service business. It enables **clients** to track vehicle service progress, view invoices/payments, and manage their user profiles, while **employees** can handle job queues, service records, and receive notifications. The application also supports robust **payment integrations** (Paystack and Flutterwave) for invoice handling, as well as detailed logging of every model in the system.

---

## Table of Contents
1. [Overview](#overview)  
2. [Models](#models)  
   - [User](#user-model)  
   - [Profile](#profile-model)  
   - [Vehicle](#vehicle-model)  
   - [ServiceRecord](#servicerecord-model)  
   - [ServiceType](#servicetype-model)  
   - [Invoice](#invoice-model)  
   - [Payment](#payment-model)  
   - [Notification](#notification-model)  
3. [API Endpoints](#api-endpoints)  
   - [User & Auth Endpoints](#user--auth-endpoints)  
   - [Vehicle Endpoints](#vehicle-endpoints)  
   - [ServiceRecord Endpoints](#servicerecord-endpoints)  
   - [Invoice Endpoints](#invoice-endpoints)  
   - [Payment Endpoints](#payment-endpoints)  
   - [Notification Endpoints](#notification-endpoints)  
   - [ServiceType Endpoints](#servicetype-endpoints)  
   - [Employee Endpoints](#employee-endpoints)  
4. [Functionalities](#functionalities)  
5. [Setup & Installation](#setup--installation)  
6. [Usage](#usage)  
7. [Contributing](#contributing)  
8. [License](#license)  
9. [Appendix: Detailed Presentation Outline (~1000 Words)](#appendix-detailed-presentation-outline-1000-words)

---

## 1. Overview

**3A Motors Client & Employee Portal** is a web application built with:

- **Django & Django REST Framework** (Back-end)
- **React + Material UI** (Front-end)
- **PostgreSQL** (Database)
- **JWT-based Authentication** for secure sessions
- **Paystack & Flutterwave** integration for invoice payments

Users can log in as clients or employees to handle various tasks:

- **Clients**: Track vehicle services, view/pay invoices, receive relevant notifications.
- **Employees**: Manage service records, handle job queues, update vehicle statuses, verify or process payments.

---

## 2. Models

### **User Model**
- **Primary Key**: `uid` (ShortUUIDField)
- **Fields**:
  - `username` (unique)
  - `email` (unique)
  - `phone` (unique, optional)
  - `full_name` (optional)
  - `gender` (choices: "Male", "Female")
  - `user_type` (choices: "client", "employee", "administrator")
  - `is_active`, `is_staff`, `is_superuser`
  - `password` (hashed by Django)
- **Purpose**: Stores authentication data (username, password, etc.) and user role.

### **Profile Model**
- **OneToOneField** to `User`
- **Fields**:
  - `full_name`, `phone`, `gender`, `residential_address`, `mailing_address`
  - `parents_name`, `parents_number` (for certain client profiles)
  - `verified` (Boolean)
  - `wallet` (DecimalField)
  - `image` (profile picture)
- **Purpose**: Extended information for each user.

### **Vehicle Model**
- **Primary Key**: `vehicle_id` (ShortUUIDField)
- **Fields**:
  - `owner` (ForeignKey to `User`)
  - `make`, `model`, `year`
  - `registration_number` (optional, unique)
  - `vin` (optional)
  - `status` (e.g., "Waiting for Service", "Being Serviced")
  - `queue_position` (optional integer)
- **Purpose**: Represents each physical vehicle managed by the system.

### **ServiceRecord Model**
- **Fields**:
  - `user` (ForeignKey to `User` who owns the record)
  - `vehicle` (ForeignKey to `Vehicle`)
  - `serviceRecord_id` (UUIDField)
  - `service_type` (ForeignKey to `ServiceType`)
  - `issue_description` (TextField)
  - `status` (choices: "Pending", "In Progress", "Completed")
  - `payment_status` (choices: "Paid", "Unpaid")
  - `assigned_to` (ForeignKey to `User`, if employee is assigned)
  - `date_initiated` (auto_now_add=True)
  - `date_completed` (optional)
  - `cost_estimate` (DecimalField)
- **Purpose**: Tracks a specific service/repair session for a vehicle.

### **ServiceType Model**
- **Fields**:
  - `name` (CharField)
  - `description` (TextField, optional)
  - `serviceType_id` (UUIDField)
- **Purpose**: Categorizes the types of services (e.g., "Oil Change", "Brake Replacement").

### **Invoice Model**
- **Fields**:
  - `user` (ForeignKey to `User`)
  - `service_record` (OneToOneField to `ServiceRecord`, optional)
  - `invoice_id` (UUIDField)
  - `amount` (DecimalField)
  - `status` (choices: "Unpaid", "Paid", "Overdue")
  - `due_date` (DateTimeField)
  - `success_id` (UUIDField for payment success tracking)
- **Purpose**: Represents billing information for a service record or other costs.

### **Payment Model**
- **Fields**:
  - `invoice` (ForeignKey to `Invoice`)
  - `payment_date` (auto_now_add=True)
  - `amount` (DecimalField)
  - `status` (choices: "Successful", "Failed", "Pending")
  - `transaction_id` (unique CharField)
  - `payment_method` (choices: e.g., "paystack", "cheque", "cash")
  - `paystack_reference` (optional)
- **Purpose**: Logs actual payment transactions for an invoice.

### **Notification Model**
- **Fields**:
  - `user` (ForeignKey to `User`)
  - `message` (TextField)
  - `notification_type` (choices: "service_update", "payment_reminder", "general")
  - `created_at` (auto_now_add=True)
  - `read` (Boolean)
  - `notification_id` (UUIDField)
- **Purpose**: Delivers messages (e.g., upcoming payments, service completions) to users.

---

## 3. API Endpoints

### **User & Auth Endpoints**
**Base**: `/api/v1/user/`

- `POST /register/`
  - Register a new user (client or employee).
- `POST /login/`
  - Obtain JWT tokens (access/refresh).
- `GET or PUT /profile/`
  - Retrieve or update profile info for the authenticated user.
- `POST /change-password/`
  - Change user password with `old_password` and `new_password`.
- `POST /logout/`
  - Blacklist the refresh token.
- `POST /token/refresh/`
  - Obtain new access token using refresh token.
- `POST /token/verify/`
  - Verify if an access token is valid.

### **Vehicle Endpoints**
**Base**: `/client_portal/api/v1/vehicles/`

- `GET /`
  - List all vehicles. Possibly filtered by user or status.
- `POST /`
  - Create a new vehicle (auth required).
- `GET /<vehicle_id>/`
  - Retrieve a single vehicle’s details.
- `PUT/PATCH /<vehicle_id>/`
  - Update existing vehicle data.
- `DELETE /<vehicle_id>/`
  - Remove a vehicle record.

### **ServiceRecord Endpoints**
**Base**: `/client_portal/api/v1/service-records/`

- `GET /`
  - List service records, optional filters by status.
- `POST /`
  - Create a new service record with `vehicle_id`, `service_type`, etc.
- `GET /<record_id>/`
  - Retrieve a single service record.
- `PUT/PATCH /<record_id>/`
  - Update record details (e.g., cost_estimate, assigned_to).
- `DELETE /<record_id>/`
  - Delete a service record.

Additional:
- `POST /<record_id>/complete/`
  - Mark the record as completed.
- `POST /<record_id>/assign/`
  - Assign to an employee.

### **Invoice Endpoints**
**Base**: `/client_portal/api/v1/invoices/`

- `GET /`
  - List all invoices. Filter by user if needed.
- `POST /`
  - Create a new invoice.
- `GET /<invoice_id>/`
  - Retrieve invoice details.
- `PUT/PATCH /<invoice_id>/`
  - Update invoice amount, status, or due date.
- `DELETE /<invoice_id>/`
  - Remove an unpaid invoice if not needed.

### **Payment Endpoints**
**Base**: `/client_portal/api/v1/payments/`

- `GET /`
  - List payment records (transaction_id, amount, payment_method).
- `POST /`
  - Log or initialize a payment.
- `GET /<payment_id>/`
  - Details of a single payment.
- `PUT/PATCH /<payment_id>/`
  - Update payment status or method if needed.
- `DELETE /<payment_id>/`
  - Remove a payment record if invalid.

### **Notification Endpoints**
**Base**: `/client_portal/api/v1/notifications/`

- `GET /`
  - List notifications for the authenticated user.
- `PUT/PATCH /<notification_id>/`
  - Mark notification as read.

### **ServiceType Endpoints**
**Base**: `/client_portal/api/v1/service-types/`

- `GET /`
  - Retrieve all service types.
- `POST /`
  - Create a service type.
- `PUT/PATCH/DELETE /<type_id>/`
  - Modify or remove a service type.

### **Employee Endpoints**
**Base**: `/client_portal/api/v1/employees/`

- `GET /`
  - Lists employees with `user_type='employee'`, used for assignment.

---

## 4. Functionalities

1. **User Registration & Login**
   - Token-based sessions for either client or employee roles.
2. **Vehicle Lifecycle**
   - Creation, status updates, linking to service records.
3. **Service Management**
   - Employees can claim tasks, update statuses, and set costs.
4. **Invoices**
   - Automatic creation from service records, or manual issuance.
5. **Payments**
   - Gateway integration (Paystack, Flutterwave), with real-time verification.
6. **Notifications**
   - Inform users of pending invoices, completed services, or new tasks.
7. **Search & Filters**
   - Quick lookups in DataGrid, sorting by status or date.

---

## 5. Setup & Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/username/3a_motors_portal.git
   cd 3a_motors_portal

2. **Backend Setup**
   - **Create & Activate a Virtual Environment** 
   python -m venv venv
    source venv/bin/activate  # For Linux/Mac
    .\venv\Scripts\activate   # For Windows

- **Install Python Dependencies**  
pip install -r requirements.txt

- **Configure `settings.py`**  
  - Update `DATABASES` with PostgreSQL credentials.  
  - Add apps like `client_portal`, `user`, `vehicle` to `INSTALLED_APPS`.  
  - Set `ALLOWED_HOSTS` to include `127.0.0.1` or a custom domain.  
- **Migrate the Database**  

python manage.py makemigrations
python manage.py migrate


python manage.py createsuperuser

3. **Frontend Setup**
- **Install Node Dependencies**  


cd frontend
npm install

- *(Optional)* **Environment Variables**  
  Create a `.env` file in the `frontend/` folder with:

- **Start the Frontend**  


- The React app runs on **http://127.0.0.1:8000** by default.

---

## 6. Usage

- **Running the Backend**  

cd 3a_motors
python manage.py runserver

cd frontend
npm start

  Access the React UI on **http://127.0.0.1:3000**.

---

## 7. Contributing

- **Fork & Branch**  
  Create a feature branch, implement changes, then open a Pull Request.
- **Code Style**  
  - PEP8 for Django/Python code.  
  - ESLint/Prettier recommended for React code consistency.
- **Testing**  
  Provide tests for any new features or fixes.  
  Use Django’s `python manage.py test` for backend and `npm test` for frontend (if applicable).

---

## 8. License

This project is licensed under the **MIT License**. Feel free to adapt or distribute.  
Please reference **Nana Kwame Amagyei** as the original author if needed.