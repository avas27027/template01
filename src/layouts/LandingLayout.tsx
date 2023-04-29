import Features from "../components/sections/Features";
import Header from "../components/sections/Header";
import FAQ from "../components/sections/FAQ";
import SlideShow from "../components/interactive/SlideShow";
import Carousel from "../components/interactive/Carousel";
import Testimonial1 from "../components/sections/Testimonial1";
import Card from "../components/paterns/Card";
import Testimonial2 from "../components/sections/Testimonial2";
import { useTesti } from "../queries/TestisHook";
import { useQandA } from "../queries/QandAHook";
import { useFeatures } from "../queries/FeaturesHook";
import { useHeader } from "../queries/HeaderHook";

export default function LandingLayout() {
  const testi = useTesti()!
  const qa = useQandA()!
  const features = useFeatures()!
  const header = useHeader()!

  return (
    <div className="landingLayout">
      <Header data={header} minHeight="93svh" margin="4svh 0 0 0"></Header>
      <Features features={features}></Features>
      <FAQ data={qa} margin="20vh 0"></FAQ>
      <SlideShow
        slides={[
          <Testimonial2 data={testi} height="40vh"></Testimonial2>,
          <Testimonial2 data={testi} height="40vh"></Testimonial2>,
          <Testimonial2 data={testi} height="40vh"></Testimonial2>,
        ]}
        aniVelocity={1000}
        behavour="linear"
        width="100%"
        mediumMediaHeight="100vh"
        smallMediaHeight="150vh"
        height="60vh"
      ></SlideShow>
      <Carousel
        slides={[
          <Card
            width="90%"
            minHeight="40%"
            title="weird-close hosting"
            picture="https://img.freepik.com/free-vector/watercolor-stains-abstract-background_23-2149107181.jpg?w=2000"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae voluptatum impedit corporis molestias obcaecati! Incidunt!"
            button={{ butname: "Leer más", butlink: "#" }}
          />,
          <Card
            width="90%"
            minHeight="40%"
            title="weird-close hosting"
            picture="https://img.freepik.com/free-vector/watercolor-stains-abstract-background_23-2149107181.jpg?w=2000"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae voluptatum impedit corporis molestias obcaecati! Incidunt!"
            button={{ butname: "Leer más", butlink: "#" }}
          />,
          <Card
            width="90%"
            minHeight="40%"
            title="weird-close hosting"
            picture="https://img.freepik.com/free-vector/watercolor-stains-abstract-background_23-2149107181.jpg?w=2000"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae voluptatum impedit corporis molestias obcaecati! Incidunt!"
            button={{ butname: "Leer más", butlink: "#" }}
          />,
          <Card
            width="90%"
            minHeight="40%"
            title="weird-close hosting"
            picture="https://img.freepik.com/free-vector/watercolor-stains-abstract-background_23-2149107181.jpg?w=2000"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae voluptatum impedit corporis molestias obcaecati! Incidunt!"
            button={{ butname: "Leer más", butlink: "#" }}
          />,
          <Card
            width="90%"
            minHeight="40%"
            title="weird-close hosting"
            picture="https://img.freepik.com/free-vector/watercolor-stains-abstract-background_23-2149107181.jpg?w=2000"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae voluptatum impedit corporis molestias obcaecati! Incidunt!"
            button={{ butname: "Leer más", butlink: "#" }}
          />,
        ]}
        columns={3}
        width="100%"
      />
      <Testimonial1 data={testi}></Testimonial1>

      <Testimonial2 data={testi} height="50vh" margin="10vh 0"></Testimonial2>
    </div>
  );
}
