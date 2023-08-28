import React, { useState, useEffect, createRef } from 'react';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import Header from "./Header"
import Footer from "./Footer"
import Divider from "@mui/material/Divider"
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import {postData} from "../FetchNodeServices"
import OTPInput, { ResendOTP } from "otp-input-react";
import {useNavigate,useLocation} from "react-router-dom"
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

  var location = useLocation()

    const classes = useStyles();
    const [OTP, setOTP] = useState("");
    const [email,setEmail]=useState("")
    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    const [mobileno,setMobileno]=useState(location.state.mobileno)
    const [gOtp,setGOtp]=useState("")

    var dispatch=useDispatch()
    var navigate=useNavigate()

    const handleSubmit=async()=>{
      if(OTP==gOtp){
      var body={mobileno:mobileno,emailid:email,firstname:firstName,lastname:lastName}
      var result=await postData("users/insertuser",body)
      alert(result.result)
      dispatch({type:"ADD_USER",payload:[mobileno,body]})
      navigate("/ordersummaryreview")
      }else{
        alert("Invalid OTP")
      }
    }

    const otpGenerator=()=>{
      var otp=parseInt(Math.random()*899999)+100000
      alert(otp)
      setGOtp(otp)
      return otp
    }

    useEffect(function(){
      otpGenerator()
    },[])

    return(
        <div>
             <Header style={{ width: "100%" }} />
              <style jsx>
      {`
        .css-1x51dt5-MuiInputBase-input-MuiInput-input{
            font-size:20px !important;
        }
        .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root{
            font-weight:bold !important;
            font-size:17px !important;
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
                   <Grid container spacing={2} style={{width:"80%",display:"flex",justifyContent:"center"}}>
                      <Grid item xs={6} style={{width:"50%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                           <img src='/signin-signup.png' style={{width:650}}/>
                      </Grid>
                      <Grid item xs={6} style={{width:"50%",paddingLeft:160,paddingTop:70}}>
                            <div style={{fontSize:30,fontWeight:500,letterSpacing:1}}>Create Account</div>
                            <div style={{paddingTop:10}}>
                            <TextField
          label="EMAIL ID"
          onChange={(event)=>setEmail(event.target.value)}
          id="standard-start-adornment"
          sx={{width: '100%' }}
          placeholder="Enter your Email Id"
          variant="standard"
          InputLabelProps={{
            shrink: true,
          }}
        />
                            </div>
                            <div style={{paddingTop:30}}>
                            <TextField
          label="FIRST NAME"
          onChange={(event)=>setFirstName(event.target.value)}
          id="standard-start-adornment"
          sx={{width: '100%' }}
          placeholder="Enter your First Name"
          variant="standard"
          InputLabelProps={{
            shrink: true,
          }}
        />
                            </div>
                            <div style={{paddingTop:30}}>
                            <TextField
          label="LAST NAME"
          onChange={(event)=>setLastName(event.target.value)}
          id="standard-start-adornment"
          sx={{width: '100%' }}
          placeholder="Enter your Last Name"
          variant="standard"
          InputLabelProps={{
            shrink: true,
          }}
        />
                            </div>
                            <div style={{color:"rgba(21,27,57,.6)",letterSpacing:2,fontWeight:500,paddingTop:20}} >VERIFYING NUMBER</div>
                            <div style={{display:"flex",justifyContent:"space-between",paddingTop:10}}>
                                <div><span style={{color:"rgba(21,27,57,.6)",fontSize:13}}>We have sent 6 digit OTP on</span><span style={{fontWeight:500,fontSize:15}}> {`+91-${mobileno}`}</span></div>
                                <div style={{color:"#ef4281",fontSize:13,cursor:"pointer"}}>Change</div>
                            </div>
                            <div style={{width:"100%",display:"flex",justifyContent:"center",paddingTop:15}}>
                            <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} />
                            </div>
                            <div style={{color:"#ef4281",fontSize:13,cursor:"pointer",display:"flex",justifyContent:"flex-end",paddingTop:10}}>Resend OTP</div>
                            <div style={{paddingTop:40}}><Button onClick={()=>handleSubmit()} fullWidth variant="contained" style={{padding:5,fontSize:20,background:"#000",color:"#fff"}}>VERIFY</Button></div>
                      </Grid>
                      <div style={{paddingTop:40,textAlign:"center"}}><div>By continuing you agree to our <a href='#' style={{color:"#ef4281",textDecoration:"none"}}>Terms of service</a></div>
                       <div>and <a href='#' style={{color:"#ef4281",textDecoration:"none"}}>Privacy & Legal Policy.</a></div></div>
                   </Grid>
             </div>
            <Footer />
        </div>
    )
}