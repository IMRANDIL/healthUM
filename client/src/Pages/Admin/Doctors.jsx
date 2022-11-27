import React from 'react';
import Layout from '../../components/Layout';

const Doctors = () => {
  return (
    <Layout>
       <div className='inputContainer'>
        <h1 className='page-title'>All Doctors:</h1>
            <input type="text" placeholder='Search Doctors Here'/>
        </div>
    </Layout>
  )
}

export default Doctors