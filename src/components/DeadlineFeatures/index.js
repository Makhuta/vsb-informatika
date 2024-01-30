import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

function returningDate(timestamp) {
  var date = new Date(timestamp * 1000)
  var day = date.getDate()
  var month = date.getMonth() + 1
  var year = date.getFullYear()

  return [day, month, year].join(". ")
}

function filteringDeadlines(deadlines) {
  var output = deadlines.filter(deadline => deadline.timestamp * 1000 > Date.now())
  output = output.sort((a, b) => {
    return a.timestamp - b.timestamp;
  })
  return output.length == 0 ? [{subject: "Not yet added", description: "Nothing to worry about", timestamp: Date.now() / 1000}] : output;
}

export default function HomepageFeatures(DeadlinesList1Year, DeadlinesList2Year, DeadlinesList3Year) {
  return (
    <section className={styles.featuresMain}>

      <div className={styles.features}>
        <div className={styles.deadlineHeaderContainer}>
          <div className={styles.deadline_item}>
            <b className={styles.deadline_header}>1. Year</b>
          </div>
        </div>

        <div className={styles.deadlineHeaderContainer}>
          <div className={styles.deadline_item}>
            <b className={styles.deadline_header}>2. Year</b>
          </div>
        </div>
        
        <div className={styles.deadlineHeaderContainer}>
          <div className={styles.deadline_item}>
            <b className={styles.deadline_header}>3. Year</b>
          </div>
        </div>  
      </div>


      <div className={styles.features}>
        <div className={styles.Container}>

          {filteringDeadlines(DeadlinesList1Year).map((deadline, idx) => (
            <div className={styles.deadline_item}>
              <b className={styles.deadline_item_data}>{deadline.subject}</b>
              <b className={styles.deadline_item_data + ", " + styles.deadlineDescription}>{deadline.description}</b>
              <b className={styles.deadline_item_data}>{returningDate(deadline.timestamp)}</b>

            </div>
          ))}
        </div>

        <div className={styles.Container}>

          {filteringDeadlines(DeadlinesList2Year).map((deadline, idx) => (
            <div className={styles.deadline_item}>
              <b className={styles.deadline_item_data}>{deadline.subject}</b>
              <b className={styles.deadline_item_data + ", " + styles.deadlineDescription}>{deadline.description}</b>
              <b className={styles.deadline_item_data}>{returningDate(deadline.timestamp)}</b>

            </div>
          ))}
        </div>

        <div className={styles.Container}>

          {filteringDeadlines(DeadlinesList3Year).map((deadline, idx) => (
            <div className={styles.deadline_item}>
              <b className={styles.deadline_item_data}>{deadline.subject}</b>
              <b className={styles.deadline_item_data + ", " + styles.deadlineDescription}>{deadline.description}</b>
              <b className={styles.deadline_item_data}>{returningDate(deadline.timestamp)}</b>

            </div>
          ))}
        </div>
      </div>
    </section >
  );
}