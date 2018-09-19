export function userSerializer(req, user) {
  return {
    id: user.public_id,
    name: user.name,
    password_hash: user.password_hash,
    admin: user.admin
  };
}

export function todoSerializer(req, todo) {
  const { id, text, complete } = todo;
  return { id, text, complete };
}
