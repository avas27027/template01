import React from "react";
import { Link } from "react-router-dom";
import { usepublicBlog, publicBlogsInterfaceF } from "../queries/PublicBlogsHook";
export default function BlogIndexLayout() {
  const data = usepublicBlog() as Array<publicBlogsInterfaceF>
  const ar = [
    {
      id: 1,
      title: "The importance of color",
      date: "15 de febrero",
      picture:
        "https://media.istockphoto.com/id/1175781029/vector/gray-linear-abstract-background-for-your-design-vector.jpg?s=1024x1024&w=is&k=20&c=g2V6sGnFuvo0hT-CDp2UKjIqCw_yEh1ebSc9dhZupsg=",
    },
    {
      id: 2,
      title: "The importance of color",
      date: "15 de febrero",
      picture:
        "https://media.istockphoto.com/id/1175781029/vector/gray-linear-abstract-background-for-your-design-vector.jpg?s=1024x1024&w=is&k=20&c=g2V6sGnFuvo0hT-CDp2UKjIqCw_yEh1ebSc9dhZupsg=",
    },
    {
      id: 3,
      title: "The importance of color",
      date: "15 de febrero",
      picture:
        "https://media.istockphoto.com/id/1175781029/vector/gray-linear-abstract-background-for-your-design-vector.jpg?s=1024x1024&w=is&k=20&c=g2V6sGnFuvo0hT-CDp2UKjIqCw_yEh1ebSc9dhZupsg=",
    },
  ];
  return (
    <div className="blogs__entries">
      <h1>Blog</h1>
      <div className="blogs__entries-container">
        {data.map((b, index) => {
          let date = new Date(b.date).toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' });
          return (
            <div key={"blog-" + index} className="blog__entry">
              <Link to={`/blog/${b.id}`}>
                <img src={b.picture} alt="" />
                <div className="blog__entry-desc">
                  <h3>{b.title}</h3>
                  <p>{date}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
