# employee vote
This is a learning project to dig deeper in to the [Vue3 Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html),
showing data in realtime charts (in this case [Apexcharts](https://apexcharts.com/)) and getting started with
[express.js](https://expressjs.com/). I chose express.js as backend, because it seemed to be minimalistic and lightweight.
After *"finishing"* the project, I thought maybe I should have given [GO](https://golang.org/) a shot. You know how it is ... ;-)  
This tool enables your employees to evaluate their week on a scale from 1 to 10. It's only allowed to vote once a week.
In the statistics tab you can select the year and calendar week to show the evaluation data. The weekly average for every year is
displayed in the chart and will update as soon as you change the selected year. When you change the selected calendar week,
you can see the statistics in the table below the chart, especially for the selected week.
If you have some improvements/tips, you are welcome to create a Merge Request!

## Deployment
1. Clone the repo.
2. Create an `.env` file in the backend and frontend folder and define your environment variables.
   The `.env.example` files should be used as a template.
3. Update passwords in `docker-compose.yml`.
4. Run the server with `docker-compose up --build -d`.
5. Now the frontend should be available on port 80.

**Hint:** You will notice that the vote-backend will throw errors in the beginning of the start, because the vote-backend
is dependent on the MySQL database. Because of that it will restart the vote-backend container until it's able to connect. I know
this is a bit of a sneaky workaround, but it's working for now!

## Run tests
I created some unit tests for the frontend. You can run them by:
1. cd into the frontend folder
2. Run `yarn test:unit`
