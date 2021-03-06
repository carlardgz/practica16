const express = require("express"); //importamos dependencia
let app = express(); //declaramos una App de Express
let port = process.env.port || 3000; //definición del puerto que escucha

app.use("/assets", express.static(__dirname + "/public"));
/*Esta línea le especifica a la aplicación de express que el directorio virtual
para el contenido estático se llama “/assets” y que ese nombre será mapeado a una 
carpeta física “/public”, que se encuentra en el directorio donde corre 
la aplicación “__dirname” */

app.use(express.urlencoded({ extended: false })); //se especifica que se va a parsear peticiones con URL encoded payload (datos dentro de body)

app.set("view engine", "ejs"); //setteamos el ejs

app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html> <html lang="en"> <head><link rel="stylesheet" href="assets/style.css"/>
  <title> Document </title> </head>
  <body> <h1> Hola mundo </h1>
  <p>Este es un parrafo y su contenido debe ser azul</p></body> </html>`);
}); // pequeña estructura html con un encabezado, cuerpo y párrafo.

app.get("/student", (req, res) => {
  res.render("index");
});

//Con POST la ruta /student responde al form
//Cuidar que los id coincidan con lo que se tiene en index.ejs
app.post("/student", (req, res) => {
  res.send(`First name es: ${req.body.fname}, Last name es: ${req.body.lname}`);
});

//route handler para parsear peticiones que contienen un objeto JSON en el body
//extrae el objeto y nos deja sus keys a nuestra disposición
app.post("/personjson", express.json({ type: "*/*" }), (req, res) => {
  console.log("El objeto contiene: ", req.body);
  console.log("Nombre: ", req.body.firstname);
  console.log("Apellido: ", req.body.lastname);
});

app.listen(port);

/*


app.use("/", function (req, res, next) {
  console.log("Request URL:" + req.url);
  next();
});


//primera ruta (está al nivel de la raíz /), Hello World!
app.get("/", function(req, res) {
    res.render("index");
});

//segunda ruta /api, regresa un objeto JSON
app.get("/api", function(req, res) {
    res.json({ firstname: "Carla", lastname: "Rodríguez" });
});

//tercera ruta, enviamos un parámetro a nuestro server utilizando la barra de
//direcciones del navegador
app.get("/person/:id", function(req, res) {
    res.render("person", { ID: req.params.id });
});
*/
