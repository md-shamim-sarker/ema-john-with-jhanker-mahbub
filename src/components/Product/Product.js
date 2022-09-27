import {faCartShopping} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import './Product.css';

const Product = ({handleAddToCart, product}) => {

    const {img, name, seller, price, ratings} = product;

    return (
        <div className='product'>
            <div className='product-info'>
                <img src={img} alt="product_img" />
                <h3>{name}</h3>
                <h4>Price: ${price}</h4>
            </div>
            <div className='card-btn'>
                <p>Seller: {seller} <br />
                    Ratings: {ratings}</p>
                <button onClick={() => handleAddToCart(product)}>
                    <span>Add to Cart</span>
                    <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
                </button>
            </div>
        </div>
    );
};

export default Product;