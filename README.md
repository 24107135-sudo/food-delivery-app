# Crave — Food Delivery DevOps Assignment

A small responsive food-ordering demo plus ready-to-import DevOps assignment material.

## Run locally

Requires Node.js 20 or newer.

```bash
npm ci
npm test
npm run build
```

Open `index.html` directly in a browser for the demo, or serve the generated `dist/` folder with any static web server. The checkout is simulated and does not collect payment.

## Assignment files

- `ASSIGNMENT-REPORT.md` — report draft covering Agile/Jira, Git/GitHub, and CI/CD.
- `jira-product-backlog.csv` — prioritized stories suitable for Jira CSV import.
- `.github/workflows/ci-cd.yml` — test, build, artifact packaging, and GitHub Pages deployment.

The eight user-story work items have been added to the existing Jira Scrum space SHRUTIKA (`SCRUM-5` through `SCRUM-12`): [open the Jira backlog](https://devopsass.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog). Jira's available work item type in that space is Feature, so stories are represented as Feature items with acceptance criteria in their descriptions.

## Publish on GitHub

Create a repository called `food-delivery-app` under your GitHub account, then from this folder run:

```bash
git init
git add .
git commit -m "chore: create food delivery app"
git branch -M main
git remote add origin https://github.com/24107135-sudogithub/food-delivery-app.git
git push -u origin main
```

In the repository settings, configure Pages to deploy from **GitHub Actions**. The workflow runs tests/build for pull requests and deploys on pushes to `main`.

## Import the Jira backlog

The CSV is provided for importing the backlog into another Jira project. Map `Issue Type`, `Summary`, `Description`, `Priority`, `Story Points`, and `Labels`, and confirm the import preview before creating issues. The actual Jira work items are already in the linked SHRUTIKA backlog; attach screenshots of that backlog and an issue's acceptance criteria to the report.
