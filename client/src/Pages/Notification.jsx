import React from 'react'
import Layout from '../components/Layout';
import {Tabs} from 'antd';


const Notification = () => {
    const items = [
        { label: 'Unseen', key: 'item-1', children: 'Unseen' },
        { label: 'Seen', key: 'item-2', children: 'Seen' },
      ];

  return (
   <Layout>
    <h1 className="page-title">Notifications</h1>
    <Tabs items={items} />
   </Layout>
  )
}

export default Notification