from django.db import models

class Booking(models.Model):
    booking_id = models.CharField(max_length=100, unique=True)
    museum = models.CharField(max_length=200)
    visit_date = models.DateField()
    slot = models.CharField(max_length=100)
    amount = models.IntegerField()
    payment_id = models.CharField(max_length=200)
    status = models.CharField(max_length=20, default="CONFIRMED")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.booking_id
