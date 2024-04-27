export function getUserData(userId: number) {
  return fetch(`http://localhost:8080/users/${userId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      return response.json();
    });
}