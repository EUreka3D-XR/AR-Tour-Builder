export const getUserIdentifier = (user) => {
  return user.username || user.email;
};

export const getUserDisplayName = (user) => {
  if (!user) return "Unknown User";
  return user.name || user.username || user.email || user.id;
};
