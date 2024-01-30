import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import DeadlineFeatures from '@site/src/components/DeadlineFeatures';

import DeadlinesList1Year from './lists/deadlines_list_1_year.json';
import DeadlinesList2Year from './lists/deadlines_list_2_year.json';
import DeadlinesList3Year from './lists/deadlines_list_3_year.json';

import styles from './main.module.css';

function DeadlineHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">List of deadlines for most of the subjects</p>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  const deadlines = DeadlineFeatures(DeadlinesList1Year, DeadlinesList2Year, DeadlinesList3Year)
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="<head />">
      <DeadlineHeader />
      <main>
        {deadlines}
      </main>
    </Layout>
  );
}
