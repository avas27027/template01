import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setUser } from "../app/slices/userSlice";
import jwtDecode from "jwt-decode";
import FacebookLogin from "react-facebook-login";
import { AiFillFacebook } from "react-icons/ai";
export default function Login() {
  const user = useAppSelector((state) => state.userSlice.user);

  const [userN, setUserN] = useState("");
  const dispach = useAppDispatch();

  /*
  function handleCredentialResponse(response: any) {
    const u: { name: string | null; email: string } = jwtDecode(
      response.credential
    );
    dispach(setUser(u.email));
  }*/
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

  return (
    <div className="login">
      <div className="login-form">
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
          }}
        >
          Ingresar
        </button>
        <p>O</p>
        <a href="https://strapi-test-vgs0.onrender.com/api/connect/google">
          <button>Google</button>
        </a>

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
        </h1>
      </div>
    </div>
  );
}
