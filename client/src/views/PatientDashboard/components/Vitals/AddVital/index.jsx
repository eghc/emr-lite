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



class AddVital extends Component {
  constructor(){
    super();
    this.state = {
      history: false,
      historyData: null,
      currVitalData: null
    }
    this.handleAddVitalHistory = this.handleAddVitalHistory.bind(this);
  }

  componentDidMount(){
    //console.log(this.props);
    if(this.props.currVitalData){
      this.setState({currVitalData: this.props.currVitalData});
    }

  }
  componentDidUpdate(prevProps){
    if(this.props.currVitalData != prevProps.currVitalData){
      if(this.props.currVitalData){
        this.setState({currVitalData: this.props.currVitalData});
      }
    }
  }

  handleAddVitalHistory(){

    if(this.state.history){
      //if already looking at the history, go back to form
      this.setState({history: false});
    }
    else{
      axios
       .get('/getVitals/'+this.props.patientId)
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
                Height: {item.height}
              </div>
              <div>
                Weight: {item.weight}
              </div>
              <div>
                Body Temp: {item.bodytemp} F
              </div>
              <div>
                Blood Pressure: {item.blood}
              </div>
              <div>
                Heart Rate: {item.heartrate} /min
              </div>
              <div>
                Respiratory Rate: {item.resprate} /min
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
              id="height"
              label="Height - In"
              margin="dense"
              variant="outlined"
              type="number"
              InputLabelProps={{ shrink: true }}
              defaultValue = {this.state.currVitalData ? this.state.currVitalData.height : null}
            />
          </div>
          <div>
            <TextField
              id="weight"
              label="Weight - Lbs"
              margin="dense"
              variant="outlined"
              type="number"
              InputLabelProps={{shrink: true }}
              defaultValue = {this.state.currVitalData ? this.state.currVitalData.weight : null}
            />
          </div>
          <div>
            <TextField
              id="bodytemp"
              label="Body Tempurature - F"
              margin="dense"
              variant="outlined"
              type="number"
              InputLabelProps={{ shrink: true }}
              defaultValue = {this.state.currVitalData ? this.state.currVitalData.bodytemp : null}
            />
          </div>
          <div>
            <TextField
              id="blood"
              label="Blood Pressure"
              margin="dense"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              defaultValue = {this.state.currVitalData ? this.state.currVitalData.blood : null}
            />
          </div>
          <div>
            <TextField
              id="heartrate"
              label="Heart Rate - Beats per Min"
              margin="dense"
              variant="outlined"
              type="number"
              InputLabelProps={{shrink: true }}
              defaultValue = {this.state.currVitalData ? this.state.currVitalData.heartrate : null}
            />
          </div>
          <div>
            <TextField
              id="resprate"
              label="Respiratory Rate - Breaths per Min"
              margin="dense"
              variant="outlined"
              type="number"
              InputLabelProps={{ shrink: true }}
              defaultValue = {this.state.currVitalData ? this.state.currVitalData.resprate : null}
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
          <form onSubmit ={this.props.handleAddVitalClose} noValidate>
          <DialogTitle id="form-dialog-title">
            <Typography variant='subtitle1'>
              Update Vitals
            </Typography>
          </DialogTitle>

          <DialogContent>
            {dialogContents}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleAddVitalHistory} id="history" color="primary">
              {this.state.history? (
                <div>Back</div>
              ):(
                <div>History</div>
              )}
            </Button>
            <Button onClick={this.props.handleAddVitalCancel} id="cancel" color="primary">
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

AddVital.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddVital);
