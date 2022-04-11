//path
const path = require("path");
//express
const express = require("express");
//session
const session = require("express-session");
//handlebars
const exphbs = require("express-handlebars");
//routes
const routes = require("./controllers");
//helpers
const helpers = require("./utils/helpers");
//sequelize
const sequelize = require("./config/connection");
// sequelize store
const SequelizeStore = require("connect-session-sequelize")(session.Store);
// http
const http = require("http");
// socket.io
const socketio = require("socket.io");
// import chat functions
const formatMessage = require("./utils/formatMessage");
// initialise express
const app = express();
const PORT = process.env.PORT || 3001;

// create our http server - pass into express app
const server = http.createServer(app);
const io = socketio(server);

// When a user connects to the chat page run execute function
io.on("connection", (socket) => {
  const autoResponse = "Admin: ";

  console.log("user has connected to the chat");

  // Welcome current user to the chat
  socket.emit("message", formatMessage(autoResponse, "Welcome! Say Hello!"));

  // Send a message to the user upon connection
  // broadcast.emit or socket.emit???
  // To all connected clients except the sender <<<< from socket.io docs
  socket.broadcast.emit(
    "message",
    formatMessage(autoResponse, "USERNAME has joined the chat!")
  );

  // Runs when the client disconnects
  socket.on("disconnect", () => {
    // send a message to all of the users that the user has left the chat
    io.emit(
      "message",
      formatMessage(autoResponse, "USERNAME has left the chat!")
    );
  });

  // Listen for the userMessage
  socket.on("userMessage", (message) => {
    // i.o emit sends the message to all?
    io.emit("message", formatMessage("currentUser", message));
  });
});

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log("Now listening on http://localhost:3001"));
// });

// In order to use socket.IO replace app.listen with server.listen.
//***The second form (creating an HTTP server yourself, instead of having Express create one for you) is useful if you want to reuse the HTTP server, for example to run socket.io within the same HTTP server instance***

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () =>
    console.log("Now listening on http://localhost:3001")
  );
});
