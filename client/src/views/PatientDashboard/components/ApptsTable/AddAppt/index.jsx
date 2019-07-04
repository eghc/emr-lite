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
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';

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




class AddAppt extends Component {
  constructor(){
    super();
    this.state = {
      locations: null,
      providers: null

    }
  }

  componentDidMount(){
    axios
    .get('/getProviders')
    .then((response0) => {
      if(response0.data){
        //let tempVitalData = this.handleVitalData();
        this.setState({providers:response0.data});

        axios
        .get('/getLocations')
        .then((response1) => {
          if(response1.data){
            //let tempVitalData = this.handleVitalData();
            this.setState({locations:response1.data});
          }
        })
        .catch(err => {
          console.error(err);
        });
      }
    })
    .catch(err => {
      console.error(err);
    });
  }

  // componentDidUpdate(prevProps){
  //   if(this.props.currVitalData != prevProps.currVitalData){
  //     if(this.props.currVitalData){
  //       this.setState({currVitalData: this.props.currVitalData});
  //     }
  //   }
  // }

  render(){
    return (
      <div>
        <Dialog open={this.props.open} aria-labelledby="form-dialog-title">
          <form onSubmit ={this.props.handleAddApptClose} noValidate>
          <DialogTitle id="form-dialog-title">
            <Typography variant='subtitle1'>
              Add Appts
            </Typography>
          </DialogTitle>

          <DialogContent>
            <div>
              <TextField
                id="appt_date"
                label="Appt Date"
                margin="dense"
                variant="outlined"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
              />
            </div>
            <div>
            {this.state.locations ? (
              <TextField
                id="provider"
                label="Select Provider"
                margin="dense"
                select
                SelectProps={{ native: true }}
                variant="outlined">

                {this.state.providers.map(option => (
                  <option
                    key={option.id}
                    value={option.id}
                  >
                    {option.name}
                  </option>
                ))}
              </TextField>
              ):(
                <TextField
                  id="location"
                  label="Select Location"
                  margin="dense"
                  select
                  SelectProps={{ native: true }}
                  variant="outlined">
                    <option
                      key="-1"
                      value="-1"
                    >

                    </option>
                </TextField>
              )}
            </div>
            <div>
            {this.state.locations ? (
            <TextField
              id="location"
              label="Select Location"
              margin="dense"
              select
              SelectProps={{ native: true }}
              variant="outlined">

              {this.state.locations.map(option => (
                <option
                  key={option.id}
                  value={option.id}
                >
                  {option.name}
                </option>
              ))}
            </TextField>
            ):(
              <TextField
                id="location"
                label="Select Location"
                margin="dense"
                select
                SelectProps={{ native: true }}
                variant="outlined">
                  <option
                    key="-1"
                    value="-1"
                  >

                  </option>
              </TextField>
            )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleAddApptCancel} id="cancel" color="primary">
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

AddAppt.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddAppt);
