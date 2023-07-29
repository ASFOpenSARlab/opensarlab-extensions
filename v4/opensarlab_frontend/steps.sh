
    set -ex

    printf "\n\n"
    # Install npm package dependencies
    jlpm
    
    
    jlpm clean:all


    printf "\n\n"
    # Add javascript libs
    if [ 3 != 0 ]; then
        jlpm add @jupyterlab/apputils @jupyterlab/application-extension toastr
    else
        echo "No jlpm dependencies to add"
    fi

    printf "\n\n"
    # Add javascript dev libs
    if [ 1 != 0 ]; then
        jlpm add --dev @types/toastr
    else
        echo "No jlpm dependencies to add"
    fi

    printf "\n\n"
    jlpm build


    printf "\n\n"
    # Link your development version of the extension with JupyterLab
    jupyter labextension develop . --overwrite


    printf "\n\n"
    # Clone the repo to your local environment
    # Change directory to the proper directory
    # Install package in development mode
    # (!! This breaks on build !!)
    ##python -m pip install -v -e .


    printf "\n\n"
    # Server extension must be manually installed in develop mode
    if [ true == true ]; 
    then
        jupyter server extension list
        jupyter server extension enable "opensarlab_frontend"

    else
        echo "No server extensions..."
    fi


    printf "\n\n"
    jupyter labextension enable "opensarlab_frontend"


    printf "\n\n"
    jlpm run build


    printf "\n\n"
    ( OPENSARLAB_PROFILE_NAME='SAR 1' OPENSCIENCELAB_LAB_SHORT_NAME='opensarlab-test' OPENSCIENCELAB_PORTAL_DOMAIN='https://opensciencelab-test.asf.alaska.edu' jupyter lab -y )

