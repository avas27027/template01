import React from 'react'
import { useParams } from 'react-router-dom';

export default function BlogSection() {
  const params = useParams();
  return (
    <div>{params.id}</div>
  )
}
