import axios from "axios";

export default function useAuth() {
  async function login(email, password) {
    const {
      data: { token },
    } = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/auth/login`, {
      email,
      password,
    });

    console.log(token);
    return token;
  }

  async function registration(firstName, lastName, email, password) {
    const data = await axios.post(
      `${process.env.REACT_APP_API_DOMAIN}/auth/register`,
      {
        name: `${firstName} ${lastName}`,
        email,
        password,
      }
    );

    return data;
  }

  return { login, registration };
}
