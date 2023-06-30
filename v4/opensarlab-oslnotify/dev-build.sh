# THIS function doesn't need to be updated/customized but ran as is.
build_ext () {

    EXTENSION_NAME=$1

    jlpm  # Install npm package dependencies

    # Clone the repo to your local environment
    # Change directory to the proper directory
    # Install package in development mode
    printf "\n\n***** pip install -e . \n\n"
    pip install -e .

    # Link your development version of the extension with JupyterLab
    printf "\n\n***** jupyter labextension develop . --overwrite \n\n"
    jupyter labextension develop . --overwrite

    # Server extension must be manually installed in develop mode
    #jupyter server extension list
    printf "\n\n***** jupyter server extension enable $EXTENSION_NAME \n\n"
    jupyter server extension enable "$EXTENSION_NAME"

    printf "\n\n***** jupyter labextension enable \n\n"
    jupyter labextension enable "$EXTENSION_NAME"

    # Compile the TypeScript sources to Javascript
    # Rebuild extension Typescript source after making changes
    printf "\n\n***** jlpm run build \n\n"
    jlpm run build

}

## THIS function needs to be customized to the proper enviroment vars, etc.
run_ext () {

    # Run Jupyter Lab
    printf "\n\n***** jupyter lab \n\n"
    OPENSARLAB_PROFILE_NAME='SAR 1' \
    OPENSCIENCELAB_LAB_SHORT_NAME='opensarlab-test' \
    OPENSCIENCELAB_PORTAL_DOMAIN='https://opensciencelab-test.asf.alaska.edu' \
    jupyter lab
}

## THIS var needs to be updated to the extension name
EXTENSION_NAME="opensarlab-oslnotify"
build_ext $EXTENSION_NAME

run_ext
