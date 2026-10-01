# Aster Portal

This app provides the Aster Portal for accessing your account settings and applications

## Development

To build a development docker image (optional):

```sh
docker build -f Dockerfile -t ghcr.io/aster-id/aster-portal:dev .
```

To run that image:

```sh
cp .env.docker.example .env.docker.local

docker run -p 4075:4075 --rm --env-file .env.docker.local ghcr.io/aster-id/aster-portal:dev
```
