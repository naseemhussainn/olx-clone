import React,{useEffect,useContext,useState} from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { collection,getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { PostDetailsContext } from '../../store/PostContext';

function Posts() {
  const {OLXdb} = useContext(FirebaseContext);
  const [products,setProducts] = useState([])
  const navigate =useNavigate()
  const {PostDetails,setPostDetails} = useContext(PostDetailsContext)
  useEffect(()=>{
    const collectionRef = collection(OLXdb, 'products');
    
    getDocs(collectionRef)
    .then((Snapshot) => {
      const posts = Snapshot.docs.map((product)=>{
        return{
          ...product.data(),
          id:product.id,
        } 
       })
       setProducts(posts);
      })
      .catch((error) => {
        console.error('Error getting documents: ', error);
      });
      
    },[])
    return (
      <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product)=>{
          const formattedDate = new Date(product.createdAT).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            });      
          const formattedAmount = (product.productPrice).toLocaleString('en-IN');
          return(
            <div className="card"                
              onClick={()=>{
                const userID = product.userID;
                const productID = product.id;
                setPostDetails(product);
                navigate(`/viewPost/${userID}/${productID}`);
              }}
            >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {formattedAmount}</p>
              <span className="kilometer">{product.productCategory}</span>
              <p className="name"> {product.productName}</p>
            </div>
            <div className="date">
              <span>{formattedDate}</span>
            </div>
          </div>
          )
          })}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {products.map((product)=>{
          const formattedDate = new Date(product.createdAT).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          });      
          const formattedAmount = (product.productPrice).toLocaleString('en-IN');
          return(
            <div className="card"                
              onClick={()=>{
                const userID = product.userID;
                const productID = product.id;
                navigate(`/viewPost/${userID}/${productID}`);
              }}
            >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {formattedAmount}</p>
              <span className="kilometer">{product.productCategory}</span>
              <p className="name"> {product.productName}</p>
            </div>
            <div className="date">
              <span>{formattedDate}</span>
            </div>
          </div>
          )
          })}
        </div>
      </div>
    </div>
  );
}

export default Posts;
