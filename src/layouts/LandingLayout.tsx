import Features from "../components/sections/Features";
import Header from "../components/sections/Header";
import FAQ from "../components/sections/FAQ";
import SlideShow from "../components/interactive/SlideShow";
import Carousel from "../components/interactive/Carousel";
import Testimonial1 from "../components/sections/Testimonial1";
import Card from "../components/paterns/Card";
import Testimonial2 from "../components/sections/Testimonial2";


export default function LandingLayout() {

  const ar = [
    {
      img: "/low-poly-grid-haikei.svg",
      title: "Fast",
      desc: "You've never made a website this fast before.",
    },
    {
      img: "/low-poly-grid-haikei.svg",
      title: "Easy",
      desc: "Works like the canvas tools you're familiar with.",
    },
    {
      img: "/low-poly-grid-haikei.svg",
      title: "Simple",
      desc: "Works like this was really simple to work with.",
    },
  ];

  const faq = [
    {
      title: "What is this web",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iureeius optio voluptas ducimus dicta maiores eveniet aperiam sequiquasi tempore?",
    },
    {
      title: "Is this a easy web",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iureeius optio voluptas ducimus dicta maiores eveniet aperiam sequiquasi tempore?",
    },
  ];
  const slides = [
    <img
      src="https://media.istockphoto.com/id/1175781029/vector/gray-linear-abstract-background-for-your-design-vector.jpg?s=1024x1024&w=is&k=20&c=g2V6sGnFuvo0hT-CDp2UKjIqCw_yEh1ebSc9dhZupsg="
      alt=""
      height={"100%"}
      width={"100%"}
      style={{ objectFit: "cover" }}
    />,
    <img
      src="https://static.vecteezy.com/system/resources/thumbnails/007/063/643/small/abstract-gradient-futuristic-linear-background-design-technology-big-data-science-template-free-vector.jpg"
      alt=""
      height={"100%"}
      width={"100%"}
      style={{ objectFit: "cover" }}
    />,
    <img
      src="https://www.shutterstock.com/image-vector/background-outlines-blending-multicolor-abstract-260nw-679544332.jpg"
      alt=""
      height={"100%"}
      width={"100%"}
      style={{ objectFit: "cover" }}
    />,
    <img
      src="https://png.pngtree.com/thumb_back/fh260/background/20200709/pngtree-elegant-blue-abstract-wavy-lines-curves-on-the-blue-background-linear-image_351267.jpg"
      alt=""
      height={"100%"}
      width={"100%"}
      style={{ objectFit: "cover" }}
    />,
    <img
      src="https://img.freepik.com/free-vector/watercolor-stains-abstract-background_23-2149107181.jpg?w=2000"
      alt=""
      height={"100%"}
      width={"100%"}
      style={{ objectFit: "cover" }}
    />,
  ];
  const testi = [
    {
      name: "Kayla Ray",
      social: "@kayray",
      img: "https://img.freepik.com/free-vector/watercolor-stains-abstract-background_23-2149107181.jpg?w=2000",
      review:
        "Thank you for building such an empowering tool, especially for designers! The site went from Figma to Framer in less than a week.",
    },
    {
      name: "Kayla Ray",
      social: "@kayray",
      img: "https://img.freepik.com/free-vector/watercolor-stains-abstract-background_23-2149107181.jpg?w=2000",
      review:
        "Thank you for building such an empowering tool, especially for designers! The site went from Figma to Framer in less than a week.",
    },
  ];
  const testi2 = [
    {
      name: "Kayla Ray",
      social: "@kayray",
      img: "https://img.freepik.com/free-vector/watercolor-stains-abstract-background_23-2149107181.jpg?w=2000",
      review:
        "Thank you for building such an empowering tool, especially for designers! The site went from Figma to Framer in less than a week.",
    },
    {
      name: "Kayla Ray",
      social: "@kayray",
      img: "https://img.freepik.com/free-vector/watercolor-stains-abstract-background_23-2149107181.jpg?w=2000",
      review:
        "Thank you for building such an empowering tool, especially for designers! The site went from Figma to Framer in less than a week.",
    },
    {
      name: "Kayla Ray",
      social: "@kayray",
      img: "https://img.freepik.com/free-vector/watercolor-stains-abstract-background_23-2149107181.jpg?w=2000",
      review:
        "Thank you for building such an empowering tool, especially for designers! The site went from Figma to Framer in less than a week.",
    },
  ];
  return (
    <div className="landingLayout">
      <Header minHeight="90svh" margin="10svh 0 0 0"></Header>
      <Features features={ar}></Features>
      <FAQ faqs={faq} margin="20vh 0"></FAQ>
      <SlideShow
        slides={[
          <Testimonial2 data={testi2} height="40vh"></Testimonial2>,
          <Testimonial2 data={testi2} height="40vh"></Testimonial2>,
          <Testimonial2 data={testi2} height="40vh"></Testimonial2>,
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

      <Testimonial2 data={testi2} height="50vh" margin="10vh 0"></Testimonial2>
    </div>
  );
}
