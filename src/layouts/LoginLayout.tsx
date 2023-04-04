import { useEffect } from "react";
import Login from "../components/Login";
import { useScrollPosition } from "../app/hooks";

export default function LoginLayout() {
  const scrollPos = useScrollPosition();
  //Scroll Position-----------------------------
  useEffect(() => {
    let offsetStart = 0;
    let offsetEnd = 0;
    let i =
      (scrollPos - offsetStart) /
        (document.body.offsetHeight -
          offsetStart -
          offsetEnd -
          window.innerHeight) -
      0.01;
    console.log(i);
  }, [scrollPos]);
  return (
    <div className="loginLayout">
      <div className="header">
        <h1>Pagina de Login</h1>
        <p>
          Algunas ventajas de logearse Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Harum nemo similique a voluptatibus repudiandae iure
          error blanditiis eos doloribus reprehenderit?
        </p>
      </div>
      <Login></Login>
    </div>
  );
}
