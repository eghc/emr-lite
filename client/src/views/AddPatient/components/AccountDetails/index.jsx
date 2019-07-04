import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Button, TextField } from '@material-ui/core';

import axios from 'axios';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from 'components';

// Component styles
import styles from './styles';

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

// const inputParsers = {
//   firstname(input) {
//     const [month, day, year] = input.split('/');
//     return `${year}-${month}-${day}`;
//   },
//   uppercase(input) {
//     return input.toUpperCase();
//   },
//   number(input) {
//     return parseFloat(input);
//   },
// };

class Account extends Component {
  constructor() {
    super();
    this.state = {
      done: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (e) {
    this.setState({
      state: e.target.value
    });
  }

  handleSubmit (event){
    event.preventDefault();
    const form = event.target;
    //console.log(form);
    let data = {
      firstName: form["firstname"].value,
      middleName: form["middlename"].value,
      lastName: form["lastname"].value,
      gender: form["gender"].value,
      dob: new Date(form["dob"].value),
      email: form["email"].value,
      homephone: form["homephone"].value,
      cellphone: form["cellphone"].value,
      street1: form["street1"].value,
      street2: form["street2"].value,
      state: form["state"].value,
      zip: form["zip"].value
    }
    //console.log(data);
    axios
     .post('/addPatientToEmr', data)
     .then(() => {
       console.log('Created!');
       this.setState({done:true});
     })
     .catch(err => {
       console.error(err);
     });


  }

  render() {
    const { classes, className, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    if(this.state.done){
      return(
      <Redirect
        exact
        from="/"
        to="/patients"
      />);
    }

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
      <form

        noValidate
        onSubmit={this.handleSubmit}
      >
        <PortletHeader>
          <PortletLabel
            title="Profile"
          />
        </PortletHeader>
        <PortletContent noPadding>

            <div className={classes.field}>
              <TextField
                id="firstname"
                name="firstname"
                className={classes.textField}
                label="First name"
                margin="dense"
                required
                variant="outlined"
              />
              <TextField
                id="middlename"
                name="middlename"
                className={classes.textField}
                label="Middle name"
                margin="dense"
                variant="outlined"
              />
              <TextField
                id="lastname"
                className={classes.textField}
                label="Last name"
                margin="dense"
                required
                variant="outlined"
              />
              <TextField
                id="dob"
                label="Birthday"
                type="date"
                required
                className={classes.textField}
                variant="outlined"
                margin="dense"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                name="gender"
                className={classes.textField}
                label="Gender"
                margin="dense"
                onChange={this.handleChange}
                required
                select
                SelectProps={{ native: true }}
                variant="outlined">
                  <option
                    value="Female"
                  >
                    Female
                  </option>
                  <option
                    value="Male"
                  >
                    Male
                  </option>
                  <option
                    value="Nonbinary"
                  >
                    Nonbinary
                  </option>
                  <option
                    value="Decline to say"
                  >
                    Decline to say
                  </option>
              </TextField>
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                id="email"
                label="Email Address"
                margin="dense"
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                id="homephone"
                label="Home Phone"
                margin="dense"
                type="number"
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                id="cellphone"
                label="Cell Phone"
                margin="dense"
                type="number"
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                id="street1"
                label="Street Address 1"
                margin="dense"
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                id="street2"
                label="Street Address 2"
                margin="dense"
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                id="state"
                label="Select State"
                margin="dense"
                onChange={this.handleChange}
                select
                SelectProps={{ native: true }}
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
                className={classes.textField}
                id="zip"
                label="Zip Code"
                margin="dense"
                variant="outlined"
              />
            </div>

        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Save details
          </Button>
        </PortletFooter>
        </form>
      </Portlet>
    );
  }
}

Account.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Account);
