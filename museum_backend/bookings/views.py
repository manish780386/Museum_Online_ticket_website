from datetime import datetime
import razorpay
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
from .models import Booking

client = razorpay.Client(auth=(
    settings.RAZORPAY_KEY_ID,
    settings.RAZORPAY_KEY_SECRET
))


@api_view(["POST"])
def create_order(request):
    try:
        amount = int(float(request.data.get("amount", 0)))

        if amount <= 0:
            return Response({"error": "Invalid amount"}, status=400)

        # Razorpay expects amount in paise
        order = client.order.create({
            "amount": amount * 100,
            "currency": "INR",
            "payment_capture": 1
        })

        return Response(order)

    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["POST"])
def verify_payment(request):
    data = request.data

    # ✅ REQUIRED FIELDS CHECK (MOST IMPORTANT)
    required = [
        "razorpay_order_id",
        "razorpay_payment_id",
        "razorpay_signature",
        "booking_id",
        "museum",
        "date",
        "slot",
        "amount",
    ]

    for field in required:
        if not data.get(field):
            return Response(
                {"error": f"{field} missing"},
                status=400
            )

    # ✅ SIGNATURE VERIFICATION (SAFE)
    try:
        client.utility.verify_payment_signature({
            "razorpay_order_id": data["razorpay_order_id"],
            "razorpay_payment_id": data["razorpay_payment_id"],
            "razorpay_signature": data["razorpay_signature"],
        })
    except razorpay.errors.SignatureVerificationError:
        return Response(
            {"error": "Payment signature verification failed"},
            status=400
        )

    # ✅ SAVE BOOKING
    booking = Booking.objects.create(
        booking_id=data["booking_id"],
        museum=data["museum"],
        visit_date=datetime.strptime(data["date"], "%Y-%m-%d").date(),
        slot=data["slot"],
        amount=int(data["amount"]),
        payment_id=data["razorpay_payment_id"],
    )

    return Response({
        "success": True,
        "booking_id": booking.booking_id
    })
