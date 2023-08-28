import React, { useState, useEffect, createRef } from 'react';
import { getData, postData, ServerURL } from '../FetchNodeServices';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';
import Slider from "react-slick";
import { Divider } from '@material-ui/core';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import Header from "./Header"
import Footer from "./Footer"
import "./home.css"
import ShoppingCartComponent from './ShoppingCartComponent';
import Paper from '@mui/material/Paper';
import {useDispatch} from "react-redux"
import {useNavigate,useLocation} from "react-router-dom"

const useStyles = makeStyles({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    subdiv: {
        padding: 15,
        width: 250,
        height: 300,
        border: "0.5px solid #95a5a6",
        borderRadius: 5,
        margin: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    divPaperBrand: {
        margin:10,
        padding:10,
        border: "0.5px solid #95a5a6",
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplaySpeed: 3000
};

var bannersettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000
};

export default function Home(props) {

    const classes = useStyles();
    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [bannerList, setBannerList] = useState([])
    const [brandList, setBrandList] = useState([])
    const [productList, setProductList] = useState([])
    const [refresh,setRefresh]=useState(false)

    var categorySlider = createRef()
    var brandSlider = createRef()
    var dispatch=useDispatch()

    var navigation=useNavigate()
    console.log("NAVIGATION",navigation)
    var location=useLocation()
    console.log("LOCATION",location)

    const fetchAllCategories = async () => {
        var result = await getData("categories/displayallcategories")
        setCategoryList(result.data)
    }

    const fetchAllSubCategories = async (categoryid) => {
        var result = await postData("subcategories/displayallsubcategoriesbycategories", { categoryid: categoryid })
        setSubCategoryList(result.data)
    }
    const fetchAllBanners = async () => {
        var result = await getData("banner/displayallbanner")
        setBannerList(result.data)
    }

    const fetchAllTopBrands = async () => {
        var result = await getData("brands/displayalltopbrands", { status: "Top Brand" })
        setBrandList(result.data)
    }

    const fetchAllProducts = async () => {
        var result = await postData("products/displayallproductsbycategoryid",{categoryid:location.state.category.categoryid})
        setProductList(result.data)
    }

    useEffect(function () {
        fetchAllProducts()
    }, [])

    const showCategories = () => {
        return categoryList.map((item, index) => {
            return (
                <div>
                    <Paper elevation={3} className={classes.subdiv}>
                        <div className='hoverEffect'>
                            <img src={`${ServerURL}/images/${item.icon}`} style={{ width: 200, height: 200 }} />
                        </div>
                        <div style={{ fontFamily: "Yanone Kaffeesatz", fontSize: 25, paddingTop: 35 }}>
                            {item.categoryname}
                        </div>
                    </Paper>
                </div>
            )
        })
    }

    const handleQtyChange=(value,item)=>{
        item['qty']=value
         if(value>0){
             dispatch({type:"ADD_ITEM",payload:[item.productid,item]})
         }else{
            dispatch({type:"REMOVE_ITEM",payload:[item.productid]})
         }
         setRefresh(!refresh)
    }

    const showTrendingProducts = () => {
        return productList.map((item, index) => {
            return (
                <div>
                    <Paper elevation={3} className={classes.productsSubdiv}>
                        {item.offerprice>0?
                        <div style={{display:"flex",justifyContent:"flex-start", width:240,position:"absolute",zIndex:1}}>
                            <img src='/offer.png' style={{width:48}} />
                            <div style={{position:"absolute",top:'5px', color:"#fff",textAlign:"center",fontSize:16,left:'7.5px',fontWeight:"bold"}}>
                            {Math.floor((item.price-item.offerprice)/item.price*100)}%
                            <div style={{fontSize:12}}>off</div>
                            </div>
                        </div>:<></>}
                        <div onClick={()=>navigation("/productview",{state:{product:item}})} className='hoverEffect' style={{display:"flex",justifyContent:"center",alignItems:"center",paddingTop:25}}>
                            <img src={`${ServerURL}/images/${item.icon}`} style={{ width: 150, height: 150 ,padding:15}} />
                        </div>
                   
                        <div className='threeDots' style={{ fontFamily: "Roboto", fontSize: 20, paddingTop: 20 ,fontWeight:"bold"}}>
                            {item.productname}
                        </div>
                 
                        <div style={{ fontFamily: "Roboto", fontSize: 16,fontWeight:"bold",width:240}}>
                            {item.offerprice>0?<div style={{display:"flex",flexDirection:"column"}}><div style={{fontSize:20}}>Price: &#8377; {item.offerprice}  <s style={{color:"#ff4757",fontWeight:400,fontSize:16}}>&#8377; {item.price}</s> </div>
                            <div style={{color:"green"}}>You Save: &#8377; {item.price-item.offerprice}</div>
                            </div>:<div style={{fontSize:20}}>Price: &#8377; {item.price}<div style={{ fontSize: 16}}>&nbsp;</div></div>}
                        </div>
                        <div style={{marginTop:15}}>
                        <ShoppingCartComponent value={0} onChange={(value)=>handleQtyChange(value,item)} />
                        </div>
                    </Paper>
                </div>
            )
        })
    }

    return(<div>
                    <Header style={{ width: "100%" }} />
                    <div style={{ fontSize: 35, fontWeight: "bold", display: "flex", justifyContent: "center",paddingTop:30,paddingBottom:50 }}>
                {location.state.category.categoryname}
            </div>
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexWrap:"wrap"}}>
                        {showTrendingProducts()}
                    </div>
            <Footer />
    </div>)}