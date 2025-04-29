# Making a new release of opensarlab_frontend

The extension can be published to `PyPI` and `npm` manually or by calling the `release-frontend` GitHub action to release on `PyPI`.

## Manual release

### Python package

This extension can be distributed as Python packages. All of the Python
packaging instructions are in the `pyproject.toml` file to wrap your extension in a
Python package. Before generating a package, you first need to install some tools:

```bash
pip install build twine hatch
```

Bump the version using `hatch`. By default this will create a tag.
See the docs on [hatch-nodejs-version](https://github.com/agoose77/hatch-nodejs-version#semver) for details.

```bash
hatch version <new-version>
```

Make sure to clean up all the development files before building the package:

```bash
jlpm clean:all
```

You could also clean up the local git repository:

```bash
git clean -dfX
```

To create a Python source package (`.tar.gz`) and the binary package (`.whl`) in the `dist/` directory, do:

```bash
python -m build
```

> `python setup.py sdist bdist_wheel` is deprecated and will not work for this package.

Then to upload the package to PyPI, do:

```bash
twine upload dist/*
```

### NPM package

To publish the frontend part of the extension as a NPM package, do:

```bash
npm login
npm publish --access public
```

## Automated releases with GitHub Actions

### Setting up your project to deploy using PyPI Trusted Publisher

- Set up PyPI
  - Create PyPI project
  - In Manage mode on PyPI project, click `Publishing` and add new GitHub Trusted Publisher
    - Set Workflow name to `release-frontend.yml`
    - Set Environment name to the environment your action will be using (Usually prod or test) 
  - Create access token for your User
    - In Account Settings, click on `Add API token`
    - Set its scope to your project only
    - Save your PyPI token for the next step

- Set up GitHub Environment
  - Create a [GitHub Environment](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-deployments/managing-environments-for-deployment)
    - Go to your repository settings
    - Under `Code and automation` select environment
    - Click `New Environment` and provide a name
  - In your GitHub Environment
    - Add token to the [Github Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) in the repository:
      - `PYPI_TOKEN` (Your PyPI token created in when setting up PyPI)
    - Add to the [Github Variables](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/store-information-in-variables) in the repository:
      - `REPOSITORY_URL` (The repository you will be uploading to)

### Deploying Using GitHub Action

- Go to GitHub Actions panel
- Select `Build and Publish Frontend To PyPI` action manually and run using workflow_dispatch
  - Set `environment` to the name the environment with your secrets and variables
  - Set `version` to the new version of your package

## Publishing to `conda-forge`

If the package is not on conda forge yet, check the documentation to learn how to add it: https://conda-forge.org/docs/maintainer/adding_pkgs.html

Otherwise a bot should pick up the new version publish to PyPI, and open a new PR on the feedstock repository automatically.
