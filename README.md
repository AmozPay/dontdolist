# dontdolist
A small but efficient to-do list api/database, coupled with a front-end interface.

Back-end: Node x Typescript, TypeORM, postgres docker image.<br>
Front-end: Svelte.js (Svelte is compiled at build time into ideal javascript, as opposed to React which is interpreted during run time)

Still in development but 100% functionnal.


## Get Started

### Launch the api:
In the root folder, use `docker-compose up --build`. You will need to use your own environment variables
to set up the database password, name, etc:

`export API_PORT=your_api_port`<br>
`export API_HOST=your_api_host`<br>
`export DB_NAME=choose_database_name`<br>
`export DB_USER=choose_a_database_username`<br>
`export DB_PASS=choose_a_db_password`<br>
`export DB_HOST=choose_a_host`<br>
`export DB_PORT=choose_a_port` (postgres's service port should be 5432)<br>

You could place these environment variable in a `.envrc` file in the root folder of the project and use `direnv allow` to export them.


### Launch the front:
In the "front" folder, use `npm run dev`.
