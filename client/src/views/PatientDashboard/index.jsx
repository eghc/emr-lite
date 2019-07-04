import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Grid } from '@material-ui/core';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';

import axios from 'axios';

// Custom components
import {
  Contact,
  Vitals,
  Progress,
  Profile,
  AddContact,
  AddVital,
  AddAppt,
  ApptsTable,
  SalesChart,
  DevicesChart,
  ProductList
} from './components';


// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },
  item: {
    height: '100%'
  }
});

class PatientDashboard extends Component {
  constructor(){
    super();
    this.state ={
      patientId: null,
      patientData: null,
      patientContact: null,
      updateContact: false,
      patientVital: null,
      updateVital: false,
      patientFutureAppts: null,
      patientPastAppts: null,
      updateAppt: false
    }

    this.handleContactClick = this.handleContactClick.bind(this);
    this.handleAddContactCancel = this.handleAddContactCancel.bind(this);
    this.handleAddContactClose = this.handleAddContactClose.bind(this);

    this.handleVitalClick = this.handleVitalClick.bind(this);
    this.handleAddVitalCancel = this.handleAddVitalCancel.bind(this);
    this.handleAddVitalClose= this.handleAddVitalClose.bind(this);

    this.handleApptClick = this.handleApptClick.bind(this);
    this.handleAddApptCancel = this.handleAddApptCancel.bind(this);
    this.handleAddApptClose= this.handleAddApptClose.bind(this);
  }

  sortAppts(appts){
    return appts.sort(function(a, b) {
        let x = new Date(a.appt_date); var y = new Date(b.appt_date);
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  handlePatientData(data){
    return {
      firstname: data.firstname,
      middlename: data.middlename,
      lastname: data.lastname,
      gender: data.gender,
      dob: data.dob,
      id: data.id
    };
  }


  handleContactData(data){
    return {
      cellphone: data.cellphone,
      homephone: data.homephone,
      email: data.email,
      street1: data.street1,
      street2: data.street2,
      zip: data.zip,
      state: data.state
    };
  }

  handleVitalData(data){
    return {
      height: data.height? parseInt(data.height) :null,
      weight: data.weight? parseInt(data.weight) :null,
      bodytemp: data.bodytemp? parseInt(data.bodytemp) :null,
      heartrate: data.heartrate? parseInt(data.heartrate) :null,
      blood: data.blood? data.blood: null,
      resprate: data.resprate? parseInt(data.resprate) :null
    };
  }
  //
  handleApptData(data){
    return {
      id: data.id,
      provider: data.provider?
      {
        name: data.provider.name,
        id: parseInt(data.provider.id)
      } : null,
      location: data.location?
      {
        name: data.location.name,
        id: parseInt(data.location.id)
      } :null,
      appt_date: data.appt_date?  new Date(data.appt_date).toLocaleString() : null,
      status: data.status
    };
  }

  handleApptClick(){
    console.log("Appt clicked!");
    this.setState({updateAppt: true});
  }

  handleAddApptCancel(){
    this.setState({updateAppt: false});
  }

  handleAddApptClose(event){
    event.preventDefault();
    const form = event.target;
    //console.log(form);
    let data = {
      appt_date: form["appt_date"].value,
      provider: form["provider"].value,
      location: form["location"].value
    }
    //console.log(data);
    axios
      .post('/createAppt/' + this.state.patientId, data)
      .then((response) => {
        if(response.data){
          //console.log("yep");
          let today = new Date(new Date().toLocaleString("en-US", {timeZone: "UTC"}));
          //console.log("yehaw");
          // console.log(today);
          // console.log(response.data.appt_date );
          // console.log(response.data.appt_date >= today);
          // console.log(response.data.appt_date > today);
          if(new Date(response.data.appt_date) >= today){
            let tempApptData = this.state.patientFutureAppts.map(appt => {
              return this.handleApptData(appt);
            });
            tempApptData.push(this.handleApptData(response.data));
            tempApptData = this.sortAppts(tempApptData);
            this.setState({patientFutureAppts: tempApptData});
          }else{
            let tempApptData = this.state.patientPastAppts.map(appt => {
              return this.handleApptData(appt);
            });
            tempApptData.push(this.handleApptData(response.data));
            tempApptData = this.sortAppts(tempApptData);
            this.setState({patientPastAppts: tempApptData});
          }

        }
      })
      .catch(err => {
        console.error(err);
      });

    this.setState({updateAppt: false});
  }

  handleVitalClick(event){
    //console.log("Contact clicked!");
    this.setState({updateVital: true});
  }

  handleAddVitalCancel(){
    this.setState({updateVital: false});
  }

  handleAddVitalClose(event){
    event.preventDefault();
    const form = event.target;
    //console.log(form);
    let data = {
      height: form["height"].value,
      weight: form["weight"].value,
      bodytemp: form["bodytemp"].value,
      blood: form["blood"].value,
      heartrate: form["heartrate"].value,
      resprate: form["resprate"].value
    }
    //console.log(data);
    axios
      .post('/updateVital/' + this.state.patientId, data)
      .then((response) => {
        if(response.data){
          let tempVitalData = this.handleVitalData(response.data);
          this.setState({patientVital:tempVitalData });
        }
      })
      .catch(err => {
        console.error(err);
      });

    this.setState({updateVital: false});
  }

  handleContactClick(event){
    //console.log("Contact clicked!");
    this.setState({updateContact: true});
  }

  handleAddContactCancel(){
    this.setState({updateContact: false});
  }

  handleAddContactClose(event){
    event.preventDefault();
    const form = event.target;
    //console.log(form);
    let data = {
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
      .post('/updateContact/' + this.state.patientId, data)
      .then((response) => {
        if(response.data){
          let tempContactData = this.handleContactData(response.data);
          this.setState({patientContact:tempContactData });
        }
      })
      .catch(err => {
        console.error(err);
      });

    this.setState({updateContact: false});
  }


  componentDidMount(){
    const { match: { params } } = this.props;
    this.setState({patientId: params.id});

    axios
     .get('/patient/'+params.id)
     .then((response) => {
       console.log(response.data);
       let tempPatientData = this.handlePatientData(response.data.patient);

       let tempContactData = null;
       if(response.data.contact){
         tempContactData = this.handleContactData(response.data.contact);
       }

       let tempVitalData = null;
       if(response.data.vital){
         tempVitalData = this.handleVitalData(response.data.vital);
       }

       let tempFutureApptData = null;
       if(response.data.appts.future){
         tempFutureApptData = response.data.appts.future.map(appt => {
           return this.handleApptData(appt);
         });
         tempFutureApptData = this.sortAppts(tempFutureApptData);
       }

       let tempPastApptData = null;
       if(response.data.appts.past){
         tempPastApptData = response.data.appts.past.map(appt => {
           return this.handleApptData(appt);
         });
         tempPastApptData = this.sortAppts(tempPastApptData);
       }

       //console.log(tempApptData);

       this.setState({
         patientData: tempPatientData,
         patientContact: tempContactData,
         patientVital: tempVitalData,
         patientFutureAppts: tempFutureApptData,
         patientPastAppts: tempPastApptData
       });

     })
     .catch(err => {
       console.error(err);
     });
  }

  render() {
    const { classes } = this.props;
    let fullname = "";
    if(this.state.patientData){
      fullname = this.state.patientData.firstname  + " " + this.state.patientData.lastname;
    }

    return (
      <DashboardLayout title={fullname}>
        <AddContact
          open={this.state.updateContact}
          patientId = {this.state.patientId}
          handleAddContactCancel={() => this.handleAddContactCancel()}
          handleAddContactClose ={(e) => this.handleAddContactClose(e)}
          currContactData = {this.state.patientContact}
        />
        <AddVital
          open={this.state.updateVital}
          patientId = {this.state.patientId}
          handleAddVitalCancel={() => this.handleAddVitalCancel()}
          handleAddVitalClose ={(e) => this.handleAddVitalClose(e)}
          currVitalData = {this.state.patientVital}
        />
        <AddAppt
          open={this.state.updateAppt}
          patientId = {this.state.patientId}
          handleAddApptCancel={() => this.handleAddApptCancel()}
          handleAddApptClose ={(e) => this.handleAddApptClose(e)}
        />
        <div className={classes.root}>
          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <Profile
              className={classes.item}
              patientData={this.state.patientData}
              />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <Contact
              onClick={(e) => this.handleContactClick(e)}
              className={classes.item}
              patientContact={this.state.patientContact}
              />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <Vitals
              onClick={(e) => this.handleVitalClick(e)}
              className={classes.item}
              patientVital={this.state.patientVital}/>
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <Progress className={classes.item} />
            </Grid>
            <Grid
              item
              lg={3}
              md={6}
              xl={3}
              xs={12}
            >
              <ProductList className={classes.item} />
            </Grid>
            <Grid
              item
              lg={9}
              md={12}
              xl={9}
              xs={12}
            >
              <ApptsTable
              patientPastAppts = {this.state.patientPastAppts}
              patientFutureAppts = {this.state.patientFutureAppts}
              handleApptClick={() => this.handleApptClick()}
              className={classes.item} />
            </Grid>
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <SalesChart className={classes.item} />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <DevicesChart className={classes.item} />
            </Grid>

          </Grid>
        </div>
      </DashboardLayout>
    );
  }
}

PatientDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PatientDashboard);
