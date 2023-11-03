import { Link } from "react-router-dom"
import "../sass/home.scss"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getAllProducts } from "../Redux/Actions/productActions"

export const Home = () => {
  
  const {products} = useSelector(State => State.product);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAllProducts());
  },[])
  return (
    <main>
      <section>
        <div className="home-top">
          <div className="text">
          <h1>Shopping And Department Store</h1>
          <p>Shopping is a bit of relaxing hobby for me, which is somethimes troubling for the bank balance.</p>
          <Link to={"/sale"}><button>Buy Now</button></Link>
          </div>
        </div>
      </section>

    </main>
  )
}

