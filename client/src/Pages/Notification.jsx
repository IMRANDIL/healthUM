import React from 'react'
import Layout from '../components/Layout';
import {Tabs} from 'antd';


const Notification = () => {
    const items = [
        { label: 'Tab 1', key: 'item-1', children: 'Content 1' },
        { label: 'Tab 2', key: 'item-2', children: 'Content 2' },
      ];

  return (
   <Layout>
    <h1 className="page-title">Notifications</h1>
    <Tabs items={items}/>
   </Layout>
  )
}

export default Notification