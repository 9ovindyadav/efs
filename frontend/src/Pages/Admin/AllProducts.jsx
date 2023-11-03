import { Sidebar } from "./Dashboard"
import "../../sass/adminAllproducts.scss"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../Redux/Actions/productActions";

export const AllProducts = () => {

  const {products, nHits} = useSelector(State => State.product)
  const dispatch = useDispatch();

  useEffect(() => {
     dispatch(getAllProducts());
  },[])
  return (
    <div className="dashboard">
      <div className="content">
        <h1>All Products</h1>
        
        <table>
    <thead>
      <tr>
        <th>Photo</th>
        <th>Name</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      
      {
        products?.map((product)=>(
            <tr key={product._id}>
        <td><img src={product.images[0].url} alt={product.name} /></td>
        <td><p>{product.name}</p></td>
        <td>
          <button>Edit</button>
          <button>Delete</button>
        </td>
      </tr>
        ))
      }
    
    </tbody>
  </table>

      </div>
      <Sidebar />
    </div>
  )
}