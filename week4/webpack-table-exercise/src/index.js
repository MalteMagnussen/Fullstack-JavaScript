import _ from "lodash";
import "./style.css";
import "bootstrap/dist/css/bootstrap.css";

class Person {
  constructor(fn, ln, s) {
    this.firstName = fn;
    this.lastName = ln;
    this.favoriteSport = s;
  }
}

const persons = [
  new Person("Kurt", "Wonnegut", "Socker"),
  new Person("Jan", "Peterson", "Hockey"),
  new Person("Jane", "Peterson", "Skating"),
  new Person("John", "Hansen", "Socker")
];

const cities = [
  { city: "Lyngby", zipCode: "2800" },
  { city: "Hvidovre", zipCode: "2650" },
  { city: "Glostrup", zipCode: "2600" }
];

const hobbies = [
  { name: "football", players: 22 },
  { name: "chess", players: 2 },
  { name: "boxing", players: 2 }
];

// You must implement the makeTable(..) function, used below:
const table = makeTable(persons);
document.getElementById("my-table").innerHTML = table;
document.getElementById("my-table-two").innerHTML = makeTable(cities);
document.getElementById("my-table-three").innerHTML = makeTable(hobbies);

function makeTable(data) {
  // Make the header for the table
  let table = '<table class="table">';
  table += "<thead>";
  table += "<tr>";
  const keys = _.keys(data);
  const headerRows = keys.map(
    key => `<th scope="col">${_.startCase(key)}</th>`
  );
  table += headerRows.join("");
  table += "</thead>";
  table += "<tbody>";
  const tableBody = data.map(element => {
    let row = `<tr>`;
    let tds = keys.map(key => `<td>${element[key]}</td>`);
    row += tds.join("");
    row += `</tr>`;
    return row;
  });
  table += tableBody.join("");
  table += "</tbody>";
  table += "</table>";

  // Make the body for the table

  // Make the table with the header and body.
  // Provide the table element with class="table"
  // to style with Bootstrap
  return table;
}
