export const E_Permission = {
  superAdmin: "Super Admin",
  userCreate: "Create User",
  userRead: "Read User",
  userUpdate: "Update User",
  userDelete: "Delete User",
  userBlock: "Block User",
};

export const validatePermission = (permission, userPermissions) => {
  if (userPermissions.includes("superAdmin")) return true;
  return userPermissions.includes(permission);
};
