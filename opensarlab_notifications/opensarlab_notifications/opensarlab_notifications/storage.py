def notes():

    try:
        active_events = []
        
        # Get storage usage
        storage_usage = 100
        storage_total = 500
        storage_percent = 100.0 * storage_usage / storage_total

        event_name = 'Current Storage Usage'
        
        if storage_percent > 99:
            event_type = 'error'
            message = f"""
                <p>Current storage usage is at {storage_percent}% ({storage_usage} / {storage_total} GB).</p>
                <p>Some files can not be automatically updated due to lack of storage volume. Please delete any unused files.</p> 
            """

        elif storage_percent > 90:
            event_type = 'warning'
            event_position = 'toast-bottom-right'
            message = f"<p>Current storage usage is at {storage_percent}% ({storage_usage} / {storage_total} GB)</p>"

        else:
            event_type = 'success'
            event_position = 'toast-bottom-right'
            message = f"<p>Current storage usage is at {storage_percent}% ({storage_usage} / {storage_total} GB)</p>"

        active_events.append(
            {
                "title": event_name,
                "message": message,
                "type": event_type,
                "position": event_position
            }
        )

        return active_events

    except Exception as e:
        print(e)
        raise Exception(f"{e}")

def main():
    return notes()