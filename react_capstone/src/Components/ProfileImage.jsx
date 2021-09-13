import React from 'react'


const ProfileImage = (props) => {

            
    const {url, handleOnChange} = props
        
    return (
        <div>
        <div className="container">
         {/* input position can change but DON'T CHANGE the content */}
        {url ? <img src={url} alt="userPic" style={{width: 200, height: 200}} /> : <input placeholder="please upload a picture" style={{width: 200, height: 200, textAlign:'center'}} disabled/>}
        <input type="file" onChange={(e)=>handleOnChange(e)} />
        </div>
         </div>
    )
}

export default ProfileImage;
