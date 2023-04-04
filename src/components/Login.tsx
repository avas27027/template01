import { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../app/hooks";
import { setUser, setPass } from "../app/slices/userSlice";
import jwtDecode from "jwt-decode";
import FacebookLogin from "react-facebook-login";
import { AiFillFacebook } from "react-icons/ai";
export default function Login() {
  const user = useAppSelector((state) => state.userSlice.user);
  const pass = useAppSelector((state) => state.userSlice.pass);

  const [userN, setUserN] = useState("");
  const [passN, setPassN] = useState("");
  const dispach = useAppDispatch();

  function handleCredentialResponse(response: any) {
    const u: { name: string | null; email: string } = jwtDecode(
      response.credential
    );
    dispach(setUser(u.email));
  }
  const responseFacebook = (response: any) => {
    console.log(response);
  };
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
  });

  return (
    <div className="login">
      <form action="" className="login-form">
        <h1>Login</h1>
        <input
          onChange={(e) => {
            setUserN(e.target.value);
            console.log(e.target.value);
          }}
          placeholder="Correo"
          type="email"
          name="user"
          id="user-1"
        />
        <input
          onChange={(e) => {
            setPassN(e.target.value);
            console.log(e.target.value);
          }}
          placeholder="Contraseña"
          type="password"
          name="passw"
          id="pass-1"
        />
        <button
          onClick={() => {
            dispach(setUser(userN));
            dispach(setPass(passN));
          }}
        >
          Ingresar
        </button>
        <p>O</p>
        <div id="buttonDiv"></div>
        <FacebookLogin
          appId="514358457065846"
          autoLoad={false}
          fields="name,email,picture"
          textButton=" Ingresa con Facebook"
          callback={responseFacebook}
          cssClass="login-face"
          icon={<AiFillFacebook />}
        />
        <h1>
          {user}
          {pass}
        </h1>
      </form>
    </div>
  );
}
