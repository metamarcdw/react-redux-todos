import React from 'react';
import PropTypes from 'prop-types';
import { RingLoader } from 'react-spinners';

export function Spinner(props) {
  const { loading } = props;
  if (!loading)
    return null;

  return (
    <div className='d-flex justify-content-center align-items-center'>
      <RingLoader
        color='#999'
        size={42}
        loading={loading} />
      Loading..
    </div>
  );
}

Spinner.propTypes = {
  loading: PropTypes.bool.isRequired
};
