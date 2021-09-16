import React, {useState} from 'react'
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const ControlledRating = (props) => {
    const [ratingValue, setRatingValue] = useState(2);
    props.ratingValue(ratingValue)
    return (
        <div>
            <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Ratings:</Typography>
        <Rating
          name="simple-controlled"
          value={ratingValue}
          onChange={(event) => {
            let rating = event.target.value
            setRatingValue(rating);
          }}
        />
      </Box>
        </div>
    )
}

export default ControlledRating
