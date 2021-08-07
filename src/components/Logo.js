import PropTypes from 'prop-types';
// material
import { Box } from '@material-ui/core';
import Realback from '../images/realback.png';
// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return <Box component="img" src={Realback} sx={{ width: 40, height: 40, ...sx }} />;
}
