from django.urls import path
from .views import admin_stats ,admin_login, dashboard_stats, city_wise_stats

urlpatterns = [
    path("stats/", admin_stats),
    path('login/', admin_login),
    path('stats/', dashboard_stats),
    path('cities/', city_wise_stats),
]



