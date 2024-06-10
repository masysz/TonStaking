"use Client";

import React from 'react'

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import "../../globals.css"

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface CardProps {
    title : string,
    description?: String,
    price : string,
    link : string,
    img : string,
    onLoad: () => void
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function Card({title, description, price, link, img, onLoad } : CardProps) {
    const snackbar = useSnackbar();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleBonous = async () => {
        const price = 1000;
        const id =  localStorage.getItem('id');
        const data = {
            title:  title,
            id : id,
        }
        const response = await axios.post('https://button-game-backend.onrender.com/bonous', data);
        console.log(response.data)
        if(response.data.stats == "success"){
            snackbar.enqueueSnackbar(`You gain 1000 coins.  Your balance is ${response.data.mount}`, {autoHideDuration : 1000})
        }
        else snackbar.enqueueSnackbar("You need more time", {autoHideDuration : 1000})
        setTimeout(() => window.open(link, "_blank") ,1000)
    }
    return (
        <>
            <div className='cursor-pointer mt-5 bg-[#272A2F] p-3 flex flex-row rounded-2xl shadow-md' onClick={handleClickOpen}>
                <img src={img} alt='mexc' className='w-14 h-14' onLoad={onLoad}/>
                <div className='text-md font-normal flex flex-col space-y-1 ml-3'>
                    <p>Join to our {title}</p>
                    <div className='flex space-x-2 items-center'>
                        <img src='/images/dollar-icon.svg' alt='dollar' className='w-5 h-5'/>
                        <div>+{price}</div>
                    </div>
                </div>
                <div className='ml-auto flex items-center'><ArrowForwardIosIcon /></div>
            </div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                sx={{backgroundColor: '#272A2F'}}
            >
                <DialogTitle>
                    <div className='flex justify-center'>
                        <img src={img} alt="mexc" className='w-24 h-24' />
                    </div>
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description" sx={{color: 'white'}}>
                    <div className='text-2xl font-semibold text-center mt-3'>{title}</div>
                    <div className='opacity-50 text-center'>{description}</div>
                    <div className='flex justify-center space-x-2 items-center mt-4'>
                        <img src='/images/dollar-icon.svg' alt='dollar' className='w-5 h-5'/>
                        <div>+{price}</div>
                    </div>
                    <div className='flex justify-center mt-5'>
                        <Button variant="contained" sx={{paddingY: '10px', fontSize: '18px', paddingX: '24px', borderRadius: '20px', textTransform: 'none', }} onClick={handleBonous}>
                            Join
                        </Button>
                    </div>
                </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Card;