import React, { useState,useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import { alpha, styled } from '@mui/material/styles';
import { Grid, TextField, Button, Avatar,InputLabel,FormControl,MenuItem,Select } from '@mui/material'
import { borderRadius } from '@mui/system';
import { getData,postDataAndImage,postData,ServerURL,postDataAndImageWithId } from '../FetchNodeServices';
import { DropzoneArea } from 'material-ui-dropzone';
import Swal from "sweetalert2";
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subdiv: {
    background: '#7ed6df',
    padding: 20,
    width: 700,
    marginTop: 50

  },
});
const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '1.5px solid #FFF',
      borderRadius: 0
    },
    '&:hover fieldset': {
      borderColor: '#FFF',

    },
    '&.Mui-focused fieldset': {
      borderColor: '#FFF',

    },

  },
});
const Input = styled('input')({
  display: 'none',
});
function Banner(props) {
    const classes = useStyles();
    
    const [bannerstatus,setBannerStatus] = useState('')
    const [uploadfiles,setFiles]= useState([])
    
      const handleImage=(files)=>{
       setFiles(files);
      }


    
  
    const handleSubmit = async () => {
      
      var formData = new FormData()
      formData.append('bannerstatus',bannerstatus)
      uploadfiles.map((file,index)=>{
        formData.append("image"+index,file)
      })

      var result = await postDataAndImage('banner/savebanner', formData)
      if(result.result)
      {
        Swal.fire({
          title: "BESTMEDS",
          text: 'Banner Submitted Successfully..',
          imageUrl: '/image.png',
          imageWidth: 150,
          imageHeight: 150,
          icon:'success'
        })
      }
      else
      {
        Swal.fire({
          title: "BESTMEDS",
          text: 'Fail To Submit Banner',
          imageUrl: '/image.png',
          imageWidth: 150,
          imageHeight: 150,
          icon:'error'
        })
      }
  
  
  
  
    }
    return (
  
      <div className={classes.root}>
    <style jsx>
      {`
        fieldset.MuiOutlinedInput-notchedOutline {
          border-color: white !important;
        }
        svg.MuiSvgIcon-root {
          color: white !important;
        }
        
        div.MuiOutlinedInput-input.MuiSelect-select{
          color:#FFF !important
        }
        
      `}
    </style>
        <div className={classes.subdiv}>
          <Grid container spacing={2} >
          <Grid item xs={12} style={{display:'flex',alignItems:'center', fontSize: 25, fontWeight: 'bold', color: '#FFF' }}>
         
             Add Banner 
            </Grid>

            <Grid item xs={12}>
              <CssTextField variant="outlined" InputLabelProps={{
                style: { color: '#FFF' },
              }} inputProps={{ style: { color: "#FFF" } }} label="Banner Status" onChange={(event) => setBannerStatus(event.target.value)} fullWidth />
  
            </Grid>

                      <Grid item xs={12}>
                        <DropzoneArea
                         acceptedFiles={['image/jpeg','image/png','image/bmp']}
                         filesLimit={6}
                         maxFileSize={500000}
                         onChange={handleImage}
                         

                        />


                      </Grid>

           
            <Grid item xs={6}>
              <Button onClick={() => handleSubmit()} style={{ background: '#FFF', color: '#7ed6df', fontWeight: 'bold' }} variant='contained' fullWidth>Submit</Button>
  
            </Grid>
            <Grid item xs={6}>
              <Button style={{ background: '#FFF', color: '#7ed6df', fontWeight: 'bold' }} variant='contained' fullWidth>Reset</Button>
            </Grid>
  
          </Grid>
  
        </div>
  
      </div>
    );
  }
  
  export default Banner;
  