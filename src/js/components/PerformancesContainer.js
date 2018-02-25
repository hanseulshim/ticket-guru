import React, { Component } from 'react';
import styles from '../../styles/sectionContainerStyle';

import Select from 'react-select';
import '../../styles/react-select.css';

class PerformancesContainer extends Component {
  createPerformanceList = (performance) => {
    const date = new Date(performance.showTime);
    window.date = date;
    console.log('date', date);
    return {
      value: performance.id,
      label: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} at ${date.toLocaleTimeString('en-US')}`
    }
  }

  render() {
    const { performances, selectedPerformance, selectPerformance } = this.props;

    const performanceList = performances.map(this.createPerformanceList);
    const performanceValue = selectedPerformance && selectedPerformance.id;

    return (
      <div style={styles.container}>
        <h1 style={styles.title}>
          Select a Performance
        </h1>
        <Select
          name="form-field-name"
          value={performanceValue}
          onChange={selectPerformance}
          options={performanceList}
        />
      </div>
    )
  }
}
 
export default PerformancesContainer;