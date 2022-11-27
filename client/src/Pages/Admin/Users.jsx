import React from 'react';
import Layout from '../../components/Layout'

const Users = () => {
  return (
    <Layout>
       
        <div className='inputContainer'>
        <h1 className='page-title'>All Users:</h1>
            <input type="text" placeholder='Search Users Here'/>
        </div>
    </Layout>
  )
}

export default Users