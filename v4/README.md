# Template mamba enviroment

Create an extension for JupyterLab 4

Use `copier` to create an extension. This requires a certain mamba environment.

```
mamba create -n opensarlab-extensions-template --override-channels --strict-channel-priority -c conda-forge -c nodefaults jupyterlab=4 nodejs=18 git copier=8 jinja2-time

mamba activate opensarlab-extensions-template
```


# Build Individual Extensions

Each extension should be built in it's own mamba enironment to makes sure there is no false dependency conflicts, etc.

```
NAME_OF_EXTENSION=opensarlab-extension-name-of-extension

mamba deactivate
mamba create -n $NAME_OF_EXTENSION --override-channels --strict-channel-priority -c conda-forge jupyterlab=4 nodejs=18
mamba activate $NAME_OF_EXTENSION
```

If there is a `dev-build.sh` file included, use that to build. Update the dependencies at the top of the file. Run by `bash dev-build.sh`.
