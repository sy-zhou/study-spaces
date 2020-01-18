const fs = require('fs');
const fetch = require("node-fetch");

const API_KEY = require('./api_key.json');
const TERM_ID = "1201";


const findRoomsForCourse = async (subject, catalog_number, arr) => {
  const SCHEDULE_URL = `http://api.uwaterloo.ca/v2/terms/${TERM_ID}/${subject}/${catalog_number}/schedule.json?key=${API_KEY}`;
  try {
    const response = await fetch(SCHEDULE_URL);
    const json = await response.json();
    if (json.meta.status == 204) return []; // no data returned
    json.data.forEach(section => {
      if (section.campus == "UW U" && section.classes[0].location.building) {
        const { building, room } = section.classes[0].location;
        const foundBuilding = arr.find(a => a.building === building);
        if (foundBuilding) {
          if (!foundBuilding.rooms.includes(room)) foundBuilding.rooms.push(room);
        } else {
          arr.push({ "building": building, "rooms": [room] });
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
}

const getData = async () => {
  const COURSES_URL = `http://api.uwaterloo.ca/v2/terms/${TERM_ID}/courses.json?key=${API_KEY}`;
  try {
    const response = await fetch(COURSES_URL);
    const json = await response.json();
    var arr = [];
    const numCourses = json.data.length;
    // get all rooms that all courses are held in and save to array
    for (var i = 0; i < numCourses; i++) {
      await findRoomsForCourse(json.data[i].subject, json.data[i].catalog_number, arr);
    }
    // make array orderly and pretty
    arr.sort((a,b) => (a.building > b.building) ? 1 : ((b.building > a.building) ? -1 : 0));
    arr.forEach(b => b.rooms.sort());
    fs.writeFile("./buildings.json", JSON.stringify(arr, null, 2), () => {});
  } catch (e) {
    console.log(e);
  }
};

getData(COURSES_URL);
