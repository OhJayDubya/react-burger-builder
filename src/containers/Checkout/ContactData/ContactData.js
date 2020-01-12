import React, { Component } from "react";
import { connect } from 'react-redux';

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler"
import * as actions from '../../../store/actions'
import { updateObject, checkValidity } from '../../../shared/utility'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      postcode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Postcode"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
          maxLength: 8
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your E-Mail"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest"
      }
    },
    formValid: false
  };

  orderHandler = event => {
    event.preventDefault();

    const formData = {};

    for (let formElementIndetifier in this.state.orderForm) {
      formData[formElementIndetifier] = this.state.orderForm[
        formElementIndetifier
      ].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    };

    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangedHandler = (event, inputIdentifier) => {

    const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
      touched: true
    })

    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormElement
    })

    let formValid = true;

    for (let inputIdentifier in updatedOrderForm) {
      if (updatedOrderForm[inputIdentifier].valid !== undefined) {
        formValid = updatedOrderForm[inputIdentifier].valid && formValid
      }
    }

    this.setState({ orderForm: updatedOrderForm, formValid: formValid });
  };

  render() {
    const fromElementsArray = [];

    for (let key in this.state.orderForm) {
      fromElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {fromElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}

        <Button btnType="Success" disabled={!this.state.formValid}>ORDER</Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Add Contact Details</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(ContactData, axios));
