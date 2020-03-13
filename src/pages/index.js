/*
 * @Description: 
 * @Version: 2.0
 * @Autor: 刘林
 * @Date: 2020-03-12 17:26:34
 * @LastEditors: 刘林
 * @LastEditTime: 2020-03-12 20:05:43
 */
import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import { Redirect } from '@docusaurus/router';


function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <Redirect to={useBaseUrl('blog/')} />
    </Layout>
  );
}

export default Home;
