const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries');

const app = express();
const port = 3005;

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
});
app.get('/stats/:id', db.getStatsById);
app.post('/players/:id', db.updatePlayerNameById);
app.get('/players', db.getPlayers);
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})