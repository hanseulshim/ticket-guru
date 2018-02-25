import React, { Component } from 'react';
import styles from '../../styles/sectionContainerStyle';

import Select from 'react-select';
import '../../styles/react-select.css';

class CustomerContainer extends Component {
  createCustomerSelect = (customer) => {
    return {
      value: customer.id,
      label: `${customer.firstName} ${customer.lastName}`
    }
  }

  render() {
    const { customers, selectCustomer, selectedCustomer } = this.props;

    const customerList = customers.map(this.createCustomerSelect);
    const value = selectedCustomer && selectedCustomer.id;
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>
          Select a Customer
        </h1>
        <Select
          name="form-field-name"
          value={value}
          onChange={selectCustomer}
          options={customerList}
        />
      </div>
    )
  }
}
 
export default CustomerContainer;