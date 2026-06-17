function Login() {
  return (
    <form>
      <label htmlFor="email">
        Email
      </label>

      <input
        id="email"
        type="email"
      />

      <button type="submit">
        Login
      </button>
    </form>
  );
}

export default Login