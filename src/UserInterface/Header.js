import React,{useState,useEffect} from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { getData,postData } from '../FetchNodeServices';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from "react-router-dom"
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';
import Popover from '@mui/material/Popover';
import Grid from '@mui/material/Grid';
import "./home.css"
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from "@mui/material/styles"

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.10),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.15),
  },
  marginLeft: 0,
  marginRight:25,
  width: '16%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Header() {

   var theme=useTheme()
   const matches = useMediaQuery(theme.breakpoints.down('lg'));
   console.log("Medium Down",matches)

   const [categoryList,setCategoryList]=useState([])
   const [subCategoryList,setSubCategoryList]=useState([])
   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);
   
   var navigate=useNavigate()

   var products=useSelector(state=>state.cart)
   var keys=Object.keys(products).length
   var productsList=Object.values(products)

   var totalamount=productsList.reduce(calculatetotal,0)
   function calculatetotal(p,n){
     return (p+(n.price*n.qty))
   }

   var offeramount=productsList.reduce(calculateoffer,0)
   function calculateoffer(p,n){
     return (p+(n.offerprice*n.qty))
   }

   //////////////////Show Cart Items In Popover//////////////////////
   const [panchorEl, setPAnchorEl] = React.useState(null);

   const handlePopoverOpen = (event) => {
     setPAnchorEl(event.currentTarget);
   };
 
   const handlePopoverClose = () => {
     setPAnchorEl(null);
   };
 
   const popen = Boolean(panchorEl);

   const showCartItems=()=>{
     return productsList.map((item,index)=>{
      return(
        <>
       {index < 2 ? <>
      <Grid className='threeDotsCart' item xs={8}>
       <span style={{fontWeight:500,fontSize:18}}>{item.productname}</span>
    </Grid>
    <Grid item xs={4} style={{display:"flex",justifyContent:"flex-end"}}>
      <span style={{fontWeight:500,fontSize:18}}>Rs.{item.price}x{item.qty}</span>
    </Grid></>
    :<></>}
    </>
      )
      })
   }

   const plusOneMoreItems=()=>{
     return(
       <>
      { keys >2?<>
       <Grid item xs={8}></Grid>
           <Grid item xs={4} style={{display:"flex",justifyContent:"end"}}>{`+${keys-2} more items`}</Grid>
           <Grid item xs={8}><div style={{display:"flex",flexDirection:"column"}}><div style={{color:"#ef4281",fontSize:25,fontWeight:"bold"}}>{`Rs.${(offeramount).toFixed(2)}`}</div><div style={{color:"#378f30",fontSize:16,fontWeight:"bold"}}>You save {`Rs.${(totalamount-offeramount).toFixed(2)}`}</div></div></Grid><Grid item xs={4}></Grid>
   </>:<></>}
       </>
     )
   }

   const onlyTwoItemsPriceAndSavePrice=()=>{
   
    return(
      <>
     { keys <= 2 & keys > 0 & offeramount>0?<>
          <Grid item xs={8}><div style={{display:"flex",flexDirection:"column"}}><div style={{color:"#ef4281",fontSize:25,fontWeight:"bold"}}>{`Rs.${(offeramount).toFixed(2)}`}</div><div style={{color:"#378f30",fontSize:16,fontWeight:"bold"}}>You save {`Rs.${(totalamount-offeramount).toFixed(2)}`}</div></div></Grid><Grid item xs={4}></Grid>
  </>:<></>}
      </>
    )
 
  }

  const onlyTwoItemsPriceAndSavePriceForNoOffer=()=>{
  
       
      return(<>
     { keys <= 2 & keys > 0 & offeramount==0?<>
          <Grid item xs={8}><div style={{display:"flex",flexDirection:"column"}}><div style={{color:"#ef4281",fontSize:25,fontWeight:"bold"}}>{`Rs.${(totalamount).toFixed(2)}`}</div></div></Grid><Grid item xs={4}></Grid>
  </>:<></>}
  </>)
 
  }

  const noItemsInCart=()=>{
    return(
      <>
     { keys == 0?<>
          <Grid item xs={12} style={{display:"flex",justifyContent:"center",alignItems:"center"}} ><img src='/emptycart.svg' style={{width:120,height:120}} /></Grid>
          <Grid item xs={12} style={{display:"flex",justifyContent:"center",alignItems:"center",fontSize:18,fontWeight:500}} >Your Cart is empty!</Grid>
  </>:<></>}
      </>
    )
  }

  const summaryAndItems=()=>{
    return(
      <>
      {keys > 0 ?<>
            
             <Grid item xs={8}>
                <span style={{fontWeight:500,fontSize:18,letterSpacing:2,color:"#6f7284"}}>Order Summary</span>
             </Grid>
             <Grid item xs={4} style={{display:"flex",justifyContent:"flex-end"}}>
               <span style={{fontWeight:"normal",fontSize:17,color:"#151b39"}}>{keys} item(s)</span>
             </Grid></>:<></>}
      </>
    )
  }

   const cartItemsPopover=()=>{
    return (
      <div>
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: 'none',
          }}
          open={popen}
          anchorEl={panchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <div style={{width:400,padding:15 }}>
          <Grid container spacing={2}>

             {summaryAndItems()}

             {noItemsInCart()}
          
             {showCartItems()}

             {onlyTwoItemsPriceAndSavePrice()}

             {onlyTwoItemsPriceAndSavePriceForNoOffer()}

             {plusOneMoreItems()}
             
             </Grid>
          </div>
        </Popover>
      </div>
    );
   }
   /////////////////////////////////////////////////////////////////

   const handleClick = (event,categoryid) => {
    setAnchorEl(event.currentTarget);
    fetchAllSubCategories(categoryid)
  };

   const handleClose = () => {
    setAnchorEl(null);
  };

   const fetchAllCategories=async()=>{
     var result=await getData("categories/displayallcategories")
     setCategoryList(result.data)
   }

   const fetchAllSubCategories=async(categoryid)=>{
    var result=await postData("subcategories/displayallsubcategoriesbycategories",{categoryid:categoryid})
    setSubCategoryList(result.data)
   }

   const searchingProducts=async(productname)=>{
     var body={productname:productname}
    var result=await postData("products/searchproducts",body)
    if(result){
      navigate("/SearchingProducts")
    }
    
  }

   useEffect(function(){
       fetchAllCategories()
   },[])

   const showCategories=()=>{
       return categoryList.map((item,index)=>{
           return (<>
           {index<=4?
           <div style={{marginRight:"7%"}}>
             <Button 
             id="basic-button"
             aria-controls={open ? 'basic-menu' : undefined}
             aria-haspopup="true"
             aria-expanded={open ? 'true' : undefined}
             onClick={(event)=>handleClick(event,item.categoryid)}
             style={{color:"#000"}}>{item.categoryname}</Button>
           </div>:<></>}</>)
       })
   }

   const showSubCategories=()=>{
    return subCategoryList.map((item)=>{
        return (
            <MenuItem>{item.subcategoryname}</MenuItem>
        )
    })
}

    const moreCategories=()=>{
            return categoryList.map((item,index)=>{
                return (<>
                {(index>=5 && index<=14)?<div style={{marginRight:50,color:'#FFF'}}>
          {item.categoryname} 
        </div>:<></>}</>)
            })
    }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="inherit" position="fixed">
        <Toolbar>
        {matches?
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>:<></>}
          <img src="logotwo.png" width="50" onClick={()=>navigate("/home")}/>
          {matches?<></>:<>
          <div style={{width:"80%",display:"flex",justifyContent:"center"}}>
           
          {showCategories()}
          <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {showSubCategories()}
      </Menu>
          </div></>}
          {matches?
            <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center",width:"80%"}}>
              <SearchIcon />
          
         
          <Badge badgeContent={keys} color="primary" style={{marginLeft:10}}>
          <ShoppingCartIcon onClick={()=>navigate("/ordersummary")} aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose} style={{cursor:"pointer"}}/>
          </Badge>
        
          <PersonIcon style={{marginLeft:10}} />
          </div>:
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:100}}>
              <SearchIcon />
          
         
          <Badge badgeContent={keys} color="primary">
          <ShoppingCartIcon onClick={()=>navigate("/ordersummary")} aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose} style={{cursor:"pointer"}}/>
          </Badge>
        
          <PersonIcon/>
          </div>
          }
          {cartItemsPopover()}
       
        </Toolbar>
      </AppBar>
      
      {matches?<></>:<>
      <div style={{flexWrap:"wrap", height:50,width:'100%',background:'#000',display:'flex', justifyContent:'center',alignItems:'center',marginTop:65}} >
      {moreCategories()}
      </div></>}
    
    </Box>
  );
}