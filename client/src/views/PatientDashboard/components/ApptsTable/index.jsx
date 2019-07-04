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
  completed: 'success',
  booked: 'info',
  noShow: 'danger'
};

class ApptsTable extends Component {
  constructor(){
    super();
    this.state = {
      appts: null,
      futureAppts: null,
      pastAppts: null,
      selected: [true, false, false, false]
    }
    this.handleSelect = this.handleSelect.bind(this);
  }


  componentDidMount(){
    //console.log(this.props);
    if(this.props.patientFutureAppts){
      this.setState({futureAppts: this.props.patientFutureAppts});
      this.setState({appts: this.props.patientFutureAppts});
      this.setState({selected: [true, false, false, false]});
    }
    if(this.props.patientPastAppts){
      this.setState({pastAppts: this.props.patientPastAppts});
    }

  }
  componentDidUpdate(prevProps){
    if(this.props.patientFutureAppts!= prevProps.patientFutureAppts){
      if(this.props.patientFutureAppts){
        this.setState({futureAppts: this.props.patientFutureAppts});
        this.setState({appts: this.props.patientFutureAppts});
        this.setState({selected: [true, false, false, false]});
      }
    }
    if(this.props.patientPastAppts!= prevProps.patientPastAppts){
      if(this.props.patientPastAppts){
        this.setState({pastAppts: this.props.patientPastAppts});
      }
    }
  }

  handleSelect(num){
    let newSelect = [];
    for(let i = 0; i < this.state.selected.length; i++){
      if(num == i){
        newSelect.push(true);
      }else{
        newSelect.push(false);
      }

    }
    //console.log(num);
    this.setState({selected: newSelect});

    if(num == 0){
      this.setState({appts: this.state.futureAppts});
    }else if(num == 1){
      this.setState({appts: this.state.pastAppts});
    }
  }


  render() {
    const { classes, className } = this.props;

    const rootClassName = classNames(classes.root, className);


    return (
      <Portlet className={rootClassName}>
        <PortletHeader>
        <PortletToolbar>
          <Box display="flex" p={1} bgcolor="background.paper">
            <Button
              color="primary"
              size="small"
              variant={this.state.selected[0] ? "outlined": ""}
            >
              <PortletLabel
                title="Future Appointments"
                color="primary"
                onClick={() => this.handleSelect(0)}
              />
            </Button>
          </Box>
          <Box display="flex" p={1} bgcolor="background.paper">
            <Button
              color="primary"
              size="small"
              variant= {this.state.selected[1] ? "outlined": ""}
            >
              <PortletLabel
                title="Past Appointments"
                color="primary"
                onClick={() => this.handleSelect(1)}
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

              color="primary"
              size="small"
              variant="outlined"
              onClick={this.props.handleApptClick}
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
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Appt ID</TableCell>
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
                    <TableCell align="left">Provider</TableCell>
                    <TableCell align="left">Location</TableCell>
                    <TableCell align="left">Status</TableCell>
                  </TableRow>
                </TableHead>


                  {this.state.appts? (
                    <TableBody>
                    {this.state.appts.map(appt => (
                      <TableRow
                        className={classes.tableRow}
                        hover
                        key={appt.id}
                      >
                        <TableCell>{appt.id}</TableCell>
                        <TableCell>
                          {appt.appt_date}
                        </TableCell>
                        <TableCell>
                          {appt.provider.name}
                        </TableCell>
                        <TableCell className={classes.customerCell}>
                          {appt.location.name}
                        </TableCell>
                        <TableCell>
                          <div className={classes.statusWrapper}>
                            <Status
                              color={statusColors[appt.status]}
                              size="sm"
                            />
                            {appt.status}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    </TableBody>
                  ):(
                    <TableBody>
                    <TableRow
                    >
                    <TableCell align="left"></TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left"></TableCell>
                    </TableRow>
                    </TableBody>

                  )}


              </Table>

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
