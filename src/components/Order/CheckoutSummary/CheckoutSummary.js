import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.module.css';

const CheckoutSummary = props => {
  return(
    <div className={classes.CheckoutSummary}>
      <h1>ENJOY!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients} />
      </div>

      <Button btnType="Danger" clicked={props.checkoutCancel}>CANCEL ORDER</Button>
      <Button btnType="Success" clicked={props.checkoutContinue}>CONTINUE ORDER</Button>
    </div>
  )
}

export default CheckoutSummary