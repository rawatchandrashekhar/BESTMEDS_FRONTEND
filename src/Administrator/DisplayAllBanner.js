import React, { useEffect, useState } from "react"
import MaterialTable from "material-table"
import { Grid, TextField, Button, Avatar,InputLabel,FormControl,MenuItem,Select } from '@mui/material'
import { styled, makeStyles } from '@mui/styles';
import { ServerURL,getData,postDataImage,postData } from "../FetchNodeServices";
import Swal from "sweetalert2";
const Input = styled('input')({
  display: 'none',
});
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subdiv: {
    background: '#7ed6df',
    padding: 20,
    width: 900,
    marginTop: 50

  },

  croot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  csubdiv: {
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



export default function DisplayAllBanner(props) {
  var classes = useStyles()
  const [listbanner, setListBanner] = useState([])


  const fetchAllBanner = async () => {
    var result = await getData("banner/displayallbanner")
    setListBanner(result.data)
  }



  
  useEffect(function () {

    fetchAllBanner()

  }, [])

  
 
 

  
  function display() {
    return (
        <MaterialTable
            title={<div style={{width:500,display:"flex",alignItems:"center"}}>
            {/* <div style={{padding:5}}>
            <Button onClick={()=>handleClick()} startIcon={<AddCircle />} variant="contained" fullWidth style={{ fontWeight: "bold", color: "#7ed6df", background: "#fff" }}>Add Category</Button>
              </div> */}
              <div style={{marginLeft:120,fontSize:20,fontWeight:700,letterSpacing:1,padding:5}}>
                List of banners
                </div>
        </div>}
            columns={[
                { title: 'Banner ID', field: 'bannerid' },
                { title: 'Banner Status', field: 'bannerstatus' },
                {
                    title: 'Banner Picture', field: 'icon',
                    render: rowData => <img src={`${ServerURL}/images/${rowData.bannerpicture}`} style={{ width: 70, borderRadius: '25%' }} />
                },
            ]}

            data={listbanner}

            actions={[
                {
                    icon: 'edit',
                    tooltip: 'Edit User',
                    // onClick: (event, rowData) => handleOpen(rowData)
                },
                {
                    icon: 'delete',
                    tooltip: 'Delete User',
                    // onClick: (event, rowData) => handleDelete(rowData)
                }
            ]}
        />
    )
}

return (<div>
    <div className={classes.root}>
        <div className={classes.subdiv}>
            {display()}
        
        </div>
    </div>
</div>)
}


