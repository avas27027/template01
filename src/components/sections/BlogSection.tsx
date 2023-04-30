import React from 'react'
import { useParams } from 'react-router-dom';
import { usepublicBlog, publicBlogsInterfaceF } from '../../queries/PublicBlogsHook';
import { Marked } from '@ts-stack/markdown';

export default function BlogSection(props:{margin?:string}) {
  const params = useParams();
  const data = usepublicBlog(params.id) as publicBlogsInterfaceF
  const text = Marked.parse(data.text)
  let date = new Date(data.date).toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className='blogSection' style={props}>
      <h1>{data.title}</h1>
      {data.picture===""?null:<img src={data.picture} alt="imagen blog" />}
      <p className='blogSection-text' dangerouslySetInnerHTML={{ __html: text }}></p>
      <p className='blogSection-date'>{date}</p>

    </div>
  )
}
