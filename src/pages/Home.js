import React from 'react'
import Footer from '../features/footer.js/Footer'
import Navbar from '../features/navbar/Navbar'
import ProductList from '../features/product/components/ProductList'

const Home = () => {
  return (
    <div>
        <Navbar>
            <ProductList />
        </Navbar>
        <Footer />
    </div>
  )
}

export default Home