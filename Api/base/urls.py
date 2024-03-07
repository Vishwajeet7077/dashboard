from django.urls import path, include
from rest_framework import routers
from .views import DashboardViewSet

router = routers.DefaultRouter()
router.register(r'dashboard', DashboardViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/average-intensity/', DashboardViewSet.as_view({'get': 'get_average_intensity'}), name='average_intensity'),
    path('api/sector-average-relevance/<str:sector>/', DashboardViewSet.as_view({'get': 'get_sector_average_relevance'}), name='sector_average_relevance'),
]