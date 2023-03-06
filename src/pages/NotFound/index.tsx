import { Box, Stack, Typography } from '@mui/material';
import { useAppDispatch } from '../../redux/hooks';
// import { demo } from '../../redux/checkedoutSlice';
function NotFound() {
  const dispatch = useAppDispatch();
//  const handleClick =() => {
//     dispatch(demo())
//  }
  return (
    <Box >
      {/* <button onClick={handleClick}>OK</button> */}
        <Stack bgcolor='#fff' width='70%' margin='0 auto' height='500px' alignItems='center' justifyContent='center' direction='column'>
            <Typography variant='h1' fontWeight='700' align='center'>NOT FOUND</Typography>
        </Stack>
    </Box>
  )
}

export default NotFound