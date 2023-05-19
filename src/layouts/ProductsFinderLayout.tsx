import { useParams } from 'react-router-dom';
import ProductCard from '../components/paterns/ProductCard';
import LeftFilterBar from '../components/interactive/LeftFilterBar';
import { useState } from 'react';

export default function ProductsFinderLayout() {
    const params = useParams()
    const data = [
        {
            name: "Vestido DG", price: "39", color: "blanco", link: "/",
            picture: "https://i.pinimg.com/originals/db/fb/f4/dbfbf4f38cb0fd9ffed852a42e683917.jpg"
        },
        {
            name: "Vestido DG", price: "39", color: "blanco", link: "/",
            picture: "https://i.pinimg.com/originals/db/fb/f4/dbfbf4f38cb0fd9ffed852a42e683917.jpg"
        },
        {
            name: "Vestido DG", price: "39", color: "blanco", link: "/",
            picture: "https://i.pinimg.com/originals/db/fb/f4/dbfbf4f38cb0fd9ffed852a42e683917.jpg"
        },
        {
            name: "Vestido DG", price: "39", color: "blanco", link: "/",
            picture: "https://i.pinimg.com/originals/db/fb/f4/dbfbf4f38cb0fd9ffed852a42e683917.jpg"
        }
    ]
    const colors = ["white", "black", "violet", "red", "blue", "brown"]
    const sizes = ["XS", "S", "M", "L", "XL"]
    const [selectedColors, setSelectedColors] = useState<Array<string>>([])
    const [selectedSizes, setSelectedSizes] = useState<Array<string>>([])
    const filters = [
        { "title": "Colores", "boxes": colors, "dispach": setSelectedColors },
        { "title": "Sizes", "boxes": sizes, "dispach": setSelectedSizes }]
    return (
        <div className='productFinderLayout'>
            <LeftFilterBar category={params.category} subcategory={params.subcategory}
                checkboxFilters={filters}
            ></LeftFilterBar>
            <div className="productFinderLayout-container">
                <div className="productFinderLayout-searchContainer">
                    <input type="text" name='pFinderInput' placeholder='Inicia tu busqueda' />
                    <button>Buscar</button>
                </div>
                <div className="productFinderLayout-productBox">
                    {data.map((b, index) => {
                        return (
                            <ProductCard key={"p-" + index} width='100%' height='100%' data={b} />
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
