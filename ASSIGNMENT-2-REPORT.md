# Assignment 2 — DevOps CI/CD, MLflow and Monitoring

**Student:** Shrutika Mane | **Roll No.:** 24107135  
**Repository:** https://github.com/24107135-sudo/food-delivery-app

## Q1 — CI/CD, Docker and Compose

GitHub Actions runs automated Node tests/builds, packages and deploys the demo. `Dockerfile` containerizes the Python API/trainer; `docker-compose.yml` runs MLflow, trainer, API, Prometheus and Grafana. `.github/workflows/assignment2.yml` runs Compose validation, container build, model training/registration, service deployment, and API/metrics/monitoring smoke tests. The service ports are MLflow 5000, API 8000, Prometheus 9090 and Grafana 3000.

## Q2 — ML lifecycle and monitoring

`train_model.py` trains a reproducible scikit-learn regression model, logs parameters and MAE to MLflow, and registers `FoodDeliveryWaitTime` version 1. `app.py` loads that registry version and serves predictions. It exposes Prometheus request counters and latency histograms at `/metrics`; `prometheus.yml` scrapes them and the provisioned Grafana dashboard visualizes request rate and p95 latency.

## Q3 — Integrated architecture

The end-to-end architecture, Mermaid diagram and local run instructions are in [ARCHITECTURE.md](./ARCHITECTURE.md). The workflow connects Jira backlog, Git branches/PRs, CI, Docker/Compose deployment, model tracking/registry and monitoring.

### Evidence

- Jira backlog: https://devopsass.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog
- GitHub repository: https://github.com/24107135-sudo/food-delivery-app
- GitHub Actions runs: https://github.com/24107135-sudo/food-delivery-app/actions
- Live web demo: https://24107135-sudo.github.io/food-delivery-app/

Attach screenshots of the passing CI build/test and Compose/monitoring execution from the workflow run. Docker is not installed on the current authoring workstation, so Compose could not be run locally; the GitHub-hosted workflow is configured to execute it and provide the evidence.
