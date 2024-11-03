from django import forms
from .models import ServiceRecord, Payment

class ServiceRecordForm(forms.ModelForm):
    class Meta:
        model = ServiceRecord
        fields = ['issue_description', 'status', 'cost_estimate']
        widgets = {
            'issue_description': forms.Textarea(attrs={'rows': 3}),
            'status': forms.Select(),
        }

class PaymentForm(forms.Form):
    amount = forms.DecimalField(label="Amount", max_digits=10, decimal_places=2)
    gateway = forms.ChoiceField(
        choices=[("flutterwave", "Flutterwave"), ("paystack", "Paystack")],
        label="Payment Gateway",
        required=True
    )