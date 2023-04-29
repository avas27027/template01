import React from "react";
import { Link } from "react-router-dom";
import { usepublicBlog } from "../queries/PublicBlogsHook";
export default function BlogIndexLayout() {
  const data= usepublicBlog()!
  
  return (
    <div className="blogs__entries">
      <h1>Blog</h1>
      <div className="blogs__entries-container">
        {data.map((b, index) => {
          return (
            <div key={"blog-" + index} className="blog__entry">
              <Link to={`/blog/${b.id}`}>
                <img src={b.picture} alt="" />
                <div className="blog__entry-desc">
                  <h3>{b.title}</h3>
                  <p>{b.date}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
