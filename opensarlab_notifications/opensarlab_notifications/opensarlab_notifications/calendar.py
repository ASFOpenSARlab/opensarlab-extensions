import requests

def notes(profile_name, lab_short_name, portal_domain):

    try:
        active_events = []
        
        # Get calendar notifications
        resp = requests.get(f"{portal_domain}/user/notifications/{lab_short_name}?profile={profile_name}")
        print(resp)
        resp = resp.json()
        print(resp)

        #active_events.append(
        #    {
        #        "title": event.name,
        #        "message": message.strip(),
        #        "type": meta.get('type', 'success').strip(),
        #        "position": meta.get('position', 'toast-bottom-right').strip()
        #    }
        #)

        return active_events

    except Exception as e:
        print(e)
        raise Exception(f"{e}")

def main(profile_name: str='default', lab_short_name: str='default', portal_domain: str="https://example.com"):
    return notes(profile_name, lab_short_name, portal_domain)