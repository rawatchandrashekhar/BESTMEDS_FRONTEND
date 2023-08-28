import React, { useState, useEffect, createRef } from 'react';
import { getData, postData, ServerURL } from '../FetchNodeServices';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import Slider from "react-slick";
import { Divider } from '@material-ui/core';
import { Button } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import Header from "./Header"
import Footer from "./Footer"
import "./home.css"
import ShoppingCartComponent from './ShoppingCartComponent';
import Paper from '@mui/material/Paper';
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from "@mui/material/styles"
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
    root: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        background: "#ecf0f1",
    },
    subdiv: {
        width: "80%",
        paddingTop: 60,
        paddingBottom: 40,
    },
    rootNoItem: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        background: "#fff",
    },
    subdivNoItem: {
        width: "80%",
        paddingTop: 60,
        paddingBottom: 40,
    },
});

var bannersettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000
};

export default function OrderSummary(props) {

    const classes = useStyles();
    const [bannerList, setBannerList] = useState([])
    const [refresh, setRefresh] = useState(false)

    var month = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"]
    var date = new Date()
    var deliveryDate = new Date()
    deliveryDate.setDate(date.getDate() + 3)

    var navigate = useNavigate()

    var products = useSelector(state => state.cart)
    var keys = Object.keys(products).length
    var productsList = Object.values(products)

    var dispatch = useDispatch()

    var totalamount = productsList.reduce(calculatetotal, 0)
    function calculatetotal(p, n) {
        return (p + (n.price * n.qty))
    }

    var offeramount = productsList.reduce(calculateoffer, 0)
    function calculateoffer(p, n) {
        return (p + (n.offerprice * n.qty))
    }

    const handleQtyChange = (value, item) => {
        item['qty'] = value
        if (value > 0) {
            dispatch({ type: "ADD_ITEM", payload: [item.productid, item] })
        } else {
            dispatch({ type: "REMOVE_ITEM", payload: [item.productid] })
        }
        setRefresh(!refresh)
    }

    const showCartItems = () => {
        return productsList.map((item, index) => {
            return (
                <>
                    <div style={{ display: "flex" }}>
                        <div style={{ paddingLeft: 20, paddingRight: 25 }}><img src={`${ServerURL}/images/${item.icon}`} width={40} /></div>
                        <div>
                            <div style={{ fontSize: 20 }}>{item.productname}</div>
                            <div style={{ color: "#378f30", fontWeight: 500 }}>Only {item.stock} Left In Stock</div>
                            <div style={{ color: "rgba(21,27,57,.6)", fontStyle: "italic" }}>Mfr: {item.brandname}</div>
                        </div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ width: "100%", paddingLeft: 85, paddingTop: 40, fontSize: 14, fontWeight: 400, color: "#000" }}>&#8377; {item.offerprice > 0 ? (item.offerprice).toFixed(2) : (item.price * item.qty).toFixed(2)} x {item.qty}</div>
                            <div style={{ width: "100%", paddingLeft: 85, paddingTop: 5, fontSize: 20, fontWeight: 500, color: "#ef4281" }}>&#8377; {item.offerprice > 0 ? ((item.offerprice) * item.qty).toFixed(2) : (item.price * item.qty).toFixed(2)}</div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 40, fontSize: 20, width: "100%", paddingRight: 20 }}><ShoppingCartComponent value={item.qty} onChange={(value) => handleQtyChange(value, item)} /></div>
                    </div>
                    <div style={{ paddingLeft: 85, paddingTop: 40, paddingBottom: 20 }}>
                        Delivery between {month[date.getMonth()]} {date.getDate()} - {month[deliveryDate.getMonth()]} {deliveryDate.getDate()}
                    </div>
                    <div style={{ paddingBottom: 10, display: "flex", justifyContent: "center" }}>
                        <Divider style={{ width: "90%" }} />
                    </div>
                </>
            )
        })
    }

    const fetchAllBanners = async () => {
        var result = await getData("banner/displayallbanner")
        setBannerList(result.data)
    }

    useEffect(function () {
        fetchAllBanners()
    }, [])

    const showBanners = () => {
        return bannerList.map((item, index) => {
            return (
                <div>
                    <div>
                        <img src={`${ServerURL}/images/${item.bannerpicture}`} width="100%" style={{ borderRadius: 10 }} />
                    </div>
                </div>
            )
        })
    }

    return (
        <>
            <Header style={{ width: "100%" }} />
            {keys > 0 ?
            <div className={classes.root}>
                <div className={classes.subdiv}>
                        <Grid container spacing={2} style={{ display: "flex", justifyContent: "center" }}>
                            <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start", fontSize: 30, fontWeight: "bold", letterSpacing: 1, paddingBottom: 30, paddingLeft: 52 }}>Order Summary</Grid>
                            <Grid item xs={7}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center", paddingBottom: 20 }}>
                                    <div style={{ width: '100%' }}>
                                        <Slider {...bannersettings}  >
                                            {showBanners()}
                                        </Slider>
                                    </div>
                                </div>
                                <div style={{ background: "#fff", borderRadius: 10 }}>
                                    <div style={{ color: "rgba(21,27,57,.6)", fontSize: 18, letterSpacing: 2, padding: 25, fontWeight: 500 }}>Products</div>
                                    {showCartItems()}
                                </div>
                            </Grid>
                            <Grid item xs={4} style={{ marginLeft: 20, height: "0%", position: "-webkit-sticky", position: "sticky", top: 70 }}>
                                <div style={{ background: "#fff", borderRadius: 10 }}>
                                    <div style={{ color: "rgba(21,27,57,.6)", fontSize: 18, letterSpacing: 2, padding: 20, fontWeight: 500 }}>PAYMENT DETAILS</div>
                                    <div style={{ display: "flex" }}><div style={{ width: "100%", fontSize: 18, color: "#151b39", fontWeight: 500, paddingLeft: 20 }}>MRP Total</div><div style={{ color: "#151b39", fontWeight: 500, display: "flex", justifyContent: "flex-end", fontSize: 18, width: "100%", paddingRight: 20 }}>&#8377; {totalamount}</div></div>
                                    <div style={{ display: "flex", paddingTop: 20 }}><div style={{ width: "100%", fontSize: 18, color: "#151b39", fontWeight: "bold", paddingLeft: 20 }}>Offer Amount</div><div style={{ color: "#151b39", fontWeight: "bold", display: "flex", justifyContent: "flex-end", fontSize: 18, width: "100%", paddingRight: 20 }}>&#8377; {(offeramount).toFixed(2)}</div></div>
                                    <div style={{ display: "flex", paddingTop: 20 }}><div style={{ width: "100%", fontSize: 18, color: "green", fontWeight: "bold", paddingLeft: 20 }}>You Saved</div><div style={{ color: "green", fontWeight: "bold", display: "flex", justifyContent: "flex-end", fontSize: 18, width: "100%", paddingRight: 20 }}>&#8377; {(totalamount - offeramount).toFixed(2)}</div></div>
                                    <div style={{ display: "flex", paddingTop: 20 }}><div style={{ width: "100%", fontSize: 18, color: "#151b39", fontWeight: "bold", paddingLeft: 20 }}>AMOUNT TO PAY*</div><div style={{ color: "#151b39", fontWeight: "bold", display: "flex", justifyContent: "flex-end", fontSize: 18, width: "100%", paddingRight: 20 }}>&#8377; {(offeramount).toFixed(2)}</div></div>
                                    <div onClick={()=>navigate("/signin")} style={{ padding: 20 }}><Button variant="contained" style={{ color: "#fff", background: "#000", fontWeight: "bold", width: "40%" }}>PROCEED</Button></div>
                                </div>
                                <div style={{ textAlign: "left", color: "rgba(21,27,57,.6)", padding: 10 }}>
                                    Bestmeds is a technology platform to facilitate transaction of business. The products and services are offered for sale by the sellers. The user authorizes the delivery personnel to be his agent for delivery of the goods. For details read Terms & Conditions
                                </div>
                            </Grid>
                        </Grid>
                       
                </div>
            </div> : 
            <div className={classes.rootNoItem}>
                <div className={classes.subdivNoItem}>
            <Grid container spacing={2} style={{paddingTop:50}}>

                <Grid item xs={12} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img src="/emptycart.svg" width="25%" />
                </Grid>
                <Grid item xs={12} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div style={{fontSize:17,fontWeight:500}}>Your Cart is empty!</div>
                </Grid>
                <Grid item xs={12} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div style={{color:"rgba(21,27,57,.6)",width:"25%",textAlign:"center"}}>You have no items added in the cart.
                        Explore and add products you like!</div>
                </Grid>
                <Grid item xs={12} style={{ display: "flex", justifyContent: "center", alignItems: "center",marginTop:15}}>
                    <Button onClick={()=>navigate("/home")} fullWidth variant="contained" style={{ color: "#fff", background: "#000", fontWeight: "bold",width:"30%",padding:12,fontSize:17 }}>ADD PRODUCTS</Button>
                </Grid>

            </Grid>
        </div>
        </div>}
            <Footer />
        </>
    )

}