const express = require("express");
const Joi = require("@hapi/joi");

const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get(`/api/courses`, (req, res) => {
  res.send(courses);
});

app.delete("/api/courses/:id", (req, res) => {
  // Look up the course
  // Not exist : return 404
  const course = findCourse(req, res);

  // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  // Return the same course
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);

  // Errorhandling
  if (error) {
    // 400 Bad Request
    return res.status(400).send(error.details[0].message);
  }

  const course = { id: courses.length + 1, name: req.body.name };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = findCourse(req, res);
  const { error } = validateCourse(req.body);
  // Errorhandling
  if (error) {
    // 400 Bad Request
    return res.status(400).send(error.details[0].message);
  }
  // Update course
  course.name = req.body.name;
  // Return the updated course
  res.send(course);
});

app.get("/api/courses/:id", (req, res) => {
  const course = findCourse(req, res);
  res.send(course);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

const findCourse = (req, res) => {
  const course = courses.find(c => parseInt(req.params.id) === c.id);
  if (!course) {
    return res.status(404).send("The course with the given ID was not found.");
  }
  return course;
};

const validateCourse = course => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  const result = Joi.validate(course, schema);
  return result;
};
