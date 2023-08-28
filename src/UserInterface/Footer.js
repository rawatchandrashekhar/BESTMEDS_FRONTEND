import React,{useState,useEffect} from 'react';
import { styled, alpha } from '@mui/material/styles';
import {Box ,Button,Grid,Divider} from '@mui/material';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import {postData,getData,ServerURL} from "../FetchNodeServices"
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from "@mui/material/styles"

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'© Copyright '}
      {new Date().getFullYear()}
      {'. '}
       All rights reserved by&nbsp; 
      <Link color="inherit" href="" style={{fontSize:20}}>
          BESTMEDS.COM
      </Link>{' '}
      
    </Typography>
  );
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.10),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.20),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
    marginTop:'10px',
  marginBottom:'10px'
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // marginTop:'10px',
  // marginBottom:'10px'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Footer() {
 const [category,setCategory]=useState([])

 var theme=useTheme()
   const matches = useMediaQuery(theme.breakpoints.down('lg'));

 const fetchAllCategories=async()=>{
  var result=await getData('categories/displayallcategories')
  setCategory(result.data)

 }

 useEffect(function(){
fetchAllCategories()

 },[])

const showMainCategories=()=>{
return category.map((item,index)=>{
return (<>
{index<=9?
<div style={{marginRight:50}}>
  
  <div style={{color:'#000',paddingBottom:15}}>{item.categoryname}</div>
  </div>:<></>}</>)


})


}

const showRestCategories=()=>{
  return category.map((item,index)=>{
  return (<>
  {(index>=11 && index<=14)?
  <div>
    
    <div style={{color:'#000',color:"#95a5a6",fontSize:20}}>{item.categoryname}</div>
    </div>:<></>}</>)
  
  
  })
  
  
  }

  return (
    <>
    {matches?<>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 60, marginBottom: 30 }}>
                <Divider style={{ width: "70%" }} />
            </div>
      <div style={{display:"flex",justifyContent:"center",paddingBottom:20}}>
      <img src='/play_store.png'  width='100' style={{paddingRight:10}}/>
      <img src='/app_store.png'  width='100' />
      </div>
      </>:<>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 80, marginBottom: 30 }}>
                <Divider style={{ width: "70%" }} />
            </div>
      <Grid container spacing={2} style={{display:"flex",justifyContent:"center"}} >
      <Grid item xs={4} style={{paddingLeft:"10%"}} >
     <img src='/logotwo.png'  width='35' />
       <span style={{fontSize:'25px',color:'#00cec9'}}>estMeds</span>.com
       
     </Grid>
     <Grid item xs={8} style={{paddingRight:"10%"}}>
     <span style={{color:'#999999'}}>Bestmeds.com, India Ki Pharmacy, is brought to you by the Dadha & Company – one of India’s
          most trusted pharmacies, with over 100 years’ experience in dispensing quality medicines.</span>
     </Grid>
    
     <Grid item xs={12} style={{display:'flex', justifyContent:'center'}}>
             <Divider style={{ background:'#FFF', width:"95%"}} />
           </Grid>
    
           <Grid item xs={2.5}>
             <p><b>COMPANY</b></p>
             <p>About Bestmeds</p>
             <p>Customers Speak</p>
             <p>In the News</p>
             <p>Career</p>
             <p>Terms and Conditions</p>
             <p>Privacy Policy</p>
             <p>Fees and Payments Policy</p>
             <p>Shipping and Delivery Policy</p>
             <p>Return, Refund and Cancellation Policy</p>
             <p>Contact</p>
             
    </Grid>
    
    <Grid item xs={2}>
             <p><b>SHOPPING</b></p>
             <p>Browse by A-Z</p>
             <p>Browse by Manufacturers</p>
             <p>Health Articles</p>
             <p>Offers / Coupons</p>
             <p>FAQs</p>            
    </Grid>
    
    <Grid item xs={2}>
    
    <p><b>CATEGORY</b></p>
    {showMainCategories()}
    
    </Grid>
    
    <Grid item xs={2}  >
             <p><b>SOCIAL</b></p>
             <p>Patients Alike</p>
             <p>Facebook</p>
             <p>Twitter</p>
             <p>Instagram</p>
             <p>Youtube</p>   
             <p>Refer & Earn</p>         
    </Grid>
    
    <Grid item xs={2.5} >
             <p><b>SUBSCRIBE TO OUR NEWSLETTER</b></p>
             <div>Get a free subscription to our health and </div>
             <div>fitness tip and stay  tuned to our latest  </div>
             <div>offers</div>
             <Grid item xs={12} style={{marginTop:"20px",marginBottom:'20px'}} >
      <Divider  style={{background:'#000'}}/>
    </Grid>
    
     
             <div  >
             <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Enter your email address"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
              <div style={{display:"flex",justifyContent:"center",paddingTop:20}}>
                  <img src='/play_store.png'  width='100' style={{paddingRight:10}}/>
                  <img src='/app_store.png'  width='100' />
                  </div>
                  </div>
               
    </Grid>
    <Grid item xs={12} style={{display:'flex', justifyContent:'center',padding:20}}>
             <Divider style={{width:"95%"}} />
           </Grid>
    <Grid item xs={12} style={{width:"95%",paddingBottom:25}}>
    <div style={{display:"flex",justifyContent:"space-evenly",flexWrap:"wrap"}}>
        {showRestCategories()}
        <Copyright/>
    </div>
    </Grid>
    </Grid>
      </>}
      </>
 );
}