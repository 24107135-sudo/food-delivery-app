# DevOps Assignment: Food Delivery Application

**Student:** Shrutika Mane  
**Roll No.:** 24107135  
**Email:** 24107135@apsit.edu.in  
**GitHub username:** 24107135-sudogithub

## Application and objective

This assignment uses a food delivery application as a common example across Agile planning, source-code management, and CI/CD. The MVP lets customers discover restaurants, browse menus, manage a cart, enter delivery details, and simulate an order confirmation. Checkout is a demonstration only; the app does not collect payment.

## Question 1 — Agile user stories and Jira backlog

The backlog was prioritized by customer value, dependencies, and effort. Stories follow the “As a … I want … so that …” format. Acceptance criteria are expressed as verifiable outcomes. The first five stories cover the end-to-end MVP ordering journey.

The signed-in Jira site already contained a Scrum space named **SHRUTIKA** (project key `SCRUM`), so the backlog was created there rather than changing or renaming the existing space. Jira's available work item types in this space were Epic, Feature, and Task; each user story was therefore created as a **Feature** work item with the story narrative and acceptance criteria in its description.

| Priority | Story | Points | Acceptance criteria summary |
|---|---|---:|---|
| Highest | Browse nearby restaurants | 3 | Show available restaurant names/details; show an empty state when none exist. |
| High | View restaurant menu | 3 | Selecting a restaurant shows item names/prices; unavailable items cannot be added. |
| High | Manage cart items | 5 | Add/remove items and recalculate quantity and total. |
| High | Review cart total | 3 | Show items, quantities, prices, and total; block checkout for an empty cart. |
| High | Place an order | 5 | Valid name/address and non-empty cart produce confirmation; invalid inputs are reported. |
| Medium | Track order status | 3 | Show a placed order's status to the customer. |
| Medium | Update order status | 5 | Staff can save status changes that are visible to the customer. |
| Low | Filter by cuisine | 3 | Selecting a cuisine displays matching restaurants only. |

The eight Jira work items were created as `SCRUM-5` through `SCRUM-12`. [Open the Jira backlog](https://devopsass.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog). Priorities are Highest for restaurant discovery, High for the core ordering journey, Medium for order management, and Low for cuisine filtering. The point values in the table and CSV are planning estimates; they have not been set as estimates in Jira. The CSV is available for reuse/import in another Jira project.

## Question 2 — Git and GitHub

The local project is prepared for a GitHub repository named `food-delivery-app` under the provided account. Use `main` as the stable branch and work on one feature branch per story or cohesive change. Make small descriptive commits, open pull requests, review and test changes before merging, then delete merged feature branches. Reference the related Jira issue in each branch name or pull request. GitHub sign-in is required before the remote repository and pull request can be created.

Example commands:

```bash
git init
git add .
git commit -m "chore: create food delivery app"
git branch -M main
git remote add origin https://github.com/24107135-sudogithub/food-delivery-app.git
git push -u origin main

git switch -c feature/restaurant-list
# Implement and test the story
git add .
git commit -m "feat: display restaurant list"
git push -u origin feature/restaurant-list
```

Open a pull request from `feature/restaurant-list` to `main`, review it, wait for checks, and merge it. Never commit passwords, tokens, or other secrets. If working individually, use the same branch and pull-request workflow and do not claim review by another person unless it happened.

## Question 3 — CI/CD with GitHub Actions

The workflow in `.github/workflows/ci-cd.yml` runs for pushes to `main` and pull requests targeting `main`. It checks out code, sets up Node.js, installs from the lockfile, runs automated tests, builds the static site, and uploads `dist/` as a packaged artifact. On a successful push to `main`, it deploys the artifact to GitHub Pages. Configure the repository's Pages source as **GitHub Actions**.

Local verification commands:

```bash
npm ci
npm test
npm run build
```

The workflow uses a GitHub-hosted runner. A pull request runs build and tests; a successful merge/push to `main` also deploys the generated site. Review the Actions run and the deployment URL as evidence.

## Implementation and evidence

The demo UI includes restaurant search and cuisine filters, restaurant menus, cart quantity controls and totals, basic required-field validation, and a simulated order confirmation. Pure application logic has automated Node.js tests. The static build output is created in `dist/`.

Before submission, add screenshots from your own accounts:

1. Jira backlog with priorities/story points and a story's acceptance criteria.
2. GitHub repository, commit history, feature branch, and merged pull request.
3. Successful GitHub Actions test/build run and Pages deployment.
4. Running Food Delivery application.

The Jira items SCRUM-5–SCRUM-12 have been created in the authenticated Jira account. Remote GitHub repository creation, pull requests, and deployment require GitHub account sign-in; do not present those remote steps as completed until they are actually performed. Screenshots should show the work that was actually performed.

## Conclusion

The assignment demonstrates how a prioritized Agile backlog guides implementation, Git branches and pull requests support controlled collaboration, and an automated CI/CD workflow tests, packages, and deploys the application.
