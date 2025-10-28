# Telesport
![Angular](https://img.shields.io/badge/Angular-red?logo=angular&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-v7.8.0-B7178C?logo=reactivex&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink?logo=sass&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-v20.10.0-43853D?logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-v10.2.3-CB3837?logo=npm&logoColor=white)

**Telesport** is an Angular application built as part of a training project.  
It displays Olympic Games statistics using interactive data visualizations and reactive data streams.

The project includes:
- A **dashboard** page showing the number of Olympic editions, participating countries, and a pie chart of medals by country.
- A **details** page showing statistics for a specific country, including a line chart illustrating its medals evolution over time.

This project demonstrates solid use of Angular architecture, reactive programming (RxJS), and data visualization (Chart.js through PrimeNG).

<br>

## Technical Highlights

| Area | Description |
|------|--------------|
| **Framework** | Angular 18 |
| **Language** | TypeScript |
| **Data Visualization** | Chart.js integrated via PrimeNG |
| **Routing** | Angular Router |
| **Reactive Programming** | RxJS Observables and the `async` pipe |
| **Memory Management** | `ngOnDestroy()` with the `takeUntil()` pattern |
| **Architecture** | Modular structure with reusable, isolated components |
| **Mock Data** | Static JSON file used as a mock backend |

<br>

## Installation
1. **Clone the repository**
```bash
   git clone https://github.com/PaulineLesueur/open-classrooms-telesport-2025.git
   cd open-classrooms-telesport-2025
```

2. **Install dependencies**<br>
*Note: Ensure you have Node.js (version 22.11.0) and npm (version 11.0.0) installed locally*
```bash
    npm install
```

3. **Run the development server**
```bash
    ng serve
```

Visit the following URL in your browser: `http://localhost:4200/`

## Project structure
- <strong>`src/app/core/models`</strong> : Contains the `Olympic`, `Participation`, `CountryTotals` and `ChartData` interfaces  defining the data structure.
- <strong>`src/app/core/services`</strong> : Contains the `OlympicService` for fetching Olympic data.
- <strong>`src/app/components`</strong> : 
    - <strong>`medals-pie-chart`</strong> : Contain the pie chart displayed in details page
    - <strong>`medals-line-chart`</strong> : Contain the line chart displayed in details page
- <strong>`src/app/pages`</strong> :
    - <strong>`home`</strong> : Display the list of countries and a pie chart of their total medals. Route `/`
    - <strong>`details`</strong> : Shows detailed statistics and a line chart for a selected country. Route `/details/:id`

## Notes
This project is a **fictional educational project** developed as part of an **OpenClassrooms certification program**.  It was created for learning purposes only and does not represent a real-world application or organization.