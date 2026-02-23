from django.db import models
from django.contrib.auth.models import User

class SupportTicket(models.Model):

    STATUS_CHOICES = [
        ("OPEN", "Open"),
        ("IN_PROGRESS", "In Progress"),
        ("RESOLVED" , "Resolved"),
        ("CLOSED", "Closed")
    ]
    
    PRIRORITY_CHOICES = [
        ("LOW", "Low"),
        ("MEDIUM", "Medium"),
        ("HIGH", "High"),
        ("CRITICAL", "Critical")
    ]

    CATEGORY_CHOICES = [
        ("BILLING", "Billing"),
        ("TECHNICAL", "Technical"),
        ("ACCOUNT", "Account"),
        ("GENERAL", "General")
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()

    status = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES, 
        default="OPEN"
    )

    priority = models.CharField(
        max_length=20, 
        choices=PRIRORITY_CHOICES, 
        default="MEDIUM"
    )  

    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        default="GENERAL"
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="tickets_created"
    )

    assigned_to = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="tickets_assigned"
    )

    summary = models.CharField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.id} - {self.title}"