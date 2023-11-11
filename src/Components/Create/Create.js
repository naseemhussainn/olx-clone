import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { getStorage,ref,uploadBytes,getDownloadURL } from "firebase/storage";
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { addDoc,collection } from 'firebase/firestore';
const Create = () => {
  const [productName,setProductName] = useState('')
  const [productCategory,setProductCategory] = useState('')
  const [productPrice,setProductPrice] = useState()
  const [productImage,setproductImage] = useState(null)
  const navigate =useNavigate()
 const  {user} = useContext(AuthContext)
 const  {OLXdb} = useContext(FirebaseContext)
 const date = new Date()
  const handleSubmitUpload = () =>{
    if (user !== null){
      const storage = getStorage();
      const storageRef = ref(storage, `/image/${productImage.name}`);
      const numericPrice = parseFloat(productPrice);
      uploadBytes(storageRef,productImage).then((snapshot) => {
        getDownloadURL(storageRef).then((url) => {
          const collectionRef = collection(OLXdb, 'products');
          const ProductToAdd ={
            productName,
            productCategory,
            productPrice : numericPrice,
            url,
            userID:user.uid,
            createdAT:date.toDateString()
          }
          addDoc(collectionRef,ProductToAdd)
          .then((docRef) => {
              console.log('product added with id',docRef);
              navigate('/')
          })
          .catch((error) => {
            console.error('Error getting documents: ', error);
          })
          .finally(() => {
            alert("Product Added");
          });
        }).catch((urlError) => {
          console.error('Error getting download URL:', urlError);
        });
      })
      .catch((error) => {
        console.error('Upload error:', error);
      });

    }else{
      alert('please login')
    }

  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="Pname"
              name="Name"
              required
              value={productName}
              onChange={(e)=>{
                  setProductName(e.target.value);
              }}
            />
            <br />
            <label htmlFor="Pcategory">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="Pcategory"
              name="category"
              required
              value = {productCategory}
              onChange={(e)=>{
                setProductCategory(e.target.value);
              }}
            />
            <br />
            <label htmlFor="Pprice">Price</label>
            <br />
            <input 
            className="input" 
            type="number" 
            id="Pprice" 
            name="Price"
            required
            value={productPrice}
            onChange={(e)=>{
              setProductPrice(e.target.value);
            }}
            />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={productImage ? URL.createObjectURL(productImage):''}></img>
            <br />
            <input type="file"
            onChange={(e)=>{
              setproductImage(e.target.files[0])
            }}
            />
            <br />
            <button onClick={handleSubmitUpload} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
