import http from './httpService';

export const getAllUsers = async () => await http.get('/users');

export const getUserById = async userId => {
  const res = await http.get(`/users/${userId}`);
  return res.data
}

export const toggleAdminStatusOfUser = async userId => {
  const res = await http.put(`/users/toggle-admin/${userId}`);
  return res.data
}

export const deleteUser = async userId => {
  const res = await http.delete(`/users/${userId}`);
  return res.data;
}

export const updateUser = async (updatedUserData, userId) => {
  const res = await http.put(`/users/update-user/${userId}`, updatedUserData)
  return res.data
}

const adminService = {
  deleteUser,
  toggleAdminStatusOfUser,
  getUserById,
  getAllUsers,
  updateUser,
}

export default adminService;