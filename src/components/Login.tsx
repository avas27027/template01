import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setUser,setJwt, setId } from "../app/slices/userSlice";
//import jwtDecode from "jwt-decode";
//import FacebookLogin from "react-facebook-login";
import { AiFillFacebook, AiOutlineGoogle } from "react-icons/ai";
import FetchStrapi from "../queries/fetchStrapi/FetchStrapi";
import { useNavigate } from "react-router-dom";

export default function Login() {
  //const user = useAppSelector((state) => state.userSlice.user);
  //const jwt = useAppSelector((state) => state.userSlice.jwt)
  const navigate = useNavigate()
  const registerEmail = new FetchStrapi().registerEmail
  const loginEmail = new FetchStrapi().loginEmail
  const [userN, setUserN] = useState("");
  const [userP, setUserP] = useState("")
  const dispach = useAppDispatch();
  const url = import.meta.env.VITE_BACKEND_URL

  /*
  function handleCredentialResponse(response: any) {
    const u: { name: string | null; email: string } = jwtDecode(
      response.credential
    );
    dispach(setUser(u.email));
  }
  const responseFacebook = (response: any) => {
    console.log(response);
  };
  /*
  useEffect(() => {
    window.crossOriginIsolated;
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_GSI,
      callback: handleCredentialResponse,
    });
    const butt = document.getElementById("buttonDiv")!;
    google.accounts.id.renderButton(
      butt,
      { type: "standard", theme: "outline", size: "large" } // customization attributes
    );
    google.accounts.id.prompt();
  });*/
  useEffect(() => {
    if (loginEmail.data != undefined) {
      const { jwt, email, id } = loginEmail.data
      console.log(jwt)
      console.log(id)
      dispach(setId(id))
      dispach(setUser(email))
      dispach(setJwt(jwt))
      navigate("/")
    }
    if (registerEmail.data != undefined) {
      const { jwt, email, id } = registerEmail.data
      dispach(setId(id))
      dispach(setUser(email))
      dispach(setJwt(jwt))
      navigate("/")
    }
    if (registerEmail.error != undefined) alert(registerEmail.error)
    if (loginEmail.error != undefined) alert(loginEmail.error)
  }, [loginEmail.isLoading, registerEmail.isLoading])
  return (
    <div className="login">
      <div className="login-form">
        <h1>Login</h1>
        <input onChange={(e) => { setUserN(e.target.value); }}
          placeholder="Correo" type="email" name="user" id="user-1" />
        <input onChange={(e) => { setUserP(e.target.value) }}
          placeholder="Contraseña" type="password" name="passw" id="pass-1" />
        <div className="login__register-but">
          <button onClick={() => { loginEmail.trigger({ identifier: userN, password: userP }) }}>
            Ingresar
          </button>
          <button onClick={() => { registerEmail.trigger({ username: userN, email: userN, password: userP }) }}>
            Registrar
          </button>
        </div>
        <p>O</p>
        <a href={url + "/api/connect/google"}>
          <button id="googleBut"><AiOutlineGoogle />Google</button>
        </a>
        <a href={url + "/api/connect/facebook"}>
          <button id="facebookBut"><AiFillFacebook />Facebook</button>
        </a>
        <h1>{sessionStorage.getItem("jwt")}</h1>
      </div>
    </div>
  );
}
