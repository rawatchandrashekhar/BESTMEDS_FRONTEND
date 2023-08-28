import React, { useState, useEffect, createRef } from 'react';
import { getData, postData, ServerURL } from '../FetchNodeServices';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';
import { Grid,Button } from '@mui/material';
import Slider from "react-slick";
import { Divider } from '@material-ui/core';
import Header from "./Header"
import Footer from "./Footer"
import "./home.css"
import ShoppingCartComponent from './ShoppingCartComponent';
import Paper from '@mui/material/Paper';
import {useDispatch} from "react-redux"
import { useLocation } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const useStyles = makeStyles({
    root: {
        
        alignItems: "center",
        justifyContent: "center",
        paddingTop:70
    },
    subdiv: {
        padding: 15,
        margin: 10,
    },
    productsSubdiv: {
        padding: 15,
        width: 250,
        height: 350,
        border: "0.5px solid #95a5a6",
        borderRadius: 5,
        margin: 10,
    }
});

var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    arrows: false,
    autoplay: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 3000
};

export default function ProductView() {
 
    const classes = useStyles();
    
    var dispatch=useDispatch()

    var location=useLocation()
    var product=location.state.product
    
    const [refresh,setRefresh]=useState(false)
    const [productImages,setProductImages]=useState([])
    const [image,setImage]=useState(product.icon)
    
    var productImagesSlider = createRef()

    const handleQtyChange=(value,product)=>{
        product['qty']=value
         if(value>0){
             dispatch({type:"ADD_ITEM",payload:[product.productid,product]})
         }else{
            dispatch({type:"REMOVE_ITEM",payload:[product.productid]})
         }
         setRefresh(!refresh)
    }

    const fetchAllProductImages=async()=>{
        var body={productid:product.productid}
        var result=await postData("products/fetchproductmoreimages",body)
        if(result.data){
        setProductImages(result.data)
        }
    }

    useEffect(function(){
        fetchAllProductImages()
    },[])

    const handleChangeImage=(pic)=>{
       setImage(pic)
    }

    const showProductImages = () => {
        return productImages.map((item, index) => {
            return (
                <div>
                    <div style={{cursor:"pointer",display:"flex",justifyContent:"center",alignItems:"center"}}  >
                        
                            <img onMouseEnter={()=>handleChangeImage(item.images)} src={`${ServerURL}/images/${item.images}`} style={{ width: 60, height: 60,border:"4px solid #f1f1f1",padding:10,borderRadius:5 }} />
                        
                    </div>
                </div>
            )
        })
    }

    return(
        <div>
            <Header style={{width:"100%"}} />
        <div className={classes.root}>
              <div className={classes.subdiv}>
                   <Grid container spacing={2}>
                     <Grid item xs={6} style={{display:"flex",flexDirection:"column",width:"40%"}}>
                        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}><img src={`${ServerURL}/images/${image}`} style={{width:"60%"}} /></div>
                      
                        <div style={{ display: "flex", justifyContent: "center",alignItems:"center",marginTop:25}}>
                <div style={{ display: "flex", alingItems: "center", justifyContent: "center"}}>
                    <ArrowBackIos onClick={() => productImagesSlider.current.slickPrev()} style={{ fontSize: 25, color: "#6f7284", cursor: "pointer" }} />
                </div>
                <div style={{width:500}} >
                    <Slider {...settings} ref={productImagesSlider}>
                        {showProductImages()}
                    </Slider>
                </div>
                <div style={{ display: "flex", alingItems: "center", justifyContent: "center" }}>
                    <ArrowForwardIos onClick={() => productImagesSlider.current.slickNext()} style={{ fontSize: 25, color: "#6f7284", cursor: "pointer" }} />
                </div>
            </div>
       
                     </Grid>
                     <Grid item xs={6} style={{width:"60%"}}>
                          <div style={{fontSize:30,fontWeight:"bold"}}>{product.productname}</div>
                          <div style={{fontSize:20,color:"#6f7284" }}>{product.categoryname} {product.subcategoryname}</div>
                          <div style={{paddingTop:20,paddingBottom:20}}><Divider/></div>
                          {product.offerprice>0?<div style={{display:"flex",flexDirection:"column"}}><div style={{display:"flex",alignItems:"center"}}><div style={{fontSize:23,fontWeight:"bold",color:"#6f7284"}}>Best Price*</div><div style={{fontSize:35,fontWeight:"bold",color:"#ef4281"}}> &nbsp;&#8377; {(product.offerprice).toFixed(2)}</div></div> <div style={{display:"flex", alignItems:"center",paddingTop:5,paddingBottom:5}}><div style={{color:"#6f7284",fontWeight:500}}>MRP <s>&#8377; {(product.price).toFixed(2)}</s></div>
                            <div style={{color:"green",fontWeight:"bold"}}>&nbsp;GET {((product.price-product.offerprice)/product.price*100).toFixed(2)}% OFF</div></div>
                            </div>:<div style={{display:"flex",alignItems:"center",paddingBottom:10}}><div style={{fontSize:23,fontWeight:"bold",color:"#6f7284"}}>Best Price*</div><div style={{fontSize:35,fontWeight:"bold",color:"#ef4281"}}> &nbsp;&#8377; {(product.price).toFixed(2)}</div></div>}
                          <div style={{fontSize:16,color:"#6f7284"}}>
                              <div style={{paddingBottom:5}}>(Inclusive of all taxes)</div>
                              <div>* Country of Origin: India</div>
                              <div>* Delivery charges if applicable will be applied at checkout</div>
                          </div>
                          <div style={{width:"30%",marginTop:40,marginBottom:30}}><ShoppingCartComponent value={0} onChange={(value)=>handleQtyChange(value,product)} /></div>
                          <div><Divider/></div>
                     </Grid>
                     <Grid item xs={12} style={{padding:60}}>
                        <div style={{fontSize:30,fontWeight:"bold"}}>Description</div>
                        <div style={{fontSize:20,color:"#6f7284",paddingTop:5}}>{product.description}</div>
                     </Grid>
                   </Grid>
              </div>
        </div>
            <Footer />
        </div>
    )
}