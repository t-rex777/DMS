export const getUser = (payload: unknown[]) => {
  const [userId, name, email, _password, role, isApproved, dob] = payload

  return {
    userId,
    name,
    email,
    role,
    dob,
    isApproved,
  }
}
