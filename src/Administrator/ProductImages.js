import React, { useEffect, useState } from "react";
import { Grid, TextField, Button, Avatar } from "@mui/material";
import { DropzoneDialog } from 'material-ui-dropzone'
import { alpha, styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { postDataAndImage, getData, postData } from "../FetchNodeServices";
import Swal from "sweetalert2";
import Add from "@mui/icons-material/Add"
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
        width: "100%",
        marginTop: 50,
        borderRadius: 10
    }
});

const Input = styled('input')({
    display: 'none',
});

export default function ProductImages(props) {

    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [categoryId, setCategoryId] = useState("")
    const [subCategoryId, setSubCategoryId] = useState("")
    const [brandId, setBrandId] = useState("")
    const [productId, setProductId] = useState("")
    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [brandList, setBrandList] = useState([])
    const [productList, setProductList] = useState([])

    const fetchAllCategories = async () => {
        var result = await getData("categories/displayallcategories")
        setCategoryList(result.data)
    }

    useEffect(function () {
        fetchAllCategories()
    }, [])

    const fillCategory = () => {
        return categoryList.map((item) => {
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }

    const handleCategoryChange = (event) => {
        setCategoryId(event.target.value);
        fetchAllSubCategories(event.target.value)
    };

    const fetchAllSubCategories = async (cid) => {
        var body = { categoryid: cid }
        var result = await postData("subcategories/displayallsubcategoriesbycategories", body)
        setSubCategoryList(result.data)
    }

    const fillSubCategory = () => {
        return subCategoryList.map((item) => {
            return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        })
    }

    const handleSubCategoryChange = (event) => {
        setSubCategoryId(event.target.value);
        fetchAllBrands(event.target.value)
    };

    const fetchAllBrands = async (sid) => {
        var body={subcategoryid:sid}
        var result = await postData("brands/displayallbrandsbysubcategories",body)
        setBrandList(result.data)
    }

    const fillBrand = () => {
        return brandList.map((item) => {
            return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
        })
    }

    const handleBrandChange=(event)=>{
        setBrandId(event.target.value)
        fetchAllproducts(event.target.value)
    }

    const fetchAllproducts = async (bid) => {
        var body={brandid:bid}
        var result = await postData("products/displayallproductsbybrandid",body)
        setProductList(result.data)
    }

    const fillProduct = () => {
        return productList.map((item) => {
            return <MenuItem value={item.productid}>{item.productname}</MenuItem>
        })
    }

    const handleProductChange=(event)=>{
        setProductId(event.target.value)
    }

    const handleOpen=()=>{
        setOpen(true)
    }

    const handleClose=()=>{
        setOpen(false)
    }

    const handleSave=async(files)=>{
        var formData=new FormData()
        formData.append("categoryid",categoryId)
        formData.append("subcategoryid",subCategoryId)
        formData.append("brandid",brandId)
        formData.append("productid",productId)
        files.map((item,index)=>{
            formData.append("images"+index,item)
        })
        var result=await postDataAndImage("products/savemoreimages",formData)
        alert(result)
        setOpen(false)
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
                    Product Images Interface
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
                    <FormControl fullWidth>
                        <InputLabel style={{ color: "#FFF" }} id="demo-simple-select-label">Brand Id</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                              value={brandId}
                            label="Brand Id"
                            variant="outlined"
                          onChange={handleBrandChange}
                        >
                            {fillBrand()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel style={{ color: "#FFF" }} id="demo-simple-select-label">Product Id</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                              value={productId}
                            label="Product Id"
                            variant="outlined"
                          onChange={handleProductChange}
                        >
                            {fillProduct()}
                        </Select>
                    </FormControl>
                </Grid>
       
             
                <Grid item xs={12}>
                    <Button onClick={handleOpen} variant="contained" fullWidth style={{ fontWeight: "bold", color: "#7ed6df", background: "#fff" }}  endIcon={<Add style={{fill:"#7ed6df",fontSize:25}}/>}>ADD ONE TO MORE PRODUCT Images</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button  variant="contained" component="span" fullWidth style={{ fontWeight: "bold", color: "#7ed6df", background: "#fff" }} >
                        Submit
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button type="reset" variant="contained" component="span" fullWidth style={{ fontWeight: "bold", color: "#7ed6df", background: "#fff" }} >
                        Reset
                    </Button>
                </Grid>
                
            </Grid>
            <DropzoneDialog
                    open={open}
                    onSave={(files)=>handleSave(files)}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    filesLimit={10}
                    onClose={handleClose}
                />
        </div>
    </div>
           
        
    )
}