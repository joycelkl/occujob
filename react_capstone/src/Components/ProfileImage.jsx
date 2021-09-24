import React from 'react'
import {MdCloudUpload} from 'react-icons/md'

const ProfileImage = (props) => {

            
    const {url, handleOnChange} = props
        
    return (
        <div>
        <div className="container">
        {url ? <img src={url} alt="userPic" style={{width: 250, height: 250, border:"1px solid black",  borderRadius:"5px", }} /> : <input placeholder="please upload a picture" style={{width: 200, height: 200, textAlign:'center'}} disabled/>}
        <input style={{display:'none'}} type="file" id='img' onChange={(e)=>handleOnChange(e)} />
       <br></br>
        <label style={{fontSize:'15px', border:'none', borderRadius:'1.5rem', width:'30%', padding:'2%', fontWeight:'500', color:"#6c757d", cursor:'pointer', backgroundColor:'#E6E6E6', marginTop:'5px'}} htmlFor="img" >Upload <MdCloudUpload /></label>
        </div>
         </div>
    )
}

export default ProfileImage;
