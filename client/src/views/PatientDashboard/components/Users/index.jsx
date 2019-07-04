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
              Height: 5'11"
            </Typography>
            <Typography
              className={classes.value}
              variant="body2"
            >
              Weight: 183 lbs
            </Typography>
            <Typography
              className={classes.value}
              variant="body2"
            >
              Heart Rate: 75
            </Typography>
            <Typography
              className={classes.value}
              variant="body2"
            >
              Blood Pressure: 125/80
            </Typography>
            <Typography
              className={classes.value}
              variant="body2"
            >
              Respiratory Rate: 15 /min
            </Typography>
            <Typography
              className={classes.value}
              variant="body2"
            >
              Body Temp: 98 F
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
