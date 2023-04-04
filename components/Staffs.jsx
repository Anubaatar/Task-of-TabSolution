import { useQuery } from '@apollo/client';
import { GET_STAFF } from '../graphql/queries.js';
import { makeStyles } from "@mui/styles";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
    root:{
        maxWidth:345,
    },
    media:{
        height:140,
    },
});

const Staff = ({ name, email, phone, address, birthday, sex}) => {
    const classes = useStyles();
    return (
    <Card className={ classes.root}>
      
      <CardContent>
        <Typography>
          {[name, email, phone, address, birthday, sex]}
        </Typography>
        
      </CardContent>

      <CardActions>
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}



const Staffs =() => {
    const { loading, error, data } = useQuery(GET_STAFF)
    if(loading){
        return "loading...";
    }
    if(error){
        return `error! ${error.message}`;
    }
    //console.log(data);
    if(!data) {
        return "No data";
    }
    return data.Staff.map((StaffData) => <Staff {...StaffData} />);
};

export default Staffs;