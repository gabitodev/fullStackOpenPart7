import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = {
    display: visible ? 'none' : 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '1rem',
  };
  const showWhenVisible = {
    display: visible ? 'flex' : 'none',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '1rem',
  };

  const toggleVisibility = () => setVisible(!visible);

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button sx={{ width: '30%' }} variant="contained"  id="showButton" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button sx={{ width: '30%' }} variant="contained" onClick={toggleVisibility}>Cancel</Button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
