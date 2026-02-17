# Publishing

This project has two main remotes:

| Remote | Repository | Purpose |
|--------|-----------|---------|
| `origin` | `ails-lab/eureka-frontend` | Internal development repository |
| `org` | `EUreka3D-XR/AR-Tour-Builder` | Organization repository (triggers CI/CD) |

## Publishing to Origin

Push the main branch to the internal development repository:

```bash
git push origin main
```

This does **not** trigger any CI/CD pipelines.

## Publishing to Org

Push the main branch to the organization repository:

```bash
git push org main
```

This **triggers the CI/CD pipeline** (`.github/workflows/build_container_image.yml`) which:

1. Builds the Docker image
2. Tags it with a timestamp and `latest`
3. Pushes it to the EGI Artefact Registry (`registry.egi.eu/eureka3d-xr.vo.egi.eu/ar_tour_builder_frontend`)

## Publishing to Both

To push to both remotes at once:

```bash
git push origin main && git push org main
```

## Note for DevOps

The container now uses **runtime config injection**. The `VITE_API_BASE_URL` environment variable **must** be passed when running the container:

```bash
docker run -e VITE_API_BASE_URL=https://api.production.example.com ...
```

If this variable is not set, API calls will fail. See [docs/environment-variables.md](environment-variables.md) for full details on how runtime configuration works.

## Typical Workflow

1. Develop and commit on `main` (or a feature branch merged into `main`)
2. Push to `origin` to keep the internal repo up to date
3. When ready to deploy, push to `org` to trigger the container image build
