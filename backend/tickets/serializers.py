from rest_framework import serializers
from .models import SupportTicket 

class SupportTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportTicket
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at', 'summary', 'created_by']
