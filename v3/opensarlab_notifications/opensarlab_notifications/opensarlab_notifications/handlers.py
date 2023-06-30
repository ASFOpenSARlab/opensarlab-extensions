import json
import os

from jupyter_server.base.handlers import APIHandler
from jupyter_server.utils import url_path_join
import tornado


from .notifications import calendar
from .notifications import storage

class CalendarRouteHandler(APIHandler):
    # The following decorator should be present on all verb methods (head, get, post,
    # patch, put, delete, options) to ensure only authorized user can request the
    # Jupyter server
    @tornado.web.authenticated
    def get(self):

        profile_name = os.environ.get('OPENSARLAB_PROFILE_NAME', '')
        lab_short_name = os.environ.get('OPENSCIENCELAB_LAB_SHORT_NAME', '')
        portal_domain = os.environ.get('OPENSCIENCELAB_PORTAL_DOMAIN', '')

        print(f"{profile_name=}")
        print(f"{lab_short_name=}")
        print(f"{portal_domain=}")

        events = calendar(profile_name, lab_short_name, portal_domain)

        self.finish(json.dumps({"data": events}))

class StorageRouteHandler(APIHandler):
    # The following decorator should be present on all verb methods (head, get, post,
    # patch, put, delete, options) to ensure only authorized user can request the
    # Jupyter server
    @tornado.web.authenticated
    def get(self):
        events = storage()

        self.finish(json.dumps({"data": events}))

def setup_handlers(web_app, url_path=None):
    host_pattern = ".*$"
    base_url = web_app.settings["base_url"]

    print(f"{base_url=}")

    calendar_route_pattern = url_path_join(base_url, "opensarlab-notifications", "calendar")
    storage_route_pattern = url_path_join(base_url, "opensarlab-notifications", "storage")
    
    handlers = [
        (calendar_route_pattern, CalendarRouteHandler),
        (storage_route_pattern, StorageRouteHandler)
    ]
    web_app.add_handlers(host_pattern, handlers)
