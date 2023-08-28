import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DisplayAllCategories from './DisplayAllCategories';
import DisplayAllSubcategories from "./DisplayAllSubcategories"
import DisplayAllBrands from "./DisplayAllBrands"
import DisplayAllProducts from "./DisplayAllProducts"
import DisplayAllBanner from "./DisplayAllBanner"
import DisplayAllProductImages from './DisplayAllProductImages';
import ProductImages from './ProductImages';
import Categories from "./Categories"
import SubCategories from "./SubCategories"
import Brands from "./Brands"
import Products from "./Products"
import Banner from "./Banner"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export default function AdminListItems(props) {

    const handleClick=(view)=>{
        props.setComponent(view)
      }

    return(  <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
    <ListItemButton style={{padding:15}}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton style={{padding:15}}>
      <ListItemIcon>
        <FormatListBulletedIcon />
      </ListItemIcon>
      <ListItemText primary="Add Category" onClick={()=>handleClick(<Categories/>)} />
    </ListItemButton>
    <ListItemButton style={{padding:15}}>
      <ListItemIcon>
        <FormatListBulletedIcon />
      </ListItemIcon>
      <ListItemText primary="Add Sub-Category" onClick={()=>handleClick(<SubCategories/>)} />
    </ListItemButton>
    <ListItemButton style={{padding:15}}>
      <ListItemIcon>
        <FormatListBulletedIcon />
      </ListItemIcon>
      <ListItemText primary="Add Brand" onClick={()=>handleClick(<Brands/>)} />
    </ListItemButton>
    <ListItemButton style={{padding:15}}>
      <ListItemIcon>
        <FormatListBulletedIcon />
      </ListItemIcon>
      <ListItemText primary="Add Product" onClick={()=>handleClick(<Products/>)} />
    </ListItemButton>
    <ListItemButton style={{padding:15}}>
      <ListItemIcon>
      <FormatListBulletedIcon />
      </ListItemIcon>
      <ListItemText primary="Add more images" onClick={()=>handleClick(<ProductImages setComponent={props.setComponent} />)} />
    </ListItemButton>
    <ListItemButton style={{padding:15}}>
      <ListItemIcon>
        <FormatListBulletedIcon />
      </ListItemIcon>
      <ListItemText primary="Add Banner" onClick={()=>handleClick(<Banner/>)} />
    </ListItemButton>
    <ListItemButton style={{padding:15}}>
      <ListItemIcon>
        <FormatListBulletedIcon />
      </ListItemIcon>
      <ListItemText primary="Display All Categories" onClick={()=>handleClick(<DisplayAllCategories/>)} />
    </ListItemButton>
    <ListItemButton style={{padding:15}}>
      <ListItemIcon>
      <FormatListBulletedIcon />
      </ListItemIcon>
      <ListItemText primary="Display All Sub-Categories" onClick={()=>handleClick(<DisplayAllSubcategories setComponent={props.setComponent}/>)} />
    </ListItemButton>
    <ListItemButton style={{padding:15}}>
      <ListItemIcon>
      <FormatListBulletedIcon />
      </ListItemIcon>
      <ListItemText primary="Display All Brands" onClick={()=>handleClick(<DisplayAllBrands setComponent={props.setComponent}/>)}/>
    </ListItemButton>
    <ListItemButton style={{padding:15}}>
      <ListItemIcon>
      <FormatListBulletedIcon />
      </ListItemIcon>
      <ListItemText primary="Display All Products" onClick={()=>handleClick(<DisplayAllProducts setComponent={props.setComponent}/>)} />
    </ListItemButton>
    <ListItemButton style={{padding:15}}>
      <ListItemIcon>
      <FormatListBulletedIcon />
      </ListItemIcon>
      <ListItemText primary="Display All Product Images" onClick={()=>handleClick(<DisplayAllProductImages setComponent={props.setComponent}/>)} />
    </ListItemButton>
    <ListItemButton style={{padding:15}}>
      <ListItemIcon>
      <FormatListBulletedIcon />
      </ListItemIcon>
      <ListItemText primary="Display All Banners" onClick={()=>handleClick(<DisplayAllBanner setComponent={props.setComponent}/>)} />
    </ListItemButton>
    </div>
    )}