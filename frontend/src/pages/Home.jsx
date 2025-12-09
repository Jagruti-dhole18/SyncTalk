import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'

import "../App.css"
import { Button, IconButton, TextField } from '@mui/material'
import RestoreIcon from '@mui/icons-material/Restore'
import { AuthContext } from '../contexts/AuthContext'
import Footer from './Footer'


const Home = () => {
let navigate=useNavigate();

const [meetingCode,setMeetingCode]=useState();
const {addToUserHistory}=useContext(AuthContext)

    let handleJoinVideoCall= async ()=>{

      await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`);
    }
  return (
   <>
    <div>
      <div className="navBar">
        <div style={{display:"flex",alignItems:"center"}}>
           <h2>SyncTalk</h2> 
        </div>
                <div style={{display:"flex",alignItems:"center"}}>
              <div
  style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
  onClick={() => navigate("/history")}
>
  <IconButton>
    <RestoreIcon />
  </IconButton>
  <p>History</p>
</div>

                <Button onClick={()=>{
                    localStorage.removeItem("token");
                    navigate("/");
                }}>Logout</Button>
</div>
      </div>
      <div className="meetContainer">
        <div className="leftPanel">
            <div>
                <h2>Providing Quality Video call Just Like Quality Education</h2>
                <div style={{display:'flex',gap:"10px"}}>
                    <TextField onChange={e=>setMeetingCode(e.target.value)} id='outlined-basic' label="Meeting code" variant='outlined'/>
                        <Button onClick={handleJoinVideoCall} variant='contained'>Join</Button>
                </div>
            </div>
        </div>
        <div className='rightPanel'>
                    <img srcSet='/logo3.png' alt="" />
                </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default withAuth(Home)
