from django.db import models

class AdminUser(models.Model):
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=100)  # plain for now (demo)

    def __str__(self):
        return self.username
    


class TicketAnalytics(models.Model):
    booking_id = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    museum = models.CharField(max_length=100)
    amount = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.booking_id

