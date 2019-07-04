import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Typography } from '@material-ui/core';

import {AddContact} from './AddContact'

// Material icons
import {
  ArrowDownward as ArrowDownwardIcon,
  Money as MoneyIcon
} from '@material-ui/icons';

// Shared components
import { Paper } from 'components';

// Component styles
import styles from './styles';

class Contact extends Component {
  constructor(){
    super();
    this.state = {
      email: null,
      homephone: null,
      cellphone: null,
      street1: null,
      street2: null,
      state: null,
      zip: null,
      AddContact: false

    }

  }

  createData(patientContact){
    return {
      email: patientContact.email,
      homephone: patientContact.homephone,
      cellphone: patientContact.cellphone,
      street1: patientContact.street1,
      street2: patientContact.street2,
      state: patientContact.state,
      zip: patientContact.zip
    }
  }

  componentDidMount(){
    //console.log(this.props);
    if(this.props.patientContact){
      let tempData = this.createData(this.props.patientContact);
      console.log(tempData);
      this.setState({...tempData});
    }

  }
  componentDidUpdate(prevProps){
    if(this.props.patientContact != prevProps.patientContact){
      if(this.props.patientContact){
        let tempData = this.createData(this.props.patientContact);
        //console.log("update");
        console.log(tempData);
        this.setState({...tempData});
      }
    }
  }

  render() {
    const { classes, className, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    if(this.state.AddContact){

    }

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
              Contact
            </Typography>
            <Typography
              className={classes.value}
              variant="body2"
            >
              Home Phone: {this.state.homephone}
            </Typography>
            <Typography
              className={classes.value}
              variant="body2"
            >
              Cell Phone: {this.state.cellphone}
            </Typography>
            <Typography
              className={classes.value}
              variant="body2"
            >
              Email: {this.state.email}
            </Typography>
            <Typography
              className={classes.value}
              variant="body2"
            >
              Address: {this.state.street1} {this.state.street2} {this.state.state}, {this.state.zip}
            </Typography>
          </div>
        </div>
      </Paper>
    );
  }
}

Contact.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Contact);
