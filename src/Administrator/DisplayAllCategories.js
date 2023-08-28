import React, { useEffect, useState } from "react";
import { Grid, TextField, Button, Avatar } from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {Save,ClearAll,List,AddCircle} from '@mui/icons-material';
import {useNavigate} from "react-router-dom"
import { getData, postDataAndImage, ServerURL, postData } from "../FetchNodeServices";
import MaterialTable from "material-table"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import Categories from "./Categories"

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
        width: "80%",
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

export default function DisplayAllCategories(props) {

    const classes = useStyles(props);
    const [list, setList] = useState([])
    const [categoryName, setCategoryName] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [icon, setIcon] = useState({ bytes: "", filename: "/logo.png" })
    const [showButton, setShowButton] = useState(false)
    const [showUploadButton, setShowUploadButton] = useState(true)
    const [tempIcon, setTempIcon] = useState("")
    const [open, setOpen] = React.useState(false);

    var navigate=useNavigate()

    const fetchAllCategories = async () => {
        var result = await getData("categories/displayallcategories")
        setList(result.data)
    }

    useEffect(function () {
        fetchAllCategories()
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = (rowData) => {
        setCategoryId(rowData.categoryid)
        setCategoryName(rowData.categoryname)
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
        var body = { categoryid: categoryId, categoryname: categoryName }
        var result = await postData("categories/editcategory", body)
        if (result) {
            Swal.fire({
                icon: 'success',
                title: 'Your category has been edited',
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
        fetchAllCategories()
    }

    const handleCancel = () => {
        setShowButton(false)
        setShowUploadButton(true)
        setIcon({ bytes: "", filename: `${ServerURL}/images/${tempIcon}` })
    }

    const handleEditIcon = async () => {
        var formData = new FormData()
        formData.append("categoryid", categoryId)
        formData.append("icon", icon.bytes)
        var result = await postDataAndImage("categories/editicon", formData)
        setShowUploadButton(true)
        setShowButton(false)
    }

    const handleClick=()=>{
        // navigate("/categories")
        props.setComponent(<Categories setComponent={props.setComponent}/>)
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
                var result = await postData("categories/deletecategory", { categoryid: categoryId })
                if (result) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Your category has been deleted',
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
                fetchAllCategories()
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
                            <div className={classes.usubdiv}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
                                        Edit Category
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CssTextField value={categoryName} onChange={(event) => setCategoryName(event.target.value)} variant="outlined" label="Category Name" fullWidth inputProps={{ style: { color: "#fff" } }} InputLabelProps={{ style: { color: "#fff" } }} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <label htmlFor="contained-button-file">
                                            <Input onChange={(event) => handleIconChange(event)} accept="image/*" id="contained-button-file" multiple type="file" />
                                            {showUploadButton ? <div>
                                                <Button variant="contained" component="span" fullWidth style={{ fontWeight: "bold", color: "#7ed6df", background: "#fff" }} >
                                                    Upload
                                                </Button>
                                            </div> : <></>}
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
                title={<div style={{width:500,display:"flex",alignItems:"center"}}>
                {/* <div style={{padding:5}}>
                <Button onClick={()=>handleClick()} startIcon={<AddCircle />} variant="contained" fullWidth style={{ fontWeight: "bold", color: "#7ed6df", background: "#fff" }}>Add Category</Button>
                  </div> */}
                  <div style={{marginLeft:120,fontSize:20,fontWeight:700,letterSpacing:1,padding:5}}>
                    List of categories
                    </div>
            </div>}
                columns={[
                    { title: 'Category ID', field: 'categoryid' },
                    { title: 'Category Name', field: 'categoryname' },
                    {
                        title: 'Icon', field: 'icon',
                        render: rowData => <img src={`${ServerURL}/images/${rowData.icon}`} style={{ width: 70, borderRadius: '25%' }} />
                    },
                ]}

                data={list}

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