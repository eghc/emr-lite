import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Avatar,Typography } from '@material-ui/core';

// Material icons
import { AttachMoney as AttachMoneyIcon } from '@material-ui/icons';

// Shared components
import { Paper } from 'components';

// Component styles
import styles from './styles';

class Profile extends Component {
  constructor(){
    super();
    this.state = {
      firstname: null,
      middlename: null,
      lastname: null,
      gender: null,
      dob: null,
      id: null

    }
  }

  createData(patientData){
    return {
      firstname: patientData.firstname,
      middlename: patientData.middlename,
      lastname: patientData.lastname,
      gender: patientData.gender,
      dob: patientData.dob.substring(0, 10),
      id: patientData.id
    }
  }

  componentDidMount(){
    //console.log(this.props);
    if(this.props.patientData){
      let tempData = this.createData(this.props.patientData);
      console.log(tempData);
      this.setState({...tempData});
    }

  }
  componentDidUpdate(prevProps){
    if(this.props.patientData != prevProps.patientData){
      if(this.props.patientData){
        let tempData = this.createData(this.props.patientData);
        console.log("update");
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
      <Avatar
        alt="Romaine Kutepov"
        className={classes.avatar}
        src="/images/avatars/avatar_6.png"
      />
      </div>
        <div className={classes.content}>

          <div className={classes.details}>

            <Typography
              className={classes.title}
              variant="h3"
            >
            {this.state.firstname} {this.state.lastname}
            </Typography>
            <Typography
              className={classes.title}
              variant="body2"
            >
            Patient ID: {this.state.id}
            </Typography>

            <Typography
              className={classes.title}
              variant="body2"
            >
            Birthday: {this.state.dob}
            </Typography>

            <Typography
              className={classes.title}
              variant="body2"
            >
            Gender: {this.state.gender}
            </Typography>

          </div>

        </div>
      </Paper>
    );
  }
}

Profile.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
