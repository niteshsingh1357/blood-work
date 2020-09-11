import React from 'react';

export default function DebugForm({ values, errors, touched }) {
  return (
    <div className='d-flex mt-5'>
      <pre
        className='container-fluid'
        style={{
          background: '#f6f8fa',
          fontSize: '.65rem',
          padding: '.5rem',
        }}
      >
        <span>
          <strong>values:</strong>
        </span>{' '}
        {JSON.stringify(values, null, 2)}
        <br />
        <span>
          <strong>errors:</strong>
        </span>{' '}
        {JSON.stringify(errors, null, 2)}
        <br />
        <span>
          <strong>touched:</strong>
        </span>{' '}
        {JSON.stringify(touched, null, 2)}
      </pre>
    </div>
  );
}
