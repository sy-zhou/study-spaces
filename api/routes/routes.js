const fetch = require('node-fetch');
const buildings = require('../database/buildings.json');

const getData = url => {
  return fetch(url)
    .then(response => response.json())
    .then(response => response.data)
}

module.exports = function(app, db) {
  app.get('/api/buildings', (req, res) => {
    res.send(buildings);
  })
  app.get('/api/building/:code', (req, res) => {
    const b = buildings.find(b => b.code === req.params.code);
    if (!b) res.status(404).send('dne');
    res.send(b);
  })
  app.get('/api/building/:building/:room/courses', async (req, res) => {
    const b = buildings.find(b => b.code === req.params.building);
    if (!b) res.status(404).send('dne');
    const r = b.rooms.find(r => r === req.params.room);
    // fetch data from uwaterloo api
    let courses = await getData(`http://api.uwaterloo.ca/v2/buildings/${b.code}/${r}/courses.json?key=36e4c705ba766146812bed548893b233`);
    courses = courses.map(course => {
      return {
        weekdays: course.weekdays,
        start_time: course.start_time,
        end_time: course.end_time,
      }
    });

    res.send(courses);
  })
}