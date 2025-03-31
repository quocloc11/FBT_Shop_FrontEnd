import Box from '@mui/material/Box'
import React from 'react'
import Menu from '@mui/material/Menu';
import { useColorScheme } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Check from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Avatar from '@mui/material/Avatar';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useConfirm } from 'material-ui-confirm';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getProductAPI } from '../../apis';
import { logOutAPI } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

function Profiles() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }
  const dispatch = useDispatch()
  // const currentUser = useSelector(selectCurrentUser)
  //const currentUser = getProductAPI()
  const confirmLogout = useConfirm()


  const handleLogout = () => {
    confirmLogout({
      title: 'Log out of your account',
      description: 'Bạn có chắc chắn muốn đăng xuất?',
      confirmationText: 'Xác nhận',
      cancellationText: 'Hủy',
    })
      .then(() => {
        dispatch(logOutAPI())
          .then(() => {
            console.log('Logout thành công!');
            navigate('/login'); // ✅ Điều hướng sang trang login
          })
          .catch((error) => {
            console.error('Lỗi khi logout:', error);
          });
      })
      .catch(() => {
        console.log('Hủy logout');
      });
  };

  return (
    <Box>

      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding: 0 }}
          aria-controls={open ? 'basic-menu-profiles' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{ width: 36, height: 36 }}
            alt='quocloc'
          //src={currentUser?.avatar}

          />
        </IconButton>
      </Tooltip>

      <Menu
        id="basic-menu-profiles"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-profiles',
        }}
      >
        <Link to='/settings/account' style={{ color: 'inherit' }}>
          <MenuItem sx={{
            '&:hover': { color: 'success.light' }
          }}>
            <Avatar
              sx={{ width: 28, height: 28, mr: 2 }}
              alt='quocloc'
            // src={currentUser?.avatar}
            /> Profile
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem >
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{
          '&:hover': {
            color: 'warning.dark',
            '& .logout-icon': { color: 'warning.dark' }
          }
        }}>
          <ListItemIcon>
            <Logout className='logout-icon' fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>

      </Menu>
    </Box>
  );
}

export default Profiles