import React, { useEffect, useState } from "react";
import { Grid, TextField, Button, Avatar } from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { postDataAndImage,getData,postData } from "../FetchNodeServices";
import Swal from "sweetalert2";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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

const useStyles = makeStyles({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    subdiv: {
        background: "#7ed6df",
        padding: 10,
        width: 600,
        marginTop: 50,
        borderRadius: 10
    }
});

const Input = styled('input')({
    display: 'none',
});

export default function SubCategories(props) {

    const classes = useStyles();
    const [categoryId, setCategoryId] = useState("")
    const [subCategoryId, setSubCategoryId] = useState("")
    const [brandName,setBrandName]=useState("")
    const [status,setStatus]=useState("")
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([])
    const [icon, setIcon] = useState({ bytes: "", filename: "/logo.png" })

    const handleIconChange = (event) => {
        setIcon({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })
    }

    const fetchAllCategories=async()=>{
         var result=await getData("categories/displayallcategories")
         setCategoryList(result.data)
    }

    useEffect(function(){
        fetchAllCategories()
    },[])

    const fillCategory=()=>{
        return categoryList.map((item)=>{
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem> 
        })
    }

    const handleCategoryChange = (event) => {
        setCategoryId(event.target.value);
        fetchAllSubCategories(event.target.value)
      };

      const fetchAllSubCategories=async(cid)=>{
          var body={categoryid:cid}
        var result=await postData("subcategories/displayallsubcategoriesbycategories",body)
        setSubCategoryList(result.data)
   }

   const fillSubCategory=()=>{
    return subCategoryList.map((item)=>{
        return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem> 
    })
}

const handleSubCategoryChange = (event) => {
    setSubCategoryId(event.target.value);
  };

    const handleSubmit = async () => {
        var formData = new FormData()
        formData.append("categoryid",categoryId)
        formData.append("subcategoryid", subCategoryId)
        formData.append("brandname",brandName)
        formData.append("status",status)
        formData.append("icon", icon.bytes)
        var result = await postDataAndImage("brands/savebrand", formData)
        if (result) {
            Swal.fire({
                icon: 'success',
                title: 'Your brand has been saved',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Fail to submit record',
                showConfirmButton: false,
                timer: 1500
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
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
                        Brand Interface
                    </Grid>
                    <Grid item xs={6}>
                    <FormControl fullWidth>
        <InputLabel style={{ color: "#FFF" }} id="demo-simple-select-label">Category Id</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categoryId}
          label="Category Id"
          variant="outlined"
          onChange={handleCategoryChange}
        >
            {fillCategory()}
        </Select>
      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                    <FormControl fullWidth>
        <InputLabel style={{ color: "#FFF" }} id="demo-simple-select-label">Sub-Category Id</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={subCategoryId}
          label="Sub-Category Id"
          variant="outlined"
          onChange={handleSubCategoryChange}
        >
            {fillSubCategory()}
        </Select>
      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <CssTextField onChange={(event) => setBrandName(event.target.value)} variant="outlined" label="Brand Name" fullWidth inputProps={{ style: { color: "#fff" } }} InputLabelProps={{ style: { color: "#fff" } }} />
                    </Grid>
                    <Grid item xs={6}>
                    <FormControl fullWidth>
                  <InputLabel style={{color:"#fff"}} id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Status"
                    variant="outlined"
                    onChange={(event) => setStatus(event.target.value)}
                  >
                    <MenuItem value="Popular">Popular</MenuItem>
                    <MenuItem value="New Arrival">New Arrival</MenuItem>
                    <MenuItem value="Trending">Trending</MenuItem>
                    <MenuItem value="Top Brand">Top Brand</MenuItem>
                  </Select>
                </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <label htmlFor="contained-button-file">
                            <Input onChange={(event) => handleIconChange(event)} accept="image/*" id="contained-button-file" multiple type="file" />
                            <Button variant="contained" component="span" fullWidth style={{ fontWeight: "bold", color: "#7ed6df", background: "#fff" }} >
                                Upload
                            </Button>
                        </label>
                    </Grid>
                    <Grid item xs={6} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Avatar
                            alt="Remy Sharp"
                            src={icon.filename}
                            variant="rounded"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={() => handleSubmit()} variant="contained" component="span" fullWidth style={{ fontWeight: "bold", color: "#7ed6df", background: "#fff" }} >
                            Submit
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button type="reset" variant="contained" component="span" fullWidth style={{ fontWeight: "bold", color: "#7ed6df", background: "#fff" }} >
                            Reset
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

