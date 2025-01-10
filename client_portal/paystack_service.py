import requests
from django.conf import settings


def initialize_paystack_payment(amount, email, reference, callback_url):
    """
    Function to initialize a Paystack payment.
    :param amount: The amount to be charged (in the smallest currency unit, e.g., Kobo).
    :param email: The customer's email address.
    :param reference: A unique transaction reference.
    :param callback_url: The URL Paystack redirects to after payment.
    :return: Response from Paystack API.
    """
    headers = {
        "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "amount": int(amount * 100),  # Convert amount to Kobo (e.g., 100 NGN -> 10000 Kobo)
        "email": email,
        "reference": reference,
        "callback_url": callback_url
    }
    try:
        response = requests.post(
            "https://api.paystack.co/transaction/initialize",
            json=payload,
            headers=headers
        )
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"status": False, "message": str(e)}
    
def verify_payment(reference):
    """Verifies the status of a payment with Paystack."""
    headers = {
        "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}",
    }
    response = requests.get(f"https://api.paystack.co/transaction/verify/{reference}", headers=headers)
    response_data = response.json()
    if response.status_code == 200:
        return response_data["data"]
    else:
        raise Exception(response_data.get("message", "Failed to verify payment"))