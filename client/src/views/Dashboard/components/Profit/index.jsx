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
            Romaine Kutepov
            </Typography>
            <Typography
              className={classes.title}
              variant="body2"
            >
            Patient ID: 33333
            </Typography>
            <Typography
              className={classes.title}
              variant="body2"
            >
            Birthday: 11/01/1992
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
