import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { TableCell } from '@material-ui/core';
import { makeStyles } from '@mui/styles';
import Form from './Form'
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';

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
    id: 'id',
    numeric: true,
    disablePadding: false,
    label: 'Sl No',
  },
  {
    id: 'business code',
    numeric: true,
    disablePadding: false,
    label: 'Business Code',
  },
  {
    id: 'customer no',
    numeric: true,
    disablePadding: false,
    label: 'Customer Number',
  },
  {
    id: 'clear date',
    numeric: true,
    disablePadding: false,
    label: 'Clear Date',
  },
  {
    id: 'business yr',
    numeric: true,
    disablePadding: false,
    label: 'Business Year',
  },
  {
    id: 'doc id',
    numeric: true,
    disablePadding: false,
    label: 'Document Id',
  },
  {
    id: 'post date',
    numeric: true,
    disablePadding: false,
    label: 'Posting Date',
  },
  {
    id: 'doc date',
    numeric: true,
    disablePadding: false,
    label: 'Document Create Date',
  },
  {
    id: 'due date',
    numeric: true,
    disablePadding: false,
    label: 'Due Date',
  },
  {
    id: 'invoice',
    numeric: true,
    disablePadding: false,
    label: 'Invoice Currency',
  },
  {
    id: 'doc type',
    numeric: true,
    disablePadding: false,
    label: 'Document Type',
  },
  {
    id: 'post id',
    numeric: true,
    disablePadding: false,
    label: 'Posting Id',
  },
  {
    id: 'total',
    numeric: true,
    disablePadding: false,
    label: 'Total Open Amount',
  },
  {
    id: 'baseline date',
    numeric: true,
    disablePadding: false,
    label: 'Baseline Create Date',
  },
  {
    id: 'payment terms',
    numeric: true,
    disablePadding: false,
    label: 'Customer Payment Terms',
  },
  {
    id: 'invoice id',
    numeric: true,
    disablePadding: false,
    label: 'Invoice Id',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
 
return (
    <TableHead style={{color: "#FFFFFF"}}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            style={
              numSelected > 0 ? { color: "#14AFF1" } : { color: "#73818A" }
            }
            inputProps={{
              'aria-label': 'select all invoices',
            }}
          />
        </TableCell>
        {headCells.map((headCell, index) => (
          <TableCell 
            key={index}
            align={headCell.numeric ? 'left' : 'center'}
            padding={headCell.disablepadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel 
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              style={{ color: "#FFFFFF", fontSize: "1em" }}
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

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [enable, setEnable] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isLoaded, setisLoaded] = React.useState(false);
  const [data, setData] = React.useState([]);
  
  const [edit, setEdit] = React.useState({invoice_currency: "", cust_payment_terms: ""});

  const count = 10;

  React.useEffect(() => {
    const getData = async () => {
      await fetch(
        `http://localhost:8080/WinInt/GetUser?page=${page}&rowsPerPage=${rowsPerPage}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          
          setData((prev) => [...data]);
          setisLoaded(true);
        })
        .catch((err) => console.log(err));
    };
    getData();
  }, [page, count]);

  const handleChange = (event) => {
      let {name, value} = event.target;
      setEdit({...edit, [name]: value});
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.sl_no);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, sl_no) => {
    const selectedIndex = selected.indexOf(sl_no);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, sl_no);
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
    setEnable(newSelected.length !== 1);
    
    if(newSelected.length === 1) {
      let editvar = data.filter((row) => row.sl_no === newSelected[0]);
      setEdit({invoice_currency: editvar[0].invoice_currency, cust_payment_terms: editvar[0].cust_payment_terms});
      console.log(editvar);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (sl_no) => selected.indexOf(sl_no) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }} 
             style={{background: "#283a46"}}>
        <Form enable={enable}
              selectedIndexes={selected}
              selectedRow={selected[0]}
              edit={edit}
              handleChange={handleChange}/>

        <TableContainer>
          <Table 
            aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {
                data?.map((row, index) => {
                  const isItemSelected = isSelected(row.sl_no);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow 
                      hover
                      sx={{ "&:last-child td, &:last-child th" : { border: 0 }}}
                      onClick={(event) => handleClick(event, row.sl_no)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.sl_no}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          style={
                            isItemSelected > 0
                              ? { color: "#14AFF1" }
                              : { color: "#73818A" }
                          }
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell align="center" className={classes.table}
                                 component="th"> {row.sl_no}
                      </TableCell>
                      <TableCell className={classes.table}>{row.business_code}</TableCell>
                      <TableCell className={classes.table}>{row.cust_number}</TableCell>
                      <TableCell className={classes.table}>{row.clear_date}</TableCell>
                      <TableCell className={classes.table} align="center">{row.buisness_year}</TableCell>
                      <TableCell className={classes.table}>{row.doc_id}</TableCell>
                      <TableCell className={classes.table}>{row.posting_date}</TableCell>
                      <TableCell className={classes.table}>{row.document_create_date}</TableCell>
                      <TableCell className={classes.table}>{row.due_in_date}</TableCell>
                      <TableCell className={classes.table} align="center">{row.invoice_currency}</TableCell>
                      <TableCell className={classes.table} align="center">{row.document_type}</TableCell>
                      <TableCell className={classes.table} align="center">{row.posting_id}</TableCell>
                      <TableCell className={classes.table} align="center">{row.total_open_amount}</TableCell>
                      <TableCell className={classes.table}>{row.baseline_create_date}</TableCell>
                      <TableCell className={classes.table}>{row.cust_payment_terms}</TableCell>
                      <TableCell className={classes.table}>{row.invoice_id}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer >
        
        <TablePagination style={{ color: "#ffffff", fontSize: "1rem" }}
          rowsPerPageOptions={[5 , 10]}
          component="div"
          page={page}
          count={200}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

const useStyles = makeStyles({
    table: {
        padding: "1rem",
        fontSize: "1rem",
        color: "white",
        letterSpacing: "0.04rem",
        minWidth: 120,
    },
});