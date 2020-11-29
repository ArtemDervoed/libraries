import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
<Spin />

const DetailsPage = ({ match }) => {
  const isLoaded = useSelector(state => state.isLoaded);
  const info = useSelector(state => state.libraries.filter(i => i.order === Number(match.params.order)));

  const renderInfo = React.useCallback(isLoaded => {
    if (isLoaded) {
      return info.map(item =>
        <pre key={item.order}>
          { JSON.stringify(item, null, 2) }
        </pre>
      )
    }
    return <Spin />
  }, [info]);

  return (
    <div>
      {
        renderInfo(isLoaded)
      }
    </div>
  );
};

DetailsPage.propTypes = {
  match: PropTypes.object.isRequired,
}

export default DetailsPage;