#! /bin/bash

set -ve

## 1. 
## THIS var needs to be updated to the extension name
EXTENSION_NAME="opensarlab_controlbtn"

## 2.
JLPM_DEPENDS=(
    ## THIS array holds extra jlpm node packages to be install
    @jupyterlab/apputils
    jupyterlab-topbar
)

## 3.
JLPM_DEV_DEPENDS=(
    ## THIS array holds extra dev jlpm node packages to be install
)

## 4.
ENV_VARS=(
    ## THIS array holds environment vars injected into JupyterLab at startup
    OPENSARLAB_PROFILE_NAME='SAR 1'
    OPENSCIENCELAB_LAB_SHORT_NAME='opensarlab-test'
    OPENSCIENCELAB_PORTAL_DOMAIN='https://opensciencelab-test.asf.alaska.edu'
)

## 5.
MAMBA_DEPENDS=(
    ## THIS array holds extra mamba packages to be installed in the environment. This should be used sparingly
)

## 6.
## ANY possible additional python packages will need to be added to the "project.dependencies" section of pyproject.toml



##############################################
### Don't change any of the following
#########

# Create environment
if { mamba env list | "opensarlab-extension-$EXTENSION_NAME"; } >/dev/null 2>&1; then
    echo "******** Creating environment opensarlab-extension-$EXTENSION_NAME"
    exit
    mamba create -n opensarlab-extension-$EXTENSION_NAME --override-channels --strict-channel-priority -c conda-forge jupyterlab=4 nodejs=18
fi

# Run all mamba rleated commands with `mamba run` using alias
mrun () {
    mamba run -n opensarlab-extension-$EXTENSION_NAME "$@"
}

echo "Current mamba envs: $(mrun mamba env list)"

# Add javascript libs
if [ ${#JLPM_DEPENDS[@]} != 0 ]; then
    echo "********* jlpm add ${JLPM_DEPENDS[@]}"
    mrun jlpm add ${JLPM_DEPENDS[@]}
else
    echo "No jlpm dependencies to add"
fi

if [ ${#JLPM_DEV_DEPENDS[@]} != 0 ]; then
    echo "********* jlpm add --dev ${JLPM_DEPENDS[@]}"
    mrun jlpm add --dev ${JLPM_DEV_DEPENDS[@]}
else
    echo "No jlpm dev dependencies to add"
fi

###### DON'T UPDATE ANY OF THE FOLLOWING
##
###### Build extension and run 
##

mrun jlpm  # Install npm package dependencies

# Clone the repo to your local environment
# Change directory to the proper directory
# Install package in development mode
printf "\n\n***** pip install -e . \n\n"
mrun pip install -e .
exit

# Link your development version of the extension with JupyterLab
printf "\n\n***** jupyter labextension develop . --overwrite \n\n"
mrun jupyter labextension develop . --overwrite

# Server extension must be manually installed in develop mode
#jupyter server extension list
printf "\n\n***** jupyter server extension enable $EXTENSION_NAME \n\n"
mrun jupyter server extension enable "$EXTENSION_NAME"

printf "\n\n***** jupyter labextension enable \n\n"
mrun jupyter labextension enable "$EXTENSION_NAME"

# Compile the TypeScript sources to Javascript
# Rebuild extension Typescript source after making changes
printf "\n\n***** jlpm run build \n\n"
mrun jlpm run build

############################
###### Run extension
printf "\n\n***** jupyter lab \n\n"
mrun ${ENV_VARS[@]} jupyter lab
