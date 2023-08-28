import React, { useState } from "react";
import { Grid, TextField, Button, Avatar } from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import {Save,ClearAll,List} from '@mui/icons-material';
import {useNavigate} from "react-router-dom"
import { makeStyles } from '@mui/styles';
import { postDataAndImage } from "../FetchNodeServices";
import Swal from "sweetalert2";
import DisplayAllCategories from "./DisplayAllCategories";

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

function Categories(props) {

    const classes = useStyles(props);
    const [categoryName, setCategoryName] = useState("")
    const [icon, setIcon] = useState({ bytes: "", filename: "/logo.png" })

    var navigate=useNavigate()

    const handleIconChange = (event) => {
        setIcon({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })
    }

    const handleClick=()=>{
        // navigate("/displayallcategories")
        props.setComponent(<DisplayAllCategories setComponent={props.setComponent}/>)
      }

    const handleSubmit = async () => {
        var formData = new FormData()
        formData.append("categoryname", categoryName)
        formData.append("icon", icon.bytes)
        var result = await postDataAndImage("categories/savecategory", formData)
        if (result) {
            Swal.fire({
                icon: 'success',
                title: 'Your category has been saved',
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
            <div className={classes.subdiv}>
                <Grid container spacing={2}>
                    <Grid item xs={6} style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
                        Category Interface
                    </Grid>
                    {/* <Grid item xs={6}>
                    <Button variant="contained" onClick={()=>handleClick()} startIcon={<List />} component="span" fullWidth style={{ fontWeight: "bold", color: "#7ed6df", background: "#fff" }} >
                                Category List
                            </Button>
                    </Grid> */}
                    <Grid item xs={12}>
                        <CssTextField onChange={(event) => setCategoryName(event.target.value)} variant="outlined" label="Category Name" fullWidth inputProps={{ style: { color: "#fff" } }} InputLabelProps={{ style: { color: "#fff" } }} />
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

export default Categories;
