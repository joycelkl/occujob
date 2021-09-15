import React, {useState} from 'react'
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const ControlledRating = () => {
    const [ratingValue, setRatingValue] = useState(2);
    return (
        <div>
            <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Ratings:</Typography>
        <Rating
          name="simple-controlled"
          ratingValue={ratingValue}
          onChange={(event, newRatingValue) => {
            setRatingValue(newRatingValue);
          }}
        />
      </Box>
        </div>
    )
}

export default ControlledRating
