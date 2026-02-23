from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import ClassifySupportTicketView, SupportTicketViewSet

router = DefaultRouter()
router.register(r'tickets', SupportTicketViewSet, basename='supportticket')

urlpatterns = [
    path('tickets/classify/', ClassifySupportTicketView.as_view(), name='ticket-classify'),
]

urlpatterns += router.urls