import React from 'react'
import { useParams } from 'react-router-dom';
import { Marked } from '@ts-stack/markdown';
import FetchStrapi from '../../queries/fetchStrapi/FetchStrapi';

export default function BlogSection(props: { margin?: string }) {
  const params = useParams();
  const data = new FetchStrapi().useUrlPublicBlog(params.id!)
  const text = data.isLoading ? "" : Marked.parse(data.data!.text)
  let date = data.isLoading ? "" : new Date(data.data!.updatedAt).toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className='blogSection' style={props}>
      <h1>{!data.isLoading && data.data!.title}</h1>
      {!data.isLoading && <img src={data.data!.picture} alt="imagen blog" />}
      <p className='blogSection-text' dangerouslySetInnerHTML={{ __html: text }}></p>
      <p className='blogSection-date'>{date}</p>

    </div>
  )
}
