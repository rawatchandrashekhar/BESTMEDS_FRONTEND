import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Box, Button, Badge, Grid, TextField } from '@mui/material';
import { makeStyles } from "@material-ui/core"
import { getData, postDataImage, postData, ServerURL } from '../FetchNodeServices';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Divider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShoppingCartComponent from './ShoppingCartComponent';
import Header from "./Header"
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Footer from "./Footer"
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import axios from 'axios';
import { Style } from '@mui/icons-material';
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
  one: {

    padding: 20,
    width: '95%',
    marginTop: 10,
    background: '#fff',
    borderRadius: '8px',
    marginBottom:10,

  },
  two: {

    padding: 20,
    width: '100%',
    background: '#fff',
    height: 100,
    borderRadius: '20px',
    marginLeft: 20,

  },
  three: {
    borderRadius: '20px',
    padding: 20,
    marginTop: 20,
    width: '95%',
    background: '#fff',
    paddingLeft: 50,
    marginLeft: 20,
  },
  four: {
    textAlign: 'left',
    paddingLeft: 20,
    marginLeft: 20,
  },
});
var bannersettings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 1500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};
const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '1.5px solid #000',
      borderRadius: 0
    },
    '&:hover fieldset': {
      borderColor: '#000',

    },
    '&.Mui-focused fieldset': {
      borderColor: '#000',

    },

  },
});
let searchTimer;
export default function FinalOrderSummary(props) {
  const classes = useStyles();
  const u = useSelector(state=>state.user)
  var user=Object.values(u)[0]
  var month = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"]
    var date = new Date()
    var deliveryDate = new Date()
    deliveryDate.setDate(date.getDate() + 3)

  var dispatch = useDispatch()

  console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuussserrrrrrrrr",user)
  const [allAddress, setAllAddress] = React.useState([])
  const [refresh, setRefresh] = React.useState(false)
  const [banner, setBanner] = React.useState([])
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')
  const [ustate, setUState] = useState('')
  const [city, setCity] = useState('')
  const [firstname, setFirstName] = useState(user.firstname)
  const [lastname, setLastName] = useState(user.lastname)
  const [emailid,setEmailid]=useState('')
  const [landmark, setLandmark] = useState('')
  const [mobileno, setMobileno] = useState(user.mobileno)
  const [dmobileno, setDMobileno] = useState('')

  var products = useSelector((state) => state.cart)
  var keys = Object.keys(products).length
  var listproducts = Object.values(products)
  var uaddress = useSelector((state) => state.user)
  var keys = Object.keys(uaddress).length
  var listaddress = Object.values(uaddress)[0]

  var navigate = useNavigate()

  var totalamount = listproducts.reduce(calculatetotal, 0)


  var offeramount = listproducts.reduce(calculateoffer, 0)


  const getCityAndStateFromZipcode = async (zipcode) => {
    const result = await getData('api/' + zipcode)
    if (result.status) {
      setCity(result.data.Region)
      setUState(result.data.State)
    } else {
      setCity('')
      setUState('')
    }
  }

  const debounce = (zipcode) => {
    if (searchTimer) {
      clearTimeout(searchTimer);
    }
    searchTimer = setTimeout(() => {
      getCityAndStateFromZipcode(zipcode || 1);
    }, 2000);
  };

  function calculatetotal(p, n) {
    return (p + (n.price * n.qty))
  }

  function calculateoffer(p, n) {
    return (p + (n.offerprice * n.qty))
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

  const fetchAllAddress = async () => {
    const body = {
      mobileno: user.mobileno
    }
    const result = await postData('users/getAddress', body)
    if (result) {
      setAllAddress(result.data)
    } else {
      setAllAddress([])
    }
  }

  const handleSubmit = async () => {
    var body = { mobileno: mobileno, pincode: pincode, city: city, state: ustate, firstname: firstname, lastname: lastname,emailid:emailid, address: address, landmark: landmark, dmobileno: dmobileno }
    console.log(body)
    var result = await postData('users/addaddress', body)
    alert(result)
    if (result) {
      fetchAllAddress()
    }
  }

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const list = (anchor) => (

    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <div style={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold', fontSize: 20 }}>
          Add Address
        </div>

        <div style={{ display: 'flex', justifyContent: 'left', padding: 10 }}>
          <CssTextField label="Pincode" InputLabelProps={{ style: { color: '#000' } }} inputProps={{ style: { color: "#000" } }} variant="standard" onChange={(event) => {
            setPincode(event.target.value)
            debounce(event.target.value)

          }} fullWidth />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: 10 }}>
          <CssTextField label="City" InputLabelProps={{ style: { color: '#000' } }} value={city} InputProps={{ readOnly: city.length ? true : false }} inputProps={{ style: { color: "#000" } }} onChange={(event) => setCity(event.target.value)} variant="standard" />
          <CssTextField label="State" InputLabelProps={{ style: { color: '#000' } }} value={ustate} InputProps={{ readOnly: ustate.length ? true : false }} inputProps={{ style: { color: "#000" } }} onChange={(event) => setUState(event.target.value)} variant="standard" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'left', padding: 10 }}>
          <CssTextField label="FIRSTNAME" InputLabelProps={{ style: { color: '#000' } }} value={firstname} inputProps={{ style: { color: "#000" } }} onChange={(event) => setFirstName(event.target.value)} variant="standard" fullWidth />
        </div>
        <div style={{ display: 'flex', justifyContent: 'left', padding: 10 }}>
          <CssTextField label="LASTNAME" InputLabelProps={{ style: { color: '#000' } }} value={lastname} inputProps={{ style: { color: "#000" } }} onChange={(event) => setLastName(event.target.value)} variant="standard" fullWidth />
        </div>
        <div style={{ display: 'flex', justifyContent: 'left', padding: 10 }}>
          <CssTextField label="EMAILID" InputLabelProps={{ style: { color: '#000' } }} value={emailid} inputProps={{ style: { color: "#000" } }} onChange={(event) => setEmailid(event.target.value)} variant="standard" fullWidth />
        </div>
        <div style={{ display: 'flex', justifyContent: 'left', padding: 10 }}>
          <CssTextField label="Address" InputLabelProps={{ style: { color: '#000' } }} inputProps={{ style: { color: "#000" } }} onChange={(event) => setAddress(event.target.value)} variant="standard" fullWidth />
        </div>
        <div style={{ display: 'flex', justifyContent: 'left', padding: 10 }}>
          <CssTextField label="Landmark" InputLabelProps={{ style: { color: '#000' } }} inputProps={{ style: { color: "#000" } }} onChange={(event) => setLandmark(event.target.value)} variant="standard" fullWidth />
        </div>
        <div style={{ display: 'flex', justifyContent: 'left', padding: 10 }}>
          <CssTextField label="PHONE NUMBER" InputLabelProps={{ style: { color: '#000' } }} InputProps={{ readOnly: true }} value={mobileno} inputProps={{ style: { color: "#000" } }} onChange={(event) => setMobileno(event.target.value)} type="tel" variant="standard" fullWidth />
        </div>
        <div style={{ display: 'flex', justifyContent: 'left', padding: 10 }}>
          <CssTextField label=" DELIVER PHONE NUMBER" InputLabelProps={{ style: { color: '#000' } }} inputProps={{ style: { color: "#000" } }} onChange={(event) => setDMobileno(event.target.value)} type="tel" variant="standard" fullWidth />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={handleSubmit} style={{ background: '#000',margin:10 }} variant='contained' fullWidth >Save Address</Button>
        </div>
      </List>
    </Box>
  );
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const showCartItems = () => {
    return listproducts.map((item, index) => {
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

  const showAllAddress = () => {
    return allAddress.map((item, index) => {
      return (<>
        <div>
          {item.firstname} {item.lastname}
        </div>
        <div>
          {item.address}, {item.landmark}
        </div>
        <div>
          {item.mobileno}, {item.deliverymobileno}
        </div> 

      </>)
    })
  }

  const fetchAllBanners = async () => {
    var result = await getData('banner/displayallbanner')
    setBanner(result.data)
  }

  const showBanners = () => {
    return banner.map((item, index) => {
      return (<div>
        <img src={`${ServerURL}/images/${item.bannerpicture}`} width="100%" style={{ borderRadius: 10 }} />
        </div>
      )
    })
  }
  useEffect(function () {
    fetchAllBanners()
    fetchAllAddress()

  }, [])


  const handleMakePayment=()=>{
   listaddress['totalamount']=offeramount
  
   dispatch({type:'ADD_USER',payload:[listaddress.mobileno,listaddress]})
   navigate("/paymentgateway")
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
                                <div className={classes.one} >
                <div style={{justifyContent:'space-between',display:'flex',fontWeight:500,letterSpacing:2 }}>
                  DELIVERY ADDRESS
                  <Button variant="text" style={{color:'#ef4281'}} onClick={toggleDrawer('right', true)}>+ Add new address</Button>
                </div>
                {showAllAddress()}
              
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
                                    <div onClick={handleMakePayment} style={{ padding: 20 }}><Button variant="contained" style={{ color: "#fff", background: "#000", fontWeight: "bold", width: "60%" }}>MAKE PAYMENT</Button></div>
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
        <React.Fragment key={'left'}>

          <SwipeableDrawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
            onOpen={toggleDrawer('right', true)}
          >
            {list('left')}
          </SwipeableDrawer>
        </React.Fragment>
    </>
  )

}