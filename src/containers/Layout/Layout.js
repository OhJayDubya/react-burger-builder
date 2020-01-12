import React, { Component } from "react";
import { connect } from 'react-redux';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {

  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  };

  sideDrawerOpenHandler = () => {
    this.setState({showSideDrawer: true});
  }

  render() {
    return (
      <>
        <Toolbar open={this.sideDrawerOpenHandler} isAuth={this.props.isAuthenticated} />
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} isAuth={this.props.isAuthenticated} />
        <main className={classes.Content}>{this.props.children}</main>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);
