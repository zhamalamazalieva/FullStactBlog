const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

const dbURI =
  "mongodb+srv://blogs-zhamal:jad599592032401@cluster0.xqpns.mongodb.net/blogs-data?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3005))
  .catch((err) => console.log(err));
// express app
const app = express();
// register view engine
app.set("view engine", "ejs");
// middleware & static files
app.use(express.static("public"));
//
app.use(express.urlencoded());

app.use((req, res, next) => {
  console.log("new request made:");
  console.log("host: ", req.hostname);
  console.log("path: ", req.path);
  console.log("method: ", req.method);
  next();
});

app.use((req, res, next) => {
  console.log("in the next middleware");
  next();
});

app.use(morgan("dev"));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get("/", (req, res) => {
  // const blogs = [
  //   {
  //     title: "Yoshi finds eggs",
  //     description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that....",
  //     date: "May 20th 2020",
  //     img: "/images/blog1.png",
  //   },
  //   {
  //     title: "Mario finds stars",
  //     description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that....",
  //     date: "May 20th 2020",
  //     img: "/images/blog2.png",
  //   },
  //   {
  //     title: "How to defeat bowser",
  //     description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that....",
  //     date: "May 20th 2020",
  //     img: "/images/blog3.png",
  //   },
  // ];
  // res.render("index", { title: "Home", blogs });
  res.redirect("/blogs");
});
app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog.save().then(() => {
    res.redirect("/blogs");
  });
});

app.get("/blogs", (req, res) => {
  Blog.find().then((result) => {
    res.render("index", { title: "hello", blogs: result });
  });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id).then((result) => {
    res.render("blogDetails", { blog: result });
  });
});

app.get("/add-blog", (request, response) => {
  const blog = new Blog({
    title: "Статья про тяжелую рабочую жизнь Эльдара",
    description:
      "Здоровый образ жизни (ЗОЖ) – это навык человека, который заключается в способности выполнять специальные действия (или наоборот, отказаться от выполнения таковых), направленные на сохранение и улучшение его здоровья и профилактику заболеваний.",
    imgUrl: "http://kurs-prof.ru/wp-content/uploads/2016/04/povar-kulinar.jpg",
    date: "dsfsdfsdkfjdskg",
  });
  blog.save().then((result) => response.send(result));
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
