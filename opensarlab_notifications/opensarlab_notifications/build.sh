jlpm  # Install npm package dependencies

# Clone the repo to your local environment
# Change directory to the opensarlab_notifications directory
# Install package in development mode
pip install -e .

# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite

# Server extension must be manually installed in develop mode
#jupyter server extension list
jupyter server extension enable opensarlab_notifications

# Compile the TypeScript sources to Javascript
# Rebuild extension Typescript source after making changes
jlpm build

# Run Jupyter Lab
OPENSARLAB_PROFILE_NAME='SAR 1' \
OPENSCIENCELAB_LAB_SHORT_NAME='opensarlab' \
OPENSCIENCELAB_PORTAL_DOMAIN='https://opensciencelab.asf.alaska.edu' \
jupyter lab