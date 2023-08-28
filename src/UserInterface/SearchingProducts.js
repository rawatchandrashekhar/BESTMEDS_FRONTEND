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

export default function searchingProducts() {

    const classes = useStyles();
    const [productListByName,setProductListByName]=useState([])

    const fetchAllProductsByName=async()=>{
        var result=await getData("products/searchproducts")
        setProductListByName(result.data)
    }

    useEffect(function(){
        fetchAllProductsByName()
    },[])

    const searching=()=>{
        return productListByName.map((item)=>{
            return item.icon
        })
    }

    return(
     <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
               {searching()}         
     </div>
    )

}