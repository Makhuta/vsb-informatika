import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import QuizGenerator from '@site/src/components/QuizGenerator';
import questionsData from './questions.json'; // Importujte JSON soubor s otázkami


import styles from './main.module.css';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  const quizGenerator = QuizGenerator(questionsData, "BOZP", 30);
  return (
      <Layout
      title={`${siteConfig.title}`}
      description="<head />">
      <main>
        {quizGenerator}
      </main>
    </Layout>
  );
}
