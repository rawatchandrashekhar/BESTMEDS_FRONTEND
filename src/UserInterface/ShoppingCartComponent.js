import React,{useState,useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function ShoppingCartComponent(props){

    const [qty,setQty]=useState(props.value)

    const handleMinus=()=>{
        var v=qty-1
        if(v>=0)
        setQty(v)
        props.onChange(v)
    }

    const handlePlus=()=>{
        var v=qty+1
        setQty(v)
        props.onChange(v)
    }

    return(
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            {qty==0?<Button onClick={()=>handlePlus()} fullWidth variant="contained" endIcon={<ShoppingCartIcon style={{fontSize:28}} />} style={{background:"#000",color:"#fff",fontSize:17}}>Add To Cart</Button>: <>
            <Avatar onClick={()=>handleMinus()} style={{ background:"#000",fontWeight:"bold",fontSize:30,marginRight:15}} variant="rounded">
        -
      </Avatar>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",fontWeight:"bold",fontSize:20}}>{qty}</div>
      <Avatar onClick={()=>handlePlus()} style={{ background:"#000",fontWeight:"bold",fontSize:30,marginLeft:15 }} variant="rounded">
        +
      </Avatar>
     </>}
        </div>
    )
}