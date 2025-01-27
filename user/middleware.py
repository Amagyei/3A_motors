# middleware.py
from django.http import JsonResponse

class CustomExceptionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if response.status_code == 400:
            return JsonResponse({'error': 'Bad Request', 'details': response.data}, status=400)
        return response