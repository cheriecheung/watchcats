const regex = {
  email_regex: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  password_regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
}

export default regex