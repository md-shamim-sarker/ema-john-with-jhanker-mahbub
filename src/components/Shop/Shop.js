import React, {useEffect, useState} from 'react';
import Swal from 'sweetalert2';
import {addToDb, getStoredCart} from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // console.log('01. Before Fetch.');
        fetch('./products.json')
            .then(res => res.json())
            .then(res => {
                setProducts(res);
                // console.log('02. Data Loaded.');
            })
            .catch(err => console.error(err));
    }, []);

    //Get data from local storage
    useEffect(() => {
        // console.log('03. Start Local Storage');
        const storedCart = getStoredCart();
        // console.log(storedCart);
        const savedCart = [];
        for(const id in storedCart) {
            const addedProduct = products.find(product => product.id === id);
            if(addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
        }
        setCart(savedCart);
        // console.log('04. End Local Storage');
    }, [products]);

    const handleAddToCart = (selectedProduct) => { // very very important
        Swal.fire(
            'Good job!',
            'You add an item to cart!',
            'success'
        );
        let newCart = [];
        const exists = cart.find(product => product.id === selectedProduct.id);
        if(!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        } else {
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        setCart(newCart);

        addToDb(selectedProduct.id); // store to localStorage
    };

    return (
        <div className='shop'>
            <div className='left'>
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div>
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;