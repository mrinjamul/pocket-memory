// mask user data
function maskUser(user, authenticated) {
  let maskedUser;
  if (authenticated) {
    maskedUser = {
      username: user.username,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  } else {
    maskedUser = {
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
  return maskedUser;
}

module.exports = {
  maskUser,
};
