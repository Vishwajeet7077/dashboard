from django.db import models

class Data(models.Model):
    end_year = models.CharField(max_length=255, blank=True, null=True)
    intensity = models.IntegerField(blank=True, null=True)
    sector = models.CharField(max_length=255, blank=True, null=True)
    topic = models.CharField(max_length=255, blank=True, null=True)
    insight = models.TextField(blank=True, null=True)
    url = models.TextField(blank=True, null=True)
    region = models.CharField(max_length=255, blank=True, null=True)
    start_year = models.CharField(max_length=255, blank=True, null=True)
    impact = models.TextField(blank=True, null=True)
    added = models.CharField(max_length=255, blank=True, null=True)
    published = models.CharField(max_length=255, blank=True, null=True)
    country = models.CharField(max_length=255, blank=True, null=True)
    relevance = models.IntegerField(blank=True, null=True)
    pestle = models.CharField(max_length=255, blank=True, null=True)
    source = models.CharField(max_length=255, blank=True, null=True)
    title = models.TextField(blank=True, null=True)
    likelihood = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'data'
