import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Alert } from '@mui/material';

const Notification = () => {
  const notification = useSelector(state => state.notification);
  if (!notification) return null;

  return (
    <div>
      {notification.isError ? (
        <Alert severity='error'>
          {notification.message}
        </Alert>
      ) : (
        <Alert severity='success'>
          {notification.message}
        </Alert>
      )}
    </div>
  );
};

Notification.displayName = 'Notification';

Notification.propTypes = {
  notification: PropTypes.object,
};

export default Notification;
