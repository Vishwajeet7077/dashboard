from django.db.models import Avg
from rest_framework import viewsets
from .models import Data
from .serializers import dashboardSerializer
from django.http import JsonResponse
from rest_framework.response import Response

class DashboardViewSet(viewsets.ModelViewSet):
    queryset = Data.objects.all()
    serializer_class = dashboardSerializer

    def get_average_intensity(self, request):
        avg_intensity = Data.objects.aggregate(avg_intensity=Avg('intensity'))['avg_intensity']
        return Response({'average_intensity': avg_intensity})

    def get_sector_average_relevance(self, request, sector):
        avg_relevance = Data.objects.filter(sector=sector).aggregate(avg_relevance=Avg('relevance'))['avg_relevance']
        return Response({'sector': sector, 'average_relevance': avg_relevance})
    
    def list(self, request, *args, **kwargs):
        serializer = self.serializer_class(self.queryset, many=True)
        return JsonResponse(serializer.data, safe=False)
