import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography, TableContainer, Table, TableRow, TableCell } from '@mui/material';

const Users = () => {
  const users = useSelector(state => state.users);

  return (
    <>
      <Typography sx={{ marginTop: '1rem' }} variant='h6'>Users</Typography>
      <TableContainer>
        <Table>
          <TableRow>
            <TableCell></TableCell>
            <TableCell sx={{ fontWeight: 700 }}>blogs created</TableCell>
          </TableRow>
          {users.map(user => {
            return (
              <TableRow key={user.id}>
                <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            );
          })}
        </Table>
      </TableContainer>
    </>
  );
};

export default Users;