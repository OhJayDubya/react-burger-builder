import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { connect } from "react-redux";

import ContactData from "./ContactData/ContactData";

class Checkout extends Component {

  checkoutCancelHandler = () => this.props.history.goBack();

  checkoutContinueHandler = () =>
    this.props.history.replace("/checkout/contact-data");

  render() {
    let summary = <Redirect to="/" />;

    if (this.props.ingredients) {

      const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null

      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancel={this.checkoutCancelHandler}
            checkoutContinue={this.checkoutContinueHandler}
          />

          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }

    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
