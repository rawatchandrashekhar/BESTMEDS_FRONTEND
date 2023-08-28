import React, { useEffect, useState } from "react";
import { Grid, TextField, Button, Avatar,Radio } from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { getData, postDataAndImage, ServerURL, postData } from "../FetchNodeServices";
import MaterialTable from "material-table"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
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
        padding: 20,
        width: "100%",
        marginTop: 50,
        borderRadius: 10
    },
    uroot: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    usubdiv: {
        background: "#7ed6df",
        padding: 20,
        width: 600,
        borderRadius: 10
    }
});

const Input = styled('input')({
    display: 'none',
});

export default function DisplayAllProducts(props) {

    const classes = useStyles();
    const [productId,setProductId]=useState("")
    const [categoryId, setCategoryId] = useState("")
    const [subCategoryId, setSubCategoryId] = useState("")
    const [brandId, setBrandId] = useState("")
    const [productName, setProductName] = useState("")
    const [price,setPrice]=useState("")
    const [offerPrice,setOfferPrice]=useState("")
    const [offerType,setOfferType]=useState("")
    const [stock,setStock]=useState("")
    const [rating,setRating]=useState("")
    const [saleStatus,setSaleStatus]=useState("")
    const [description,setDescription]=useState("")
    const [status, setStatus] = useState("")
    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [brandList, setBrandList] = useState([])
    const [productList, setProductList] = useState([])
    const [icon, setIcon] = useState({ bytes: "", filename: "/logo.png" })
    const [showButton, setShowButton] = useState(false)
    const [showUploadButton, setShowUploadButton] = useState(true)
    const [tempIcon, setTempIcon] = useState("")
    const [open, setOpen] = React.useState(false);

    const fetchAllProducts = async () => {
        var result = await getData("products/displayallproducts")
        setProductList(result.data)
    }

    const fetchAllCategories = async () => {
        var result = await getData("categories/displayallcategories")
        setCategoryList(result.data)
    }

    useEffect(function () {
        fetchAllCategories()
        fetchAllProducts()
    }, [])

    const fillCategory = () => {
        return categoryList.map((item) => {
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }

    const handleCategoryChange = (event) => {
        setCategoryId(event.target.value);
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
    }

    const handleStatusChange=(event)=>{
           setStatus(event.target.value)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = (rowData) => {
        fetchAllSubCategories(rowData.categoryid)
        fetchAllBrands(rowData.subcategoryid)
        setProductId(rowData.productid)
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setBrandId(rowData.brandid)
        setProductName(rowData.productname)
        setPrice(rowData.price)
        setOfferPrice(rowData.offerprice)
        setOfferType(rowData.offertype)
        setStock(rowData.stock)
        setRating(rowData.rating)
        setSaleStatus(rowData.salestatus)
        setDescription(rowData.description)
        setStatus(rowData.status)
        setIcon({ bytes: "", filename: `${ServerURL}/images/${rowData.icon}` })
        setOpen(true)
        setTempIcon(rowData.icon)
    }

    const handleIconChange = (event) => {
        setShowButton(true)
        setShowUploadButton(false)
        setIcon({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })
    }

    const handleSubmit = async () => {
        var body = { productid:productId, categoryid: categoryId,subcategoryid: subCategoryId, brandid: brandId,productname:productName,price:price,offerprice:offerPrice,offertype:offerType,stock:stock,rating:rating,salestatus:saleStatus,description:description, status: status }
        var result = await postData("products/editproduct", body)
        if (result) {
            Swal.fire({
                icon: 'success',
                title: 'Your Product has been edited',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Fail to edit record',
                showConfirmButton: false,
                timer: 1500
            })
        }
        setOpen(false)
        fetchAllProducts()
    }

    const handleCancel = () => {
        setShowButton(false)
        setShowUploadButton(true)
        setIcon({ bytes: "", filename: `${ServerURL}/images/${tempIcon}` })
    }

    const handleEditIcon = async () => {
        var formData = new FormData()
        formData.append("productid", productId)
        formData.append("icon", icon.bytes)
        var result = await postDataAndImage("products/editicon", formData)
        setShowUploadButton(true)
        setShowButton(false)
    }

    const handleDelete = async (rowData) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                var result = await postData("products/deleteproduct", { productid: productId })
                if (result) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Your product has been deleted',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Fail to delete record',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                fetchAllProducts()
            }
        })
    }

    const showDialogue = () => {
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                    <div className={classes.uroot}>
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
            <div className={classes.usubdiv}>
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
                        Product Interface
                    </Grid>
                    <Grid item xs={4}>
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
                    <Grid item xs={4}>
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
                    <Grid item xs={4}>
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
                    <Grid item xs={4}>
                        <CssTextField value={productName} onChange={(event) => setProductName(event.target.value)} variant="outlined" label="Product Name" fullWidth inputProps={{ style: { color: "#fff" } }} InputLabelProps={{ style: { color: "#fff" } }} />
                    </Grid>
                    <Grid item xs={4}>
                        <CssTextField value={price} onChange={(event) => setPrice(event.target.value)} variant="outlined" label="Price" fullWidth inputProps={{ style: { color: "#fff" } }} InputLabelProps={{ style: { color: "#fff" } }} />
                    </Grid>
                    <Grid item xs={4}>
                        <CssTextField value={offerPrice} onChange={(event) => setOfferPrice(event.target.value)} variant="outlined" label="Offer Price" fullWidth inputProps={{ style: { color: "#fff" } }} InputLabelProps={{ style: { color: "#fff" } }} />
                    </Grid>
                    <Grid item xs={3}>
                        <CssTextField value={offerType} onChange={(event) => setOfferType(event.target.value)} variant="outlined" label="Offer Type" fullWidth inputProps={{ style: { color: "#fff" } }} InputLabelProps={{ style: { color: "#fff" } }} />
                    </Grid>
                    <Grid item xs={3}>
                        <CssTextField value={stock} onChange={(event) => setStock(event.target.value)} variant="outlined" label="Stock" fullWidth inputProps={{ style: { color: "#fff" } }} InputLabelProps={{ style: { color: "#fff" } }} />
                    </Grid>
                    <Grid item xs={3}>
                        <CssTextField value={rating} onChange={(event) => setRating(event.target.value)} variant="outlined" label="Rating" fullWidth inputProps={{ style: { color: "#fff" } }} InputLabelProps={{ style: { color: "#fff" } }} />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel style={{ color: "#fff" }} id="demo-simple-select-label">Sale Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={saleStatus}
                                label="Sale Status"
                                variant="outlined"
                                onChange={(event) => setSaleStatus(event.target.value)}
                            >
                                <MenuItem value="Popular">Popular</MenuItem>
                                <MenuItem value="New Arrival">New Arrival</MenuItem>
                                <MenuItem value="Trending">Trending</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <CssTextField value={description} onChange={(event) => setDescription(event.target.value)} variant="outlined" label="Description" fullWidth inputProps={{ style: { color: "#fff" } }} InputLabelProps={{ style: { color: "#fff" } }} />
                    </Grid>
                    <Grid item xs={12} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <div style={{color:"#fff",fontWeight:"bold"}}>Continue : </div>
                        <Radio
                            checked={status === 'Continue'}
                            onChange={handleStatusChange}
                            value="Continue"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'B' }}
                        />
                        <div style={{color:"#fff",fontWeight:"bold"}}>Dis-Continue : </div>
                        <Radio
                            checked={status === 'Dis-Continue'}
                            onChange={handleStatusChange}
                            value="Dis-Continue"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'B' }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <label htmlFor="contained-button-file">
                            <Input onChange={(event) => handleIconChange(event)} accept="image/*" id="contained-button-file" multiple type="file" />
                            {showUploadButton ? <div>
                            <Button variant="contained" component="span" fullWidth style={{ fontWeight: "bold", color: "#7ed6df", background: "#fff" }} >
                                Upload
                            </Button>
                            </div>:<></>}
                        </label>
                        {showButton ? <div>
                                            <Button onClick={handleEditIcon} style={{ fontWeight: "bold", color: "#fff" }} >
                                                Save
                                            </Button>
                                            <Button onClick={handleCancel} style={{ fontWeight: "bold", color: "#FFF" }} >
                                                Cancel
                                            </Button>
                                        </div> : <></>}
                    </Grid>
                    <Grid item xs={6} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Avatar
                            alt="Remy Sharp"
                            src={icon.filename}
                            variant="rounded"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={() => handleSubmit()} variant="contained" component="span" fullWidth style={{ fontWeight: "bold", color: "#7ed6df", background: "#fff" }} >
                            Edit Data
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    function display() {
        return (
            <MaterialTable
                title="List of products"
                columns={[
                    { title: 'Product ID', field: 'productid' },
                    { title: 'Category ID', render: (rowData) => (<div>{rowData.categoryid},{rowData.categoryname}</div>) },
                    { title: 'Sub-Category ID', render: (rowData) => (<div>{rowData.subcategoryid},{rowData.subcategoryname}</div>) },
                    { title: 'Brand ID', render: (rowData) => (<div>{rowData.brandid},{rowData.brandname}</div>) },
                    { title: 'Product Name', field: 'productname' },
                    { title: 'Price', field: 'price' },
                    { title: 'Offer Price', field: 'offerprice' },
                    { title: 'Offer Type', field: 'offertype' },
                    { title: 'Stock', field: 'stock' },
                    { title: 'Rating', field: 'rating' },
                    { title: 'Sale Status', field: 'salestatus' },
                    { title: 'Description', field: 'description' },
                    { title: 'Status', field: 'status' },
                    {
                        title: 'Icon', field: 'icon',
                        render: rowData => <img src={`${ServerURL}/images/${rowData.icon}`} style={{ width: 70, borderRadius: '25%' }} />
                    },
                ]}

                data={productList}

                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit User',
                        onClick: (event, rowData) => handleOpen(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete User',
                        onClick: (event, rowData) => handleDelete(rowData)
                    }
                ]}
            />
        )
    }

    return (<div>
        <div className={classes.root}>
            <div className={classes.subdiv}>
                {display()}
                {showDialogue()}
            </div>
        </div>
    </div>)
}