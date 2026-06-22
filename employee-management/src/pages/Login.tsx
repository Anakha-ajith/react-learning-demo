import { useNavigate }
from "react-router-dom";

function Login() {

 const navigate = useNavigate();

 const login = () => {
  localStorage.setItem(
   "token",
   "dummy-token"
  );

  navigate("/employees");
 };

 return (
  <>
   <h2>Login</h2>

   <button onClick={login}>
     Login
   </button>
  </>
 );
}

export default Login;