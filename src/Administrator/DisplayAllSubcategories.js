import React, { useEffect, useState } from "react";
import { Grid, TextField, Button, Avatar } from "@mui/material";
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
        width: "75%",
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

export default function DisplayAllSubcategories(props) {

    const classes = useStyles();
    const [subCategoryId,setSubCategoryId]=useState("")
    const [categoryId, setCategoryId] = useState("")
    const [subCategoryName, setSubCategoryName] = useState("")
    const [description,setDescription]=useState("")
    const [categoryList,setCategoryList]=useState([])
    const [subcategoryList,setSubCategoryList]=useState([])
    const [icon, setIcon] = useState({ bytes: "", filename: "/logo.png" })
    const [showButton, setShowButton] = useState(false)
    const [showUploadButton, setShowUploadButton] = useState(true)
    const [tempIcon, setTempIcon] = useState("")
    const [open, setOpen] = React.useState(false);

    const fetchAllSubCategories = async () => {
        var result = await getData("subcategories/displayallsubcategories")
        setSubCategoryList(result.data)
    }

    useEffect(function () {
        fetchAllSubCategories()
        fetchAllCategories()
    }, [])

    const fetchAllCategories=async()=>{
        var result=await getData("categories/displayallcategories")
        setCategoryList(result.data)
   }

   const fillCategory=()=>{
       return categoryList.map((item)=>{
           return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem> 
       })
   }

   const handleCategoryChange = (event) => {
       setCategoryId(event.target.value);
     };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = (rowData) => {
        setSubCategoryId(rowData.subcategoryid)
        setCategoryId(rowData.categoryid)
        setSubCategoryName(rowData.subcategoryname)
        setDescription(rowData.description)
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
        var body = { subcategoryid: subCategoryId,categoryid: categoryId,subcategoryname:subCategoryName,description:description }
        var result = await postData("subcategories/editsubcategory", body)
        if (result) {
            Swal.fire({
                icon: 'success',
                title: 'Your sub-category has been edited',
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
        fetchAllSubCategories()
    }

    const handleCancel = () => {
        setShowButton(false)
        setShowUploadButton(true)
        setIcon({ bytes: "", filename: `${ServerURL}/images/${tempIcon}` })
    }

    const handleEditIcon = async () => {
        var formData = new FormData()
        formData.append("subcategoryid", subCategoryId)
        formData.append("icon", icon.bytes)
        var result = await postDataAndImage("subcategories/editicon", formData)
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
                var result = await postData("subcategories/deletesubcategory", { subcategoryid: subCategoryId })
                if (result) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Your sub-category has been deleted',
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
                fetchAllSubCategories()
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
                        Edit Sub-Category
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
                        <CssTextField value={subCategoryName} onChange={(event) => setSubCategoryName(event.target.value)} variant="outlined" label="Sub-Category Name" fullWidth inputProps={{ style: { color: "#fff" } }} InputLabelProps={{ style: { color: "#fff" } }} />
                    </Grid>
                    <Grid item xs={12}>
                        <CssTextField value={description} onChange={(event) => setDescription(event.target.value)} variant="outlined" label="Description" fullWidth inputProps={{ style: { color: "#fff" } }} InputLabelProps={{ style: { color: "#fff" } }} />
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
                title="List of sub-categories"
                columns={[
                    { title: 'Sub-Category ID', field: 'subcategoryid' },
                    { title: 'Category ID', render: (rowData) => (<div>{rowData.categoryid},{rowData.categoryname}</div>) },
                    { title: 'Sub-Category Name', field: 'subcategoryname' },
                    { title: 'Description', field: 'description' },
                    {
                        title: 'Icon', field: 'icon',
                        render: rowData => <img src={`${ServerURL}/images/${rowData.icon}`} style={{ width: 70, borderRadius: '25%' }} />
                    },
                ]}

                data={subcategoryList}

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