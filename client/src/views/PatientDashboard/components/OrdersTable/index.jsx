import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel
} from '@material-ui/core';
import Box from '@material-ui/core/Box';

// Shared services
import { getOrders } from 'services/order';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletToolbar,
  PortletContent,
  Status
} from 'components';

// Component styles
import styles from './styles';

const statusColors = {
  delivered: 'success',
  pending: 'info',
  refund: 'danger'
};

class ApptsTable extends Component {
  signal = false;

  state = {
    isLoading: false,
    limit: 10,
    orders: [],
    ordersTotal: 0
  };

  async getOrders(limit) {
    try {
      this.setState({ isLoading: true });

      const { orders, ordersTotal } = await getOrders(limit);

      if (this.signal) {
        this.setState({
          isLoading: false,
          orders,
          ordersTotal
        });
      }
    } catch (error) {
      if (this.signal) {
        this.setState({
          isLoading: false,
          error
        });
      }
    }
  }

  componentDidMount() {
    this.signal = true;

    const { limit } = this.state;

    this.getOrders(limit);
  }

  componentWillUnmount() {
    this.signal = false;
  }

  render() {
    const { classes, className } = this.props;
    const { isLoading, orders, ordersTotal } = this.state;

    const rootClassName = classNames(classes.root, className);
    const showOrders = !isLoading && orders.length > 0;

    return (
      <Portlet className={rootClassName}>
        <PortletHeader>
        <PortletToolbar>
          <Box display="flex" p={1} bgcolor="background.paper">
            <Button
              color="primary"
              size="small"
              variant="outlined"
            >
              <PortletLabel
                title="Appointments"
                color="primary"
              />
            </Button>
          </Box>
          <Box display="flex" p={1} bgcolor="background.paper">
            <Button
              color="primary"
              size="small"
            >
              <PortletLabel
                title="Referrals"
                color="primary"
              />
            </Button>
          </Box>
          <Box display="flex" p={1} bgcolor="background.paper">
            <Button
              color="primary"
              size="small"
            >
              <PortletLabel
                title="Lab Results"
                color="primary"
              />
            </Button>
          </Box>
        </PortletToolbar>
          <PortletToolbar>
            <Button
              className={classes.newEntryButton}
              color="primary"
              size="small"
              variant="outlined"
            >
              +
            </Button>
          </PortletToolbar>
        </PortletHeader>
        <PerfectScrollbar>
          <PortletContent
            className={classes.portletContent}
            noPadding
          >
            {isLoading && (
              <div className={classes.progressWrapper}>
                <CircularProgress />
              </div>
            )}
            {showOrders && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Appt ID</TableCell>
                    <TableCell align="left">Provider</TableCell>
                    <TableCell
                      align="left"
                      sortDirection="desc"
                    >
                      <Tooltip
                        enterDelay={300}
                        title="Sort"
                      >
                        <TableSortLabel
                          active
                          direction="desc"
                        >
                          Date
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="left">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map(order => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={order.id}
                    >
                      <TableCell>{order.id}</TableCell>
                      <TableCell className={classes.customerCell}>
                        {order.customer.name}
                      </TableCell>
                      <TableCell>
                        {moment(order.createdAt).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>
                        <div className={classes.statusWrapper}>
                          <Status
                            className={classes.status}
                            color={statusColors[order.status]}
                            size="sm"
                          />
                          {order.status}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </PortletContent>
        </PerfectScrollbar>
      </Portlet>
    );
  }
}

ApptsTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ApptsTable);
