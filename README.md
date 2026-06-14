# Nightframe

Nightframe is Glojo Group AI's production-ready directory and product site template. Clone it, customise it, deploy it.

## Branch strategy

| Branch | Purpose |
|---|---|
| `main` | Production-ready code. Protected — merge via PR only. |
| `develop` | Integration branch. All feature work lands here first. |
| `feature/*` | Short-lived branches cut from `develop`. |

## Getting started

```bash
git clone https://github.com/HDhenneh/nightframe.git
cd nightframe
npm install
npm run dev
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and the PR template at `.github/PULL_REQUEST_TEMPLATE.md`.
