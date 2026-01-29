from datetime import date
from django.db.models import Sum, Count
from rest_framework.decorators import api_view
from rest_framework.response import Response
from bookings.models import Booking

from .models import AdminUser, TicketAnalytics





@api_view(["GET"])
def admin_stats(request):
    today = date.today()

    today_bookings = Booking.objects.filter(visit_date=today)

    today_tickets = today_bookings.count()

    total_visitors = today_bookings.aggregate(
        total=Sum("quantity")
    )["total"] or 0

    total_revenue = today_bookings.aggregate(
        total=Sum("amount")
    )["total"] or 0

    top_city_data = (
        Booking.objects
        .values("city")
        .annotate(count=Count("id"))
        .order_by("-count")
        .first()
    )

    top_city = top_city_data["city"] if top_city_data else "N/A"

    return Response({
        "today_tickets": today_tickets,
        "total_visitors": total_visitors,
        "total_revenue": total_revenue,
        "top_city": top_city,
    })



@api_view(['POST'])
def admin_login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    try:
        admin = AdminUser.objects.get(username=username, password=password)
        return Response({"success": True})
    except AdminUser.DoesNotExist:
        return Response({"success": False, "message": "Invalid credentials"}, status=401)




@api_view(['GET'])
def dashboard_stats(request):
    today = date.today()

    today_tickets = TicketAnalytics.objects.filter(
        created_at__date=today
    ).count()

    total_visitors = TicketAnalytics.objects.count()

    revenue = TicketAnalytics.objects.aggregate(
        total=Sum('amount')
    )['total'] or 0

    top_city = (
        TicketAnalytics.objects
        .values('city')
        .annotate(count=Count('city'))
        .order_by('-count')
        .first()
    )

    return Response({
        "todayTickets": today_tickets,
        "totalVisitors": total_visitors,
        "revenue": revenue,
        "topCity": top_city['city'] if top_city else "N/A"
    })



@api_view(['GET'])
def city_wise_stats(request):
    data = (
        TicketAnalytics.objects
        .values('city')
        .annotate(tickets=Count('city'))
        .order_by('-tickets')
    )
    return Response(data)
