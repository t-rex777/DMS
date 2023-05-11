export const getUser = (payload: unknown[]) => {
  const [userId, name, email, _password, role, _isApproved, dob] = payload

  return {
    userId,
    name,
    email,
    role,
    dob,
  }
}
