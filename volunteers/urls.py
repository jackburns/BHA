from django.conf.urls import include, url
from volunteers import views


urlpatterns = [
    url(r'^volunteers', views.get_volunteer_list)
]
