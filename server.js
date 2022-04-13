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
// import user.js functions to assist with chat application
const {
  userJoinsChat,
  getCurrentUser,
  userLeavesChat,
  getProjectUsers,
  userJoinsPrivateChat,
} = require("./utils/users");
// initialise express
const app = express();
const PORT = process.env.PORT || 3001;
// creating http instance
const server = http.createServer(app);
// creating socket io instance
const io = socketio(server);

// =========== SOCKET.IO LOGIC FOR OUR CHAT APPLICATION ==================

// ===================== PRIVATE CHAT LOGIC ===============================

// When a user connects to the chat run execute function
io.on("connection", (socket) => {
  socket.on("joinPrivateChat", ({ username, user_id }) => {
    // create user variable
    const user = userJoinsPrivateChat(socket.id, username, user_id);

    // join the room based on the users ID
    socket.join(user.user_id);

    // Run when a user has connected to the chat
    console.log("A user has connected");

    // Listen for private message
    socket.on("privateMessage", (message) => {
      console.log(message);
      io.to(user.user_id).emit("message", message);
    });
  });

  // ================= PROJECT CHAT LOGIC =================================

  const autoResponse = "Admin: ";

  // When the user joins the project chat...
  socket.on("joinProjectChat", ({ username, project_id }) => {
    // username and project ID values come from our get request and stored in chat.js file
    const user = userJoinsChat(socket.id, username, project_id);

    // socket.Join() whatever project the user joins based on that project ID
    socket.join(user.project_id);

    // Welcome current user to the chat
    socket.emit("message", formatMessage(autoResponse, "Welcome! Say Hello!"));

    // To all connected clients except the sender <<<< from socket.io docs
    socket.broadcast
      // emit to a specific project based on the project_id
      .to(user.project_id)
      .emit(
        "message",
        formatMessage(autoResponse, `${username} has joined the chat!`)
      );

    // Send information about the project chat and users
    io.to(user.project_id).emit("projectUsers", {
      project_id: user.project_id,
      users: getProjectUsers(user.project_id),
    });

    // Runs when the client disconnects
    socket.on("disconnect", () => {
      console.log("a user has disconnected");
      const user = userLeavesChat(socket.id);

      if (user) {
        // send a message to all of the users that the user has left the chat
        io.to(project_id).emit(
          "message",
          formatMessage(autoResponse, ` ${username} has left the chat!`)
        );

        // Send information about the project chat and users
        io.to(user.project_id).emit("projectUsers", {
          project_id: user.project_id,
          users: getProjectUsers(user.project_id),
        });
      }
    });

    // Listen for the message the user is sending
    socket.on("userMessage", (message) => {
      // get current user based on the socket.id
      const user = getCurrentUser(socket.id);
      // i.o emit sends the message to all?
      io.to(user.project_id).emit("message", formatMessage(username, message));
    });
  });
});
// ========================================================================

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

// In order to use socket.IO replace app.listen with server.listen.
sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () =>
    console.log("Now listening on http://localhost:3001")
  );
});
