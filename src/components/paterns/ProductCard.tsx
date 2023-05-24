import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard(props: {
    data: { name: string, price: string, color: string, size: string, subcategory: string, picture: string, link: string },
    width?: string, height?: string
}) {
    return (
        <div className='productCard' style={props}>
            <Link to={props.data.link}>
                <div className="productCard-picture">
                    <img src={props.data.picture} alt="" />
                </div>
                <div className="productCard-content">
                    <div className="productCard-content-basics">
                        <h3>{props.data.name}</h3>
                        <p className="productCard-price">{props.data.price}</p>
                    </div>

                    <p>{props.data.color}</p>
                    <p>{props.data.size}</p>
                    <p>{props.data.subcategory}</p>
                </div>
            </Link>
        </div>
    )
}
