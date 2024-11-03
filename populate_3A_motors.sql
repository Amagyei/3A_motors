-- Insert new users if they don’t already exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM user_user WHERE username = 'johndoe') THEN
        INSERT INTO user_user (
            uid, full_name, username, email, phone, gender, password, is_active,
            is_superuser, is_staff, first_name, last_name, date_joined
        ) VALUES 
        ('abc12345', 'John Doe', 'johndoe', 'john@example.com', '1234567890', '1',
         'password123', TRUE, FALSE, FALSE, 'John', 'Doe', NOW());
    END IF;

    IF NOT EXISTS (SELECT 1 FROM user_user WHERE username = 'janesmith') THEN
        INSERT INTO user_user (
            uid, full_name, username, email, phone, gender, password, is_active,
            is_superuser, is_staff, first_name, last_name, date_joined
        ) VALUES 
        ('def67890', 'Jane Smith', 'janesmith', 'jane@example.com', '0987654321', '2',
         'password123', TRUE, FALSE, FALSE, 'Jane', 'Smith', NOW());
    END IF;
END $$;

-- Insert data into user_profile table using `uid`
INSERT INTO user_profile (
    user_id, full_name, phone, gender, residential_address, mailing_address,
    verified, wallet, date
) VALUES 
((SELECT uid FROM user_user WHERE username = 'johndoe'), 'John Doe', '1234567890', '1', '123 Elm Street', '456 Oak Avenue', TRUE, 500.00, NOW()),
((SELECT uid FROM user_user WHERE username = 'janesmith'), 'Jane Smith', '0987654321', '2', '789 Pine Road', '101 Maple Avenue', TRUE, 300.00, NOW())
ON CONFLICT (user_id) DO NOTHING;

-- Insert data into vehicle_vehicle table using `uid`
INSERT INTO vehicle_vehicle (
    user_id, make, model, year, registration_number, color, vin, status
) VALUES 
((SELECT uid FROM user_user WHERE username = 'johndoe'), 'Toyota', 'Camry', 2020, 'ABC123', 'Blue', 'VIN1234567890123456', 'Active'),
((SELECT uid FROM user_user WHERE username = 'janesmith'), 'Honda', 'Civic', 2019, 'XYZ789', 'Red', 'VIN6543210987654321', 'In Service')
ON CONFLICT (user_id) DO NOTHING;

-- Insert data into client_portal_servicetype table
INSERT INTO client_portal_servicetype (name, description) VALUES 
('Oil Change', 'Standard oil change service'),
('Tire Replacement', 'Replacement of all four tires')
ON CONFLICT DO NOTHING;

-- Insert data into client_portal_servicerecord table using `uid`
INSERT INTO client_portal_servicerecord (
    user_id, vehicle_id, service_type_id, issue_description, status, date_initiated, cost_estimate
) VALUES 
((SELECT uid FROM user_user WHERE username = 'johndoe'), 
 (SELECT uid FROM vehicle_vehicle WHERE registration_number = 'ABC123'), 
 (SELECT id FROM client_portal_servicetype WHERE name = 'Oil Change'), 
 'Oil change needed', 'Pending', NOW(), 100.00),
((SELECT uid FROM user_user WHERE username = 'janesmith'), 
 (SELECT uid FROM vehicle_vehicle WHERE registration_number = 'XYZ789'), 
 (SELECT id FROM client_portal_servicetype WHERE name = 'Tire Replacement'), 
 'Worn out tires', 'In Progress', NOW(), 400.00)
ON CONFLICT DO NOTHING;

-- Insert data into client_portal_invoice table using `uid`
INSERT INTO client_portal_invoice (
    user_id, service_record_id, amount, status, due_date
) VALUES 
((SELECT uid FROM user_user WHERE username = 'johndoe'), 
 (SELECT uid FROM client_portal_servicerecord WHERE issue_description = 'Oil change needed'), 
 100.00, 'Unpaid', NOW() + INTERVAL '30 days'),
((SELECT uid FROM user_user WHERE username = 'janesmith'), 
 (SELECT uid FROM client_portal_servicerecord WHERE issue_description = 'Worn out tires'), 
 400.00, 'Unpaid', NOW() + INTERVAL '15 days')
ON CONFLICT DO NOTHING;

-- Insert data into client_portal_payment table using `uid`
INSERT INTO client_portal_payment (
    invoice_id, payment_date, amount, status, transaction_id
) VALUES 
((SELECT id FROM client_portal_invoice WHERE user_id = (SELECT uid FROM user_user WHERE username = 'johndoe') AND amount = 100.00), NOW(), 100.00, 'Pending', 'TX123ABC'),
((SELECT id FROM client_portal_invoice WHERE user_id = (SELECT uid FROM user_user WHERE username = 'janesmith') AND amount = 400.00), NOW(), 400.00, 'Successful', 'TX456DEF')
ON CONFLICT DO NOTHING;

-- Insert data into client_portal_notification table using `uid`
INSERT INTO client_portal_notification (
    user_id, message, created_at, read
) VALUES 
((SELECT uid FROM user_user WHERE username = 'johndoe'), 'Your service request is pending.', NOW(), FALSE),
((SELECT uid FROM user_user WHERE username = 'janesmith'), 'Your invoice is due soon.', NOW(), FALSE)
ON CONFLICT DO NOTHING;
