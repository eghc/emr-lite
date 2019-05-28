import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { CircularProgress, Typography } from '@material-ui/core';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';

// Shared services
import { getUsers } from 'services/user';

// Custom components
import { UsersToolbar, UsersTable } from './components';

// Component styles
import styles from './style';

class UserList extends Component {
  signal = true;
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      limit: 40,
      users: [],
      selectedUsers: [],
      searchedUsers: [],
      error: null
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  //
  // async getUsers() {
  //   try {
  //     this.setState({ isLoading: true });
  //
  //     const { limit } = this.state;
  //
  //     const { users } = await getUsers(limit);
  //
  //     if (this.signal) {
  //       this.setState({
  //         isLoading: false,
  //         users
  //       });
  //     }
  //   } catch (error) {
  //     if (this.signal) {
  //       this.setState({
  //         isLoading: false,
  //         error
  //       });
  //     }
  //   }
  // }


  componentDidMount() {
    this.signal = true;
    //this.getUsers();

    //this.setState({ isLoading: true });
    //console.log(this.state.limit);
    this.setState({ isLoading: true });
    this.getPatients(0,this.state.limit)
      .then((res) => {
        this.setState({ users: res});
        console.log(res);
        this.setState({ isLoading: false});
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });

  }

  async getPatients (begin, limit){
    const response = await fetch('/getPatients/' + begin + '/'+ limit );
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  async getSearchPatients (query){
    const response = await fetch('/getPatients/' + query);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  componentDidUpdate(){
    console.log(this.state.users);
  }

  // componentWillUpdate(){
  //   if(this.state.isQuerying){
  //     this.getSearchPatients(this.state.query)
  //       .then((res) => {
  //         console.log(res);
  //         this.setState({ users: res});
  //         this.setState({isQuerying: false});
  //
  //       })
  //       .catch((err) => {
  //         this.setState({isQuerying: false});
  //         console.log(err);
  //       });
  //   }
    //this.getUsers();

    //this.setState({ isLoading: true });
    //console.log(this.state.limit)
  //}

  handleKeyDown(e) {
    const that = this;
    if (e.key === 'Enter') {
      //console.log('do validate');
      let value = e.target.value;
      //check if value is empty
      if(value === ""){
        this.getPatients(0,this.state.limit)
        .then((res) =>{
          //console.log(res);
          this.setState({users: res});

        });
      }else{
        //console.log(value);
        //this.setState({query: value});
        // this.setState({isQuerying: true});

        this.getSearchPatients(value)
        .then((res) =>{
          //console.log(res);
          this.setState({users: res}, ()=>{
            console.log(this.state.users)
          });

        });
      }

      // this.getSearchPatients(value)
      //   .then((res) => {
      //     this.setState({ users: res});
      //     console.log(res);
      //     //this.setState({ isLoading: false});
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     //this.setState({ isLoading: false });
      //   });
    }
  };

  componentWillUnmount() {
    this.signal = false;
  }

  handleSelect = selectedUsers => {
    this.setState({ selectedUsers });
  };

  renderUsers() {
    const { classes } = this.props;
    const { isLoading, error, users } = this.state;

    //let users = this.state.searchedUsers.length == 0 ? this.state.users : this.state.searchedUsers;
    //console.log(users);

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (error) {
      return <Typography variant="h6">{error}</Typography>;
    }

    if (users.length === 0) {
      return <Typography variant="h6">There are no users</Typography>;
    }



    return (
      <UsersTable
        //
        onSelect={this.handleSelect}
        users= {users}
      />
    );
  }

  render() {
    const { classes } = this.props;
    const { selectedUsers } = this.state;

    return (
      <DashboardLayout title="Patients">
        <div className={classes.root}>
          <UsersToolbar selectedUsers={selectedUsers} handleKeyDown={this.handleKeyDown} />
          <div className={classes.content}>{this.renderUsers()}</div>
        </div>
      </DashboardLayout>
    );
  }
}

UserList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserList);
