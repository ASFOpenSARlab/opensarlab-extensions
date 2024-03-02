## Contributing

### Development install

#### Prereqs

Install mamba preferably through mambaforge(https://mamba.readthedocs.io/en/latest/installation.html)

Install node through version manager (https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source ~/.bashrc
nvm --version
nvm ls-remote
nvm install node
``` 

Create new mamba environment

```bash
mamba create -n jupyter-extension -c conda-forge python jupyter-packaging jupyterlab copier jinja2-time
mamba activate jupyter-extension
```

#### Create Project (if needed)

```bash 
mkdir myextension
cd myextension

copier https://github.com/jupyterlab/extension-template .
```

Answer the `copier` questions as

1. What is your extension kind? **server**


Add specfic dependencies

```bash
npm i --save toastr
npm i --save-dev @types/toastr
```

#### Build extension

```bash
jlpm  # Install npm package dependencies

# Clone the repo to your local environment
# Change directory to the opensarlab_notifications directory
# Install package in development mode
pip install -e .

# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite

# Server extension must be manually installed in develop mode
jupyter server extension list
jupyter server extension enable {name_of_extension}

# Compile the TypeScript sources to Javascript
# Rebuild extension Typescript source after making changes
jlpm build  
```

#### Rebuild extension 

Previous command allows for rebuild to be reflected in JupyterLab upon webpage refresh

```bash
jlpm build
```

#### Start JupyterLab to experiment

```bash
jupyter lab
```
