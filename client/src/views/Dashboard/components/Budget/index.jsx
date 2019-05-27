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
  ArrowDownward as ArrowDownwardIcon,
  Money as MoneyIcon
} from '@material-ui/icons';

// Shared components
import { Paper } from 'components';

// Component styles
import styles from './styles';

class Budget extends Component {
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
              Contact
            </Typography>
            <Typography
              className={classes.value}
              variant="body2"
            >
              Cell Phone: (555) 555 - 5555
            </Typography>
            <Typography
              className={classes.value}
              variant="body2"
            >
              Home Phone: (555) 555 - 5555
            </Typography>
            <Typography
              className={classes.value}
              variant="body2"
            >
              Email: romaine@gmail.com
            </Typography>
            <Typography
              className={classes.value}
              variant="body2"
            >
              Address: 1234 Disney Dr. Toon Town, CA 90000
            </Typography>
          </div>
        </div>
      </Paper>
    );
  }
}

Budget.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Budget);
