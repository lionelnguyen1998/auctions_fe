import React, {useState, useEffect} from 'react';
import { Paper, Link, Button, Pagination, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Toolbar, Typography, Checkbox, IconButton, Tooltip} from "@mui/material";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import notificationApi from '../api/notificationApi';
import './index.css'
  
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}
  
function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}
  
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
  
const headCells = [
    {
        id: 'reason',
        numeric: false,
        disablePadding: true,
        label: 'Title',
    },
    {
        id: 'title',
        numeric: true,
        disablePadding: false,
        label: 'auction',
    },
    {
        id: 'updated_at',
        numeric: true,
        disablePadding: false,
        label: 'Date',
    },
    {
        id: 'type',
        numeric: true,
        disablePadding: false,
        label: 'type',
    },
];
  
function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
};
  
return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                        'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                    <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                    >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                    ) : null}
                    </TableSortLabel>
                </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
  
EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};
  
const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;
  
    return (
        <Toolbar
            sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
                bgcolor: (theme) =>
                alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }),
            }}
        >
        {numSelected > 0 ? (
            <Typography
                sx={{ flex: '1 1 100%' }}
                color="inherit"
                variant="subtitle1"
                component="div"
            >
                {numSelected} selected
            </Typography>
        ) : (
            <>
            </>
        )}
  
        {numSelected > 0 ? (
            <Tooltip title="削除">
                <IconButton>
                    <i class="fa fa-trash" style={{ color: 'red' }} aria-hidden="true"></i>
                </IconButton>
            </Tooltip>
        ) : (
            <></>
        )}
        </Toolbar>
    );
  };
  
EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};
  
export default function Notification() {
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('updated_at');
    const [selected, setSelected] = useState([]);
    const [notifications, setNotifications] = useState([])
    const [index, setPage] = useState(1);
    const [counts, setCount] = useState(1);
    const [count, setPageSize] = useState(4);
    const [total, setTotal] = useState('');
    const pageSizes = [5, 10, 20];

    const getRequestParams = (index, count) => {
        let params = {};
        if (index) {
          params["index"] = index;
        }
        if (count) {
          params["count"] = count;
        }
        return params;
    };

    const allNotifications = () => {
        const params = getRequestParams( index, count);
        notificationApi.getAllNotification(params)
            .then((response) => {
                const { denys, total} = response.data.data;
                setNotifications(denys);
                setTotal(total)
                const totalPage = Math.ceil(total/count)
                setCount(totalPage);
            })
            .catch((e) => {
                console.log(e);
            });
      };

    useEffect(allNotifications, [index, count]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(1);
    };
  
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
  
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = notifications.map((notification) => notification.reason);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
  
    const handleClick = (event, reason) => {
        const selectedIndex = selected.indexOf(reason);
        let newSelected = [];
    
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, reason);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
            );
        }
  
        setSelected(newSelected);
    };
  
    const isSelected = (reason) => selected.indexOf(reason) !== -1;

    return (
        <Paper style={{ padding: "20px", marginBottom: "40px"}} className="container">
            <section className="featured spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                        <div className="section-title">
                                <h2>notifications 一覧</h2>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <Box sx={{ width: '100%' }}>
                                <EnhancedTableToolbar numSelected={selected.length} />
                                <TableContainer>
                                    <Table
                                    sx={{ minWidth: 750 }}
                                    aria-labelledby="tableTitle"
                                    >
                                    <EnhancedTableHead
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                        rowCount={notifications.length}
                                    />
                                    <TableBody>
                                        {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                                        rows.slice().sort(getComparator(order, orderBy)) */}
                                        {stableSort(notifications, getComparator(order, orderBy))
                                        .map((notification, index) => {
                                            const isItemSelected = isSelected(notification.reason);
                                            const labelId = `enhanced-table-checkbox-${index}`;
                        
                                            return (
                                            <TableRow
                                                hover
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={notification.reason}
                                            >
                                                <TableCell 
                                                    selected={isItemSelected}
                                                    onClick={(event) => handleClick(event, notification.reason)}
                                                    role="checkbox"
                                                    padding="checkbox"
                                                >
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                        'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                    >
                                                    {notification.reason.substr(0, 30) + '...' }
                                                </TableCell>
                                                <TableCell align="right">{notification.title}</TableCell>
                                                <TableCell align="right">{notification.updated_at}</TableCell>
                                                <TableCell align="right">
                                                    {
                                                        (notification.type === 1) ? (
                                                            <Button disabled size="small" variant="outlined" style={{ color: '#4CAF50', height: '20px', marginRight: '20px'}}>
                                                                アクセプタンス
                                                            </Button>
                                                        ) : (
                                                            <Button disabled size="small" variant="outlined" style={{ color: '#FF9800', height: '20px'}}>
                                                                拒否
                                                            </Button>
                                                        )
                                                    }
                                                    
                                                </TableCell>
                                                <TableCell>
                                                    <a href=''>
                                                        <Button size="small" variant="outlined" style={{ color: '#007bff', height: '20px', marginLeft: '5px'}}>
                                                            <i class="fa fa-eye"></i>
                                                        </Button>
                                                    </a>
                                                    <a href='/'>
                                                        <Button size="small" variant="outlined" style={{ color: '#dc3545', height: '20px', marginLeft: '5px'}}>
                                                            <i class="fa fa-trash" aria-hidden="true"></i>
                                                        </Button>
                                                    </a>
                                                </TableCell>
                                            </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                            <p style={{marginTop:'10px', marginBottom:'-7px'}}>{total} お知らせ</p>
                        </div>
                        <div>
                        <select className="select-paginate" onChange={handlePageSizeChange} value={count}>
                            {pageSizes.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                            ))}
                        </select>
                        <Pagination
                            style={{float: "right"}}
                            className="my-3"
                            count={counts}
                            page={index}
                            siblingCount={1}
                            boundaryCount={1}
                            variant="outlined"
                            shape="rounded"
                            onChange={handlePageChange}
                            color="success"
                        />
                        </div>
                    </div>
                </div>
            </section>
        </Paper>
    );
}