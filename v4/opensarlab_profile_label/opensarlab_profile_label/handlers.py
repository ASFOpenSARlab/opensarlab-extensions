import os
import json

from jupyter_server.base.handlers import APIHandler
from jupyter_server.utils import url_path_join
import tornado

class RouteHandler(APIHandler):
    # The following decorator should be present on all verb methods (head, get, post,
    # patch, put, delete, options) to ensure only authorized user can request the
    # Jupyter server
    @tornado.web.authenticated
    def get(self):
        profile_name = os.environ.get('OPENSARLAB_PROFILE_NAME', 'No environment variable "OPENSARLAB_PROFILE_NAME" found!')
        self.finish(json.dumps({"data": profile_name}))


def setup_handlers(web_app):
    host_pattern = ".*$"

    base_url = web_app.settings["base_url"]
    route_pattern = url_path_join(base_url, "opensarlab-profile-label", "opensarlab-profile-label")
    handlers = [(route_pattern, RouteHandler)]
    web_app.add_handlers(host_pattern, handlers)
