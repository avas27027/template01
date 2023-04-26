import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setJwt, setUser } from "../app/slices/userSlice";

export default function LoginRedirect() {
  const [text, setText] = useState("Loading..");
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const dispach = useAppDispatch();
  const url = import.meta.env.VITE_BACKEND_URL
  useEffect(() => {
    fetch(
      `${url}/api/auth/${params.providerName}/callback${location.search}`
    )
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        return res;
      })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.user.username);
        console.log(res.jwt);
        dispach(setUser(res.user.username));
        dispach(setJwt(res.jwt));
        setText(
          "todo ok"
        );
        //setTimeout(() => navigate("/"), 3000); // Redirect to homepage after 3 sec
        navigate("/")
      })
      .catch((err) => {
        console.log(err);
        setText("An error occurred, please see the developer console.");
      });
  }, [history, location.search, params.providerName]);
  return <p>{text}</p>;
}
