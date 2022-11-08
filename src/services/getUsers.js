const USERS_URL = "https://randomuser.me/api/?results=30";

/**
 * Utility to fetch from url and check the responseStatus
 *
 * @returns {Promise<{results: Array<{
 * id: string,
 * email: string,
 * password: string,
 * createdAt: Date,
 * updatedAt: Date}>
 * } | {error: string}>}
 */
export default async function getUsers() {
  try {
    const response = await fetch(USERS_URL);
    const data = await response.json();
    const users = data.results
      .filter(user => user.login.password.length > 5 && user.login.password.length < 9)
      .map(user => ({
        id: user.login.uuid,
        email: user.email,
        password: user.login.password,
        createdAt: user.registered.date,
        updatedAt: user.registered.date
      }));

    return users;
  } catch (error) {
    return console.error(error);
  }
}

export const profilePicture = () => {
  return `https://media-exp1.licdn.com/dms/image/C4D03AQEToG4LDy3YwA/profile-displayphoto-shrink_400_400/0/1623259020426?e=1673481600&v=beta&t=o0Xq6wSzsFBtk968wyhheqhakyMjDKSjfydMl6YaNJw`;
};
