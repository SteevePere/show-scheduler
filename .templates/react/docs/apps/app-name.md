# app-name Documentation

## Setup

Before using this application you'll need to configure the environment variables.

Duplicate the file `apps/scheduler-app-name/.dist.env` to `apps/scheduler-app-name/.env` and configure the variables according to the included documentation.

## Usage

You can run this application in development mode using (*on the root folder*):

```bash
yarn watch:app-name
```

The application will start using the port `4200`, you can change the port inside the `package.json` of the application.

## Docker

This application add a new container to the docker compose configuration. By default the port `4200` is configured.

You can update the configuration as follows to change the port to `3000`:

```yaml
services:
  scheduler-app-name:
    ports:
      - '3000:80'
```

The environment variables used inside docker compose are located in the environment file located at `apps/scheduler-app-name/.env.docker`.

> You should only add new variables if you're not sure about what you're doing.

## Kubernetes

This application add a Kubernetes deployment for trunk and pull requests. The configurations files are located at `.k8s/overlays/(trunk|previews)/apps/app-name.yaml`.

The files are an override of the base application deployment configuration located at `.k8s/base/apps/app-name.yaml`.

This Kubernetes manifest will deploy an Helm chart named [Onechart](https://github.com/gimlet-io/onechart). It permit a simplified application deployment with Helm without writing helm file by hand.

### Environment variables

In case you want to update the environment variables used in each environment, you can append the deployment configuration as follows:

```yaml
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: app-name
spec:
  values:
    vars:
      ENVIRONMENT_VARIABLE: "value"
      OTHER_ENVIRONMENT_VARIABLE: "false"
```

> You should only add new variables if you're not sure about what you're doing.
>
> But if needed, you'll find more information about the deployed chart at [Onechart Documentation](https://gimlet.io/onechart/environment-variables/).
