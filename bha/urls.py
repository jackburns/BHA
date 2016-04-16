"""bha URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from api import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'api/volunteers', views.VolunteerViewSet, 'Volunteer')
router.register(r'api/assignments', views.AssignmentViewSet, 'Assignment')

urlpatterns = [
	url(r'^admin/', admin.site.urls),
	url(r'^', include(router.urls)),
	url(r'^api/auth/', include('rest_auth.urls')),
    url(r'^', include('django.contrib.auth.urls')),
    url(r'^api/notify/', views.NotificationView.as_view(), name='Notify'),
    url(r'^reset-password/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
    'django.contrib.auth.views.password_reset_confirm',
    name='password_reset_confirm'),
]
