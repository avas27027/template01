import Features from "../components/sections/Features";
import Header from "../components/sections/Header";
import FAQ from "../components/sections/FAQ";
import SlideShow from "../components/interactive/SlideShow";
import Carousel from "../components/interactive/Carousel";
import Testimonial1 from "../components/sections/Testimonial1";
import Card from "../components/paterns/Card";
import Testimonial2 from "../components/sections/Testimonial2";
import FetchStrapi from "../queries/fetchStrapi/FetchStrapi";

export default function LandingLayout() {
  const data = new FetchStrapi().useHeader
  const features = new FetchStrapi().useFeatures
  const qa = new FetchStrapi().useQA
  const testis = new FetchStrapi().useTestis

  const slides = [
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
  ]

  return (
    <div className="landingLayout">
      {!data.isLoading && <Header data={
        { title: data.data!.Title, desc: data.data!.Desc, img: data.data!.url, link: data.data!.link }
      } minHeight="93svh" ></Header>}
      {!features.isLoading && <Features data={
        features.data!.map(({ title, desc, img, link }) => { return { title, desc, img, link } })
      }></Features>}
      {!qa.isLoading && <FAQ data={
        qa.data!.map(({ pregunta, respuesta }) => { return { title: pregunta, desc: respuesta } })
      } margin="10% 0"></FAQ>}
      <SlideShow
        slides={slides}
        aniVelocity={1000}
        behavour="linear"
        width="100%"
        mediumMediaHeight="100vh"
        smallMediaHeight="150vh"
        height="60vh"
      ></SlideShow>
      <Carousel slides={slides} columns={3} width="100%" />
      {!testis.isLoading && <Testimonial1 data={
        testis.data!.map(({ username, content, email, photo }) => { return { name: username, social: email, img: photo, review: content } })
      }></Testimonial1>}
      {!testis.isLoading && <Testimonial2 data={
        testis.data!.map(({ username, content, email, photo }) => { return { name: username, social: email, img: photo, review: content } })
      } height="50vh" margin="10vh 0"></Testimonial2>}

    </div>
  );
}