import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

async function getDeadlines(filename, siteConfig) {
  const page = `${siteConfig.customFields.rawSourceURL}/${siteConfig.customFields.dataProjectName}/main/deadlines/${filename}`;
  const response = await fetch(page);
  const data = await response.json();
  return data;
}

function returningDate(timestamp) {
  var date = new Date(timestamp * 1000)
  var day = date.getDate()
  var month = date.getMonth() + 1
  var year = date.getFullYear()

  return [day, month, year].join(". ")
}

function filteringDeadlines(deadlines) {
  var output = deadlines.filter(deadline => deadline.timestamp * 1000 > Date.now());
  output = output.sort((a, b) => {
    return a.timestamp - b.timestamp;
  });
  return output.length === 0 ? [{subject: "Not yet added", description: "Nothing to worry about", timestamp: Date.now() / 1000}] : output;
}

function generateDeadlines(list) {
  return filteringDeadlines(list).map((deadline, idx) => (
    <div key={idx} className={styles.deadline_item}>
      <b className={clsx(styles.deadline_item_data, styles.deadlineHeader)}>{deadline.subject}</b>
      <b className={clsx(styles.deadline_item_data, styles.deadlineDescription)}>{deadline.description}</b>
      <b className={styles.deadline_item_data}>{returningDate(deadline.timestamp)}</b>
    </div>
  ));
}

export default function HomepageFeatures() {
  const {siteConfig} = useDocusaurusContext();
  const [selectedTab, setSelectedTab] = useState('1');
  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const filename = `${selectedTab}_year.json`;
    getDeadlines(filename, siteConfig)
      .then(data => {
        setDeadlines(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [selectedTab, siteConfig]);

  const renderContent = () => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return generateDeadlines(deadlines);
  };

  return (
    <div className={clsx('container', styles.tabsContainer)}>
      <div className={styles.tabs}>
        <button
          className={clsx(styles.tabButton, {
            [styles.active]: selectedTab === '1',
          })}
          onClick={() => setSelectedTab('1')}
        >
          1. Year
        </button>
        <button
          className={clsx(styles.tabButton, {
            [styles.active]: selectedTab === '2',
          })}
          onClick={() => setSelectedTab('2')}
        >
          2. Year
        </button>
        <button
          className={clsx(styles.tabButton, {
            [styles.active]: selectedTab === '3',
          })}
          onClick={() => setSelectedTab('3')}
        >
          3. Year
        </button>
      </div>
      <div className={styles.tabContent}>{renderContent()}</div>
    </div>
  );
}