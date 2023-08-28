import React, { useEffect, useState } from "react";
import { Grid, TextField, Button, Avatar } from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { postDataAndImage,getData } from "../FetchNodeServices";
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
    const [subCategoryName, setSubCategoryName] = useState("")
    const [description,setDescription]=useState("")
    const [categoryList,setCategoryList]=useState([])
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
      };

    const handleSubmit = async () => {
        var formData = new FormData()
        formData.append("categoryid",categoryId)
        formData.append("subcategoryname", subCategoryName)
        formData.append("description",description)
        formData.append("icon", icon.bytes)
        var result = await postDataAndImage("subcategories/savesubcategory", formData)
        if (result) {
            Swal.fire({
                icon: 'success',
                title: 'Your sub-category has been saved',
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
                        Sub-Category Interface
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
                        <CssTextField onChange={(event) => setSubCategoryName(event.target.value)} variant="outlined" label="Sub-Category Name" fullWidth inputProps={{ style: { color: "#fff" } }} InputLabelProps={{ style: { color: "#fff" } }} />
                    </Grid>
                    <Grid item xs={12}>
                        <CssTextField onChange={(event) => setDescription(event.target.value)} variant="outlined" label="Description" fullWidth inputProps={{ style: { color: "#fff" } }} InputLabelProps={{ style: { color: "#fff" } }} />
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

