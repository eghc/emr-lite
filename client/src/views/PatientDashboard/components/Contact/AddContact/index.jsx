import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


// Material helpers
import { withStyles } from '@material-ui/core';

import axios from 'axios';

const styles = theme => ({
  root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    }
});

const states = [
  {
    value: 'Alabama',
    label: 'Alabama'
  },
  {
    value: 'Alaska',
    label: 'Alaska'
  },
  {
    value: 'Arizona',
    label: 'Arizona'
  }
];

class AddContact extends Component {
  constructor(){
    super();
    this.state = {
      history: false,
      historyData: null,
      currContactData: null
    }
    this.handleAddContactHistory = this.handleAddContactHistory.bind(this);
  }

  componentDidMount(){
    //console.log(this.props);
    if(this.props.currContactData){
      this.setState({currContactData: this.props.currContactData});
    }

  }
  componentDidUpdate(prevProps){
    if(this.props.currContactData != prevProps.currContactData){
      if(this.props.currContactData){
        this.setState({currContactData: this.props.currContactData});
      }
    }
  }

  handleAddContactHistory(){

    if(this.state.history){
      //if already looking at the history, go back to form
      this.setState({history: false});
    }
    else{
      axios
       .get('/getContacts/'+this.props.patientId)
       .then((response) => {
         if(response.data){
           let tempData = response.data.map(item =>{
            item.createdAt = new Date(item.createdAt).toLocaleString()
            return item
           });

           this.setState({historyData: tempData});
         }
       })
       .catch(err => {
         console.error(err);
       });
      this.setState({history: true});
    }
  }

  getContents(){
    const classes = this.props.classes;
    if(this.state.history){
      if(this.state.historyData){
        return (
          <GridList cellHeight={100} className={classes.gridList} cols={1}>
          {this.state.historyData.map(item => (
            <GridListTile cols={1}>
              <Typography variant='subtitle2'>
                Updated: {item.createdAt}
              </Typography>
              <Typography variant='body1'>
              <div>
                Home Phone: {item.homephone}
              </div>
              <div>
                Cell Phone: {item.cellphone}
              </div>
              <div>
                Email: {item.email}
              </div>
              <div>
                Address: {item.street1} {item.street2} {item.state}, {item.zip}
              </div>
              </Typography>

            </GridListTile>
          ))}
        </GridList>
        );
      }else{
        return (
          <GridList cellHeight={140} className={classes.gridList} cols={1}>
          </GridList>
        );
      }

    }else{
      return (
        <div>
          <div>
          <TextField
            id="email"
            label="Email Address"
            margin="dense"
            variant="outlined"
            defaultValue = {this.state.currContactData ? this.state.currContactData.email : null}
          />
          <TextField
            id="homephone"
            label="Home Phone"
            margin="dense"
            type="number"
            variant="outlined"
            defaultValue = {this.state.currContactData ? this.state.currContactData.homephone : null}
          />
          <TextField
            id="cellphone"
            label="Cell Phone"
            margin="dense"
            type="number"
            variant="outlined"
            defaultValue = {this.state.currContactData ? this.state.currContactData.cellphone : null}
          />
        </div>
        <div>
          <TextField
            id="street1"
            label="Street Address 1"
            margin="dense"
            variant="outlined"
            defaultValue = {this.state.currContactData ? this.state.currContactData.street1 : null}
          />
          <TextField
            id="street2"
            label="Street Address 2"
            margin="dense"
            variant="outlined"
            defaultValue = {this.state.currContactData ? this.state.currContactData.street2 : null}
          />
          <TextField
            id="state"
            label="Select State"
            margin="dense"
            select
            SelectProps={{ native: true }}
            defaultValue = {this.state.currContactData ? this.state.currContactData.state : null}
            variant="outlined">
            {states.map(option => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </TextField>
          <TextField
            id="zip"
            label="Zip Code"
            margin="dense"
            variant="outlined"
            defaultValue = {this.state.currContactData? this.state.currContactData.zip : null}
          />
          </div>
        </div>
      )
    }
  }


  render(){
    let dialogContents = this.getContents();

    return (
      <div>
        <Dialog open={this.props.open} aria-labelledby="form-dialog-title">
          <form onSubmit ={this.props.handleAddContactClose} noValidate>
          <DialogTitle id="form-dialog-title">
            <Typography variant='subtitle1'>
              Update Contact
            </Typography>
          </DialogTitle>

          <DialogContent>
            {dialogContents}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleAddContactHistory} id="history" color="primary">
              {this.state.history? (
                <div>Back</div>
              ):(
                <div>History</div>
              )}
            </Button>
            <Button onClick={this.props.handleAddContactCancel} id="cancel" color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

AddContact.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddContact);
