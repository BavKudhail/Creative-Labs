// @NOTE - Future Dev - connect this to out User MySQL Database
const connectedUsers = [];

// when the user joins the chat, get their socket.id, username and their project ID
function userJoinsChat(id, username, project_id) {
  const user = { id, username, project_id };
  //   push this to the user array
  connectedUsers.push(user);
  return user;
}

// Get current user
function getCurrentUser(id) {
  // find the user where their id matches
  return connectedUsers.find((user) => user.id === id);
}

// User Leaves Chat
function userLeavesChat(id) {
  // find the index of the user that matches the id param
  const index = connectedUsers.findIndex((user) => user.id === id);

  //   if user is not in the array it will return a negative 1
  if (index !== -1) {
    //   return remove that specific user from the chat
    return connectedUsers.splice(index, 1)[0];
  }
}

// Get all users within a project chat
function getProjectUsers(project_id) {
  // filter through all users and get the user where the project.id matches our project id
  return connectedUsers.filter((user) => user.project_id === project_id);
}

// Export user functions
module.exports = {
  userJoinsChat,
  getCurrentUser,
  userLeavesChat,
  getProjectUsers,
};
