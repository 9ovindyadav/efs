import { useEffect, useState } from "react"
import { Sidebar } from "./Dashboard";
import {useDispatch, useSelector} from "react-redux";
import "../../sass/newProduct.scss"
import { createProduct } from "../../Redux/Actions/productActions";
import { toast } from "react-hot-toast";


export const NewProduct = () => {

  const [name,setName] = useState("");
  const [images,setImages] = useState([]);
  const [imagesPriview,setImagesPriview] = useState([]);

  const dispatch = useDispatch();

  const createProductSubmitHandler = (e) => {
     e.preventDefault();

     const myForm = {name,images}

     dispatch(createProduct(myForm));
  }

  const createProductImagesChange = (e) => {
       const files = Array.from(e.target.files);

       setImages([]);
       setImagesPriview([]);

       files.forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          if(reader.readyState === 2){
            setImagesPriview((old)=> [...old, reader.result]);
            setImages((old) => [...old, reader.result]);
          }
        }

        reader.readAsDataURL(file);
       })
  }

  const {message, error, loading} = useSelector((State)=>State.product)

  useEffect(()=>{
    if(message){
      toast.success(message);
      dispatch({type:"clearMessage"})
    }
    if(error){
      toast.error(error);
      dispatch({type:"clearError"})
    }
  },[loading,message,error])

  return (
    <div className="dashboard">
      <div className="content">
       <div className="newProductContainer">
        <form enctype="multipart/form-data" onSubmit={createProductSubmitHandler}>
           <h1>Upload image</h1>
            <div>
             <input 
               type="text" 
               placeholder="Product name" 
               required 
               value={name} 
               name="name"
               onChange={(e)=>setName(e.target.value)}
               />
            </div>

            <div id="createProductFormFile">
              <input 
                type="file" 
                name="avatar" 
                accept="image/*" 
                multiple onChange={createProductImagesChange}
              />
            </div>

            <div id="createProductFormImage">
              {
                imagesPriview.map((image, index) => (
                  <img src={image} key={index} alt="Product Priview" />
                ))
              }
            </div>

            <button 
              type="submit" 
              id="createProductBtn"
            >Upload</button>

        </form>
       </div>
      </div>
      <Sidebar />
    </div>
  )
}