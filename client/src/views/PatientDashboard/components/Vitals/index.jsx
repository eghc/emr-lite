import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Typography } from '@material-ui/core';

// Material icons
import {
  ArrowUpward as ArrowUpwardIcon,
  PeopleOutlined as PeopleIcon
} from '@material-ui/icons';

// Shared components
import { Paper } from 'components';

// Component styles
import styles from './styles';

class Vitals extends Component {

  constructor(){
    super();
    this.state = {
      height: null,
      weight: null,
      bodytemp: null,
      heartrate: null,
      blood: null,
      resprate: null,
      AddVital: false
    }

  }

  createData(patientVital){
    return {
      height: patientVital.height,
      weight: patientVital.weight,
      bodytemp: patientVital.bodytemp,
      heartrate: patientVital.heartrate,
      blood: patientVital.blood,
      resprate: patientVital.resprate
    }
  }

  componentDidMount(){
    //console.log(this.props);
    if(this.props.patientVital){
      let tempData = this.createData(this.props.patientVital);
      console.log(tempData);
      this.setState({...tempData});
    }

  }
  componentDidUpdate(prevProps){
    if(this.props.patientVital!= prevProps.patientVital){
      if(this.props.patientVital){
        let tempData = this.createData(this.props.patientVital);
        //console.log("update");
        console.log(tempData);
        this.setState({...tempData});
      }
    }
  }

  render() {
    const { classes, className, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Paper
        {...rest}
        className={rootClassName}
      >
        <div className={classes.content}>
          <div className={classes.details}>
            <Typography
              className={classes.title}
              variant="h4"
            >
              Vitals
            </Typography>
            <Typography
              className={classes.value}
              variant="body2"
            >
              Height: {this.state.height} in
            </Typography>
            <Typography
              className={classes.value}
              variant="body2"
            >
              Weight: {this.state.weight} lbs
            </Typography>
            <Typography
              className={classes.value}
              variant="body2"
            >
              Heart Rate: {this.state.heartrate} /min
            </Typography>
            <Typography
              className={classes.value}
              variant="body2"
            >
              Blood Pressure: {this.state.blood}
            </Typography>
            <Typography
              className={classes.value}
              variant="body2"
            >
              Respiratory Rate: {this.state.resprate} /min
            </Typography>
            <Typography
              className={classes.value}
              variant="body2"
            >
              Body Temp: {this.state.bodytemp} F
            </Typography>
          </div>
        </div>
      </Paper>
    );
  }
}

Vitals.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Vitals);
