export const getUser = (payload: unknown[]) => {
  const [userId, name, email, _password, role, _idk, dob] = payload

  return {
    userId,
    name,
    email,
    role,
    dob,
  }
}
