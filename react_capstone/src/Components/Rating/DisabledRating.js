import React from 'react'
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const DisabledRating = (props) => {
    console.log("PROPS RATING",props)
    return (
        <div>
            <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Ratings:</Typography>
        <Rating
          name="read-only"
          value={props.rating}
          readOnly
        />
      </Box>
        </div>
    )
}

export default DisabledRating
