# v4

All opensarlab extensions have been updated for JupyterLab 4. They have also been combined into one superextension for ease of installation and updating. Ordering and visibility can be controlled via the `overrrides.json` file. This file is often applied during the OSL image build. Extensions included:

### Control Button

OpenScienceLab has a unique URI structure. To make it easier for OSL users to find the server stop page, a button is placed in the top right corner of JupyterLab.

### Documentation Link

A hyperlink to opensarlab-docs.asf.alaska.edu is placed in the top right corner of JupyterLab. 

### Profile Label

The name of the server profile selected by user is placed in the top right corner of JupyterLab. This is intended to make debugging of problems easier.

### Notifications

A toast is shown on page load from two sources:

1. Google Calendar notifications.

   The Google Calendar notifications are handled via the OpenScienceLab `/user/notifications/{lab_shortname}?profile={profiile_name}` endpoint.

1. Percent storage usage.

   The percent storage used of the home directory is shown. If the percentage is greater than 99%, the toast banner will be red and across the whole screen. This is only on page load and not in real-time.

### GIF Capture

A button that links to `gifcap.dev`. Users can screen capture and then save as a GIF. The recording is purely client-side in the browser.

### Disk Space

Display percent of remaining disk space. The values update every 5 seconds. Depending on settings, the display performs differently based on percent usage:

0  - 70%: Text on transparent background
70 - 85%: Text on yellow background
85 - 90%: Text on red background
91 - 99%: Blinking text on red background

Settings can be changed in the JupyterLab Advance Settings under _opensarlab-frontend_.
