import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FetchStrapi from "../queries/fetchStrapi/FetchStrapi";
import FetchMeilisearch from "../queries/fetchMeili/FetchMeilisearch";

export default function BlogIndexLayout() {
  //const data = new FetchStrapi().useAllPublicBlog
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
  const [inputVal, setInputVal] = useState("")
  const data = new FetchMeilisearch().usePublicBlogs(inputVal)
  return (
    <div className="blogIndexLayout">
      <div className="blogs__entries">
        <h1>Blog</h1>
        <div className="blogs__entries-search">
          <input type="text" onInput={(e) => { setInputVal(e.currentTarget.value) }} />
        </div>
        <div className="blogs__entries-container">
          {data?.map((b, index) => {
            let date = new Date(b.updatedAt).toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' });
            return (
              <div key={"blog-" + index} className="blog__entry">
                <Link to={`/blog/${b.slug}`}>
                  <img src={b.blogPicture} alt="" />
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
    </div>
  );
}
