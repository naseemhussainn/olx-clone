import React, { useContext, useEffect, useState } from 'react';
import { collection,query,where,getDocs,doc,getDoc } from 'firebase/firestore';
import './View.css';
import { PostDetailsContext } from '../../store/PostContext';
import {  FirebaseContext } from '../../store/Context';
import { useParams } from 'react-router-dom';
function View() {
  const [UserDetails,setUserDetails] = useState([])
  const [productDATA,setProductDATA]= useState([])
  const {PostDetails} = useContext(PostDetailsContext)
 const {OLXdb}= useContext(FirebaseContext)


//  const { productDATA } = PostDetails;
 const { userID,productID } = useParams();
 useEffect(() => { 
      const  userIDget  = userID;
      const  productIDget  = productID;
      console.log(productIDget);

      const fetchUserData = async () => {
        const q1 = query(collection(OLXdb, "users"), where("id", "==", userIDget));
        try {
          const querySnapshot = await getDocs(q1);
          const userDetailsArray = [];

          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            userDetailsArray.push(doc.data());
          });

          setUserDetails(userDetailsArray);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      const fetchPRODUCTData = async () => {
        try {
          const docRef = doc(OLXdb, "products", productIDget); // Replace with the actual document ID
          const docSnapshot = await getDoc(docRef);
      
          if (docSnapshot.exists()) {
            // The document exists, and you can access its data
            const productData = docSnapshot.data();
            console.log(productData)
            setProductDATA(productData);
          } else {
            // The document does not exist
            console.log("Document not found.");
          }
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      };
      
      fetchPRODUCTData();      
      fetchUserData();
  },[OLXdb, userID, productID]);
  return (
    <div className="viewParentDiv">
          <div className="imageShowDiv">
            <img
              src={productDATA && productDATA.url}
              alt=""
            />
          </div>
      <div className="rightSection">
          {
            productDATA && (
            <div className="productDetails">
              <p>&#x20B9; {(productDATA.productPrice ? productDATA.productPrice.toLocaleString('en-IN') : '')} </p>
              <span>{productDATA.productName}</span>
              <p> {productDATA.productCategory}</p>
              <span>{productDATA.createdAT}</span>
            </div>
            )
          }
        {UserDetails&&(
          UserDetails.map((response)=>{
           return(
             <div className="contactDetails">
                 <p>Seller details</p>
                 <p>{response.username}</p>
                 <p>{response.phNo}</p>
             </div>
           )
             })
        )
        }

      </div>
    </div>
  );
}
export default View;
