import React, { Component, Fragment } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Grid, Typography as TypographyComponent } from '@material-ui/core';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  }
});

const variants = {
  h1: 'Under Construction',
  h2: 'Under Construction',
  h3: 'Under Construction',
  h4: 'Under Construction',
  h5: 'Under Construction',
  h6: 'Under Construction',
  subtitle1: 'Under Construction Under Construction Under Construction Under Construction',
  subtitle2: 'Under Construction Under Construction Under Construction Under Construction',
  body1:
    'Under Construction Under Construction Under Construction Under Construction. Under Construction Under Construction Under Construction Under Construction. Under Construction Under Construction Under Construction Under Construction.',
  body2:
  'Under Construction Under Construction Under Construction Under Construction. Under Construction Under Construction Under Construction Under Construction. Under Construction Under Construction Under Construction Under Construction.',
  caption: 'Under Construction',
  button: 'Under Construction'
};

class Typography extends Component {
  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="Dashboard">
        <div className={classes.root}>
          <Grid
            container
            spacing={4}
          >
            {Object.keys(variants).map((key, i) => (
              <Fragment key={i}>
                <Grid
                  item
                  sm={3}
                  xs={12}
                >
                  <TypographyComponent variant="caption">
                    {key}
                  </TypographyComponent>
                </Grid>
                <Grid
                  item
                  sm={9}
                  xs={12}
                >
                  <TypographyComponent variant={key}>
                    {variants[key]}
                  </TypographyComponent>
                </Grid>
              </Fragment>
            ))}
          </Grid>
        </div>
      </DashboardLayout>
    );
  }
}

Typography.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Typography);
