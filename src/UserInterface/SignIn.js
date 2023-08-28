import React, { useState, useEffect, createRef } from 'react';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import Header from "./Header"
import Footer from "./Footer"
import Divider from "@mui/material/Divider"
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import OTPInput, { ResendOTP } from "otp-input-react";
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from "@mui/material/styles"
import { postData } from '../FetchNodeServices';
import {useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
    subdiv: {
        padding: 15,
        margin: 30,
        display:"flex",
        justifyContent:"center",
    },
});

export default function SignIn(props) {

    const classes = useStyles();
    const [OTP, setOTP] = useState("");
    const [mobileno,setMobileno]=useState("")
    const [btnState,setBtnState]=useState(true)
    const [gOtp,setGOtp]=useState("")

    var navigate=useNavigate()

    var dispatch=useDispatch()

    var theme=useTheme()
    const large = useMediaQuery(theme.breakpoints.down('lg'));

    const otpGenerator=()=>{
      var otp=parseInt(Math.random()*899999)+100000
      return otp
    }

    const handleVerify=async()=>{
     var result=await postData("users/checkuser",{mobileno:mobileno})
     if(result.result){
       dispatch({type:"ADD_USER",payload:[result.data[0].mobileno,result.data[0]]})
          setBtnState(false)
          var g=otpGenerator()
          alert(g)
          setGOtp(g)
     }else{
         navigate("/signup",{state:{mobileno:mobileno}})
     }
    }

    const handleCheckOtp=()=>{
      if(OTP==gOtp){
        navigate("/ordersummaryreview")
      }else{
        alert("OTP not matched")
      }
    }

    return(
        <div>
             <Header style={{ width: "100%" }} />
              <style jsx>
      {`
        .css-1x51dt5-MuiInputBase-input-MuiInput-input{
            font-size:25px !important;
        }
        .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root{
            font-weight:bold !important;
            font-size:20px !important;
            color:#000 !important
        }
        .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root.Mui-focused{
            color:#000 !important
        }
        .css-1pnmrwp-MuiTypography-root{
            font-weight:500 !important;
            font-size:25px !important;
            color:#000 !important
        }
      `}
    </style>
             <div className={classes.subdiv}>
                   
           {large?<>
            <Grid container spacing={2}>
                       <Grid item xs={12} style={{paddingTop:70}}>
                       <div style={{fontSize:35,fontWeight:500,letterSpacing:1}}>SignIn / SignUp</div>
                       <div style={{color:"rgba(21,27,57,.6)",fontSize:18,paddingTop:13}}>Sign up or Sign in to access your orders, special offers, health tips and more!</div>
                       <div style={{paddingTop:70}}>
                       <TextField
                       onChange={(event)=>setMobileno(event.target.value)}
     label="PHONE NUMBER"
     id="standard-start-adornment"
     sx={{width: '100%' }}
     placeholder="Enter your mobile no"
     InputProps={{
       startAdornment: <InputAdornment position="start" >+91 | </InputAdornment>,
     }}
     variant="standard"
   />
                       </div>
                       {btnState?
                       <div style={{paddingTop:40}}><Button onClick={()=>handleVerify()} fullWidth variant="contained" style={{padding:10,fontSize:20,background:"#000",color:"#fff"}}>USE OTP</Button></div>
                         :<>
                          <div style={{color:"rgba(21,27,57,.6)",fontSize:13,paddingTop:40}}>We have sent 6 digit OTP</div>
                       <div style={{width:"100%",display:"flex",justifyContent:"center",paddingTop:10}}>
                       <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} />
                       </div>
                       <div style={{color:"#ef4281",fontSize:13,cursor:"pointer",display:"flex",justifyContent:"flex-end",paddingTop:10}}>Resend OTP</div>
                       <div style={{paddingTop:40}}><Button onClick={()=>handleCheckOtp()} fullWidth variant="contained" style={{padding:10,fontSize:20,background:"#000",color:"#fff"}}>VERIFY</Button></div>
                         </>} 
                 </Grid>
                 <Grid item xs={12}>
                 <div style={{paddingTop:40,textAlign:"center"}}><div>By continuing you agree to our <a href='#' style={{color:"#ef4281",textDecoration:"none"}}>Terms of service</a></div>
                  <div>and <a href='#' style={{color:"#ef4281",textDecoration:"none"}}>Privacy & Legal Policy.</a></div></div>
                  </Grid>
              </Grid>
           </>
                     :
                     <Grid container spacing={2} style={{width:"80%",display:"flex",justifyContent:"center"}}>
                      <Grid item xs={6} style={{width:"50%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                           <img src='/signin-signup.png' style={{width:"100%"}}/>
                      </Grid>
                       <Grid item xs={6} style={{width:"50%",paddingLeft:160,paddingTop:70}}>
                       <div style={{fontSize:35,fontWeight:500,letterSpacing:1}}>SignIn / SignUp</div>
                       <div style={{color:"rgba(21,27,57,.6)",fontSize:18,paddingTop:13}}>Sign up or Sign in to access your orders, special offers, health tips and more!</div>
                       <div style={{paddingTop:70}}>
                       <TextField
                       onChange={(event)=>setMobileno(event.target.value)}
     label="PHONE NUMBER"
     id="standard-start-adornment"
     sx={{width: '100%' }}
     placeholder="Enter your mobile no"
     InputProps={{
       startAdornment: <InputAdornment position="start" >+91 | </InputAdornment>,
     }}
     variant="standard"
   />
                       </div>
                       {btnState?
                       <div style={{paddingTop:40}}><Button onClick={()=>handleVerify()} fullWidth variant="contained" style={{padding:10,fontSize:20,background:"#000",color:"#fff"}}>USE OTP</Button></div>
                       :<>
                       <div style={{color:"rgba(21,27,57,.6)",fontSize:13,paddingTop:40}}>We have sent 6 digit OTP</div>
                       <div style={{width:"100%",display:"flex",justifyContent:"center",paddingTop:10}}>
                       <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} />
                       </div>
                       <div style={{color:"#ef4281",fontSize:13,cursor:"pointer",display:"flex",justifyContent:"flex-end",paddingTop:10}}>Resend OTP</div>
                       <div style={{paddingTop:40}}><Button onClick={()=>handleCheckOtp()} fullWidth variant="contained" style={{padding:10,fontSize:20,background:"#000",color:"#fff"}}>VERIFY</Button></div>
                       </>}
                 </Grid>
                 <Grid item xs={12}>
                 <div style={{paddingTop:40,textAlign:"center"}}><div>By continuing you agree to our <a href='#' style={{color:"#ef4281",textDecoration:"none"}}>Terms of service</a></div>
                  <div>and <a href='#' style={{color:"#ef4281",textDecoration:"none"}}>Privacy & Legal Policy.</a></div></div>
                  </Grid>
              </Grid>
                     }
                     
             </div>
            <Footer />
        </div>
    )
}