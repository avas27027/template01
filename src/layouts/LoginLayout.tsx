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
    <div className="loginLayout" style={{ marginTop: "6vh" }}>
      <div className="header">
        <div className="header-back">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            viewBox="0 0 1100 560"
          >
            <g mask='url("#SvgjsMask1058")' fill="none">
              <path
                d="M 0,63 C 36,58.2 108,38 180,39 C 252,40 288,75.4 360,68 C 432,60.6 468,-2 540,2 C 612,6 648,85.4 720,88 C 792,90.6 828,16.8 900,15 C 972,13.2 1008,74.2 1080,79 C 1152,83.8 1188,37.4 1260,39 C 1332,40.6 1404,77.4 1440,87L1440 560L0 560z"
                id="wave-1"
              ></path>
              <path
                d="M 0,53 C 32,48.4 96,23.2 160,30 C 224,36.8 256,86.6 320,87 C 384,87.4 416,34 480,32 C 544,30 576,79.2 640,77 C 704,74.8 736,23.6 800,21 C 864,18.4 896,66.2 960,64 C 1024,61.8 1056,05.2 1120,10 C 1184,14.8 1216,82 1280,88 C 1344,94 1408,49.6 1440,140L1440 560L0 560z"
                id="wave-2"
              ></path>
            </g>
            <defs>
              <mask id="SvgjsMask1058">
                <rect width="1100" height="560" fill="#ffffff"></rect>
              </mask>
              <style></style>
            </defs>
          </svg>
        </div>
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
