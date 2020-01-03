const fetch = require('node-fetch');
const buildings = require('../database/buildings.json');
const API_KEY = require('../api_key.json');

const getData = url => {
  return fetch(url)
    .then(response => response.json())
    .then(response => response.data)
}

module.exports = function(app, db) {
  app.get('/api/buildings', (req, res) => {
    res.send(buildings);
  })
  app.get('/api/building/:building', (req, res) => {
    const b = buildings.find(b => b.building === req.params.building);
    if (!b) res.status(404).send('dne');
    res.send(b);
  })
  app.get('/api/building/:building/:room/courses', async (req, res) => {
    const b = buildings.find(b => b.building === req.params.building);
    if (!b) res.status(404).send('dne');
    const r = b.rooms.find(r => r === req.params.room);
    // fetch data from uwaterloo api
    let courses = await getData(`http://api.uwaterloo.ca/v2/buildings/${b.building}/${r}/courses.json?key=${API_KEY}&term=1201`);
    courses = courses.map(course => {
      return {
        weekdays: course.weekdays,
        start_time: course.start_time,
        end_time: course.end_time,
      }
    });
    // const courses = [{"weekdays":"MWF","start_time":"13:30","end_time":"14:20"},{"weekdays":"TTh","start_time":"11:30","end_time":"12:50"},{"weekdays":"TTh","start_time":"10:00","end_time":"11:20"},{"weekdays":"TTh","start_time":"14:30","end_time":"15:50"},{"weekdays":"TTh","start_time":"13:00","end_time":"14:20"},{"weekdays":"TTh","start_time":"08:30","end_time":"09:50"},{"weekdays":"MW","start_time":"08:30","end_time":"09:50"},{"weekdays":"MW","start_time":"16:00","end_time":"17:20"},{"weekdays":"MWF","start_time":"11:30","end_time":"12:20"},{"weekdays":"MWF","start_time":"10:30","end_time":"11:20"},{"weekdays":"M","start_time":"17:30","end_time":"18:20"},{"weekdays":"M","start_time":"14:30","end_time":"15:20"},{"weekdays":"M","start_time":"12:30","end_time":"13:20"},{"weekdays":"MW","start_time":"16:00","end_time":"17:20"}];

    res.send(courses);
  })
}