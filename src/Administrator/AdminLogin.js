import React,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {postData} from "../FetchNodeServices"
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom"

const CssTextField = styled(TextField)({

  '& .MuiOutlinedInput-root': {
      '& fieldset': {
          border: '2px solid #fff',
      },
      '&:hover fieldset': {
          borderColor: '#fff',
      },
      '&.Mui-focused fieldset': {
          borderColor: '#fff',
      },
  },
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'© Copyright '}
      {new Date().getFullYear()}
      {'. '}
       All rights reserved by&nbsp; 
      <Link color="inherit" href="">
          BESTMEDS.COM
      </Link>{' '}
      
    </Typography>
  );
}

export default function AdminLogin() {

  const [emailId,setEmailId]=useState("")
  const [password,setPassword]=useState("")

  var navigate=useNavigate()

  const handleSubmit = async() => {
   var result=await postData("admin/checkadminlogin",{emailid:emailId,password:password})
   if(result.result){
       navigate("/admindashboard")
   }else{
    Swal.fire({
      icon: 'warning',
      title: 'Invalid AdminId/Password',
      showConfirmButton: false,
      timer: 1500
  })
   }
  };

  return (
      <Grid container component="main" sx={{ height: '100vh',display:"flex",justifyContent:"center",backgroundColor:"#ecf0f1"}}>
          <style jsx>
                {`
        fieldset.MuiOutlinedInput-notchedOutline {
          border-color: #bdc3c7 !important;
        }
       
        
        div.MuiOutlinedInput-input.MuiSelect-select{
          color:#bdc3c7 !important
        }

        .css-12ekjls-MuiButtonBase-root-MuiButton-root{
          background-color:#7ed6df !important
        }
      `}
            </style>
        <Grid item xs={12} sm={8} md={5} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#7ed6df' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" style={{fontSize:30}}>
              Sign in
            </Typography>
            <Box sx={{ mt: 1 ,width:"60%"}}>
              <CssTextField
                margin="normal"
                required
                fullWidth
                id="email"
                onChange={(event)=>setEmailId(event.target.value)}
                label="Admin Id"
                name="email"
                autoComplete="email"
                autoFocus
                inputProps={{ style: { color: "black" } }} 
                InputLabelProps={{ style: { color: "#bdc3c7" } }}
              />
              <CssTextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                onChange={(event)=>setPassword(event.target.value)}
                type="password"
                id="password"
                autoComplete="current-password"
                inputProps={{ style: { color: "black" } }} 
                InputLabelProps={{ style: { color: "#bdc3c7" } }}
              />
              <Button
              onClick={handleSubmit}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 ,padding:1.5,fontSize:17,backgroundColor:"#7ed6df",color:"white"}}
              >
                Sign In
              </Button>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>
      </Grid>
  );
}