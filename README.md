# MechaEagles Board

Internal platform for managing team tasks and weekly updates.

---

## Overview

MechaEagles Board is a lightweight web application designed to centralize task tracking and communication across multiple teams and subteams.

The system uses Google Sheets as a data source, allowing non-technical team members to update content without modifying the codebase.

---

## Tech Stack

* React + TypeScript
* Tailwind CSS
* Vercel (deployment)
* Google Sheets (data source)
* OpenSheet API (data fetching)

---

## Features

### Task Management

* Displays tasks grouped by team and subteam
* Tracks progress (Completed / In Progress)
* Automatically updates without redeploy

### News System

* Weekly updates from leadership
* Simple content editing via Google Sheets
* No code changes required

### Live Data

* Data fetched from external API
* Updates every 30 seconds

---

## Data Source

The application fetches data from Google Sheets using a public API endpoint.

### Tasks format

| Team | Subteam | Task | Description | Deadline | Status |

### News format

| Name | Role | Title | Content | Date |

---

## Local Development

```bash
npm install
npm run dev
```

---

## Deployment

The project is deployed on Vercel.

Any push to the main branch triggers an automatic redeploy.

---

## Important

* Google Sheets must be set to **public (viewer access)**
* Do not expose API keys in the repository
* Ensure consistent column formatting in sheets

---

## Roadmap

* Add filtering and sorting
* Admin controls (edit tasks from UI)
* Authentication
* Real-time updates

---

## Author

Vladislav Hoila
