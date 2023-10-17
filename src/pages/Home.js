import React, { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { tableData } from "./tableData";
import "./Home.css";
import { Modal } from "@mui/material";
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, buttonClasses } from '@mui/base/Button';
import { styled } from '@mui/system';
import CountryTreeItem from "../components/CountryTreeItem";



const Home = () => {
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredTableData, setFilteredTableData] = useState(tableData);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const slicedTableData = useMemo(() => {
        const startIndex = page * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        return filteredTableData.slice(startIndex, endIndex);
    }, [page, rowsPerPage, filteredTableData]);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const data = [
        {
            id: "1",
            name: "USA",
            children: [
                {
                    id: "3",
                    name: "California",
                    children: [
                        {
                            id: "7",
                            name: "Los Angeles",
                        },
                        {
                            id: "8",
                            name: "San Francisco",
                        },
                        {
                            id: "9",
                            name: "San Diego",
                        },
                    ],
                },
                {
                    id: "4",
                    name: "New York",
                    children: [
                        {
                            id: "10",
                            name: "New York City",
                        },
                        {
                            id: "11",
                            name: "Buffalo",
                        },
                        {
                            id: "12",
                            name: "Rochester",
                        },
                    ],
                },
            ],
        },
        {
            id: "2",
            name: "Canada",
            children: [
                {
                    id: "5",
                    name: "Ontario",
                    children: [
                        {
                            id: "13",
                            name: "Toronto",
                        },
                        {
                            id: "14",
                            name: "Ottawa",
                        },
                        {
                            id: "15",
                            name: "Hamilton",
                        },
                    ],
                },
                {
                    id: "6",
                    name: "Quebec",
                    children: [
                        {
                            id: "16",
                            name: "Montreal",
                        },
                        {
                            id: "17",
                            name: "Quebec City",
                        },
                        {
                            id: "18",
                            name: "Laval",
                        },
                    ],
                },
            ],
        },
    ];

    const handleViewButtonClick = (rowData) => {
        setSelectedRowData(rowData);
        setIsModalOpen(true);
        console.log(selectedRowData);
    };

    const handleNodeSelect = (node) => {
        const filteredData = tableData.filter((row) => row.country === node);
        const filteredData1 = tableData.filter((row) => row.state === node);
        const filteredData2 = tableData.filter((row) => row.city === node);
        setFilteredTableData(filteredData);
        setPage(0);
        if (filteredData.length === 0) {
            setFilteredTableData(filteredData1);
            setPage(0);
            if (filteredData1.length === 0) {
                setFilteredTableData(filteredData2);
                setPage(0);
            }
        }
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const homeStyle = {
        display: 'flex', 
    };

    return (
        <div style={homeStyle}>
            <div style={{ width: "30%" }}>
                <Typography variant="h3" style={{ marginTop: '20px', marginLeft: '20px' }}>
                    Home
                </Typography>
                <Box
                    sx={{
                        minHeight: 300,
                        flexGrow: 1,
                        maxWidth: 300,
                        marginLeft: 2,
                        marginTop: 5,
                        border: 1,
                    }}
                >
                    <TreeView
                        aria-label="rich object"
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpanded={["1"]}
                        defaultExpandIcon={<ChevronRightIcon />}
                    >
                        <CountryTreeItem data={data[0]} handleNodeSelect={handleNodeSelect}/>
                        <CountryTreeItem data={data[1]} handleNodeSelect={handleNodeSelect}/>
                    </TreeView>
                </Box>
            </div>
            <TableContainer >
                <Table sx={{ marginTop: '115px', marginLeft: '20px' }} size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell >Name</TableCell>
                            <TableCell >Address</TableCell>
                            <TableCell >Country</TableCell>
                            <TableCell >State</TableCell>
                            <TableCell >City</TableCell>
                            <TableCell >Pin Code</TableCell>
                            <TableCell >Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {slicedTableData.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell >{row.name}</TableCell>
                                <TableCell >{row.address}</TableCell>
                                <TableCell >{row.country}</TableCell>
                                <TableCell >{row.state}</TableCell>
                                <TableCell >{row.city}</TableCell>
                                <TableCell >{row.pinCode}</TableCell>
                                <TableCell >
                                    <CustomButton onClick={() => handleViewButtonClick(row)}>View</CustomButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TablePagination
                        count={filteredTableData.length}
                        page={page}
                        onPageChange={handlePageChange}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Table>
            </TableContainer>
            <Modal
                open={isModalOpen}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Customer Details
                    </Typography>
                    {selectedRowData && (
                        <Box>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Name     : {selectedRowData.name}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Address  : {selectedRowData.address}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Country  : {selectedRowData.country}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                State    : {selectedRowData.state}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                City     : {selectedRowData.city}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Pin Code : {selectedRowData.pinCode}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Modal>
        </div>
    );
}

const blue = {
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
};

const CustomButton = styled(Button)`
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    line-height: 1.5;
    background-color: ${blue[500]};
    color: white;
    border-radius: 8px;
    font-weight: 600;
    padding: 8px 16px;
    cursor: pointer;
    transition: all 150ms ease;
    border: none;
  
    &:hover:not(:disabled) {
      background-color: ${blue[600]};
    }
  
    &:active:not(:disabled) {
      background-color: ${blue[700]};
    }
  
    &.${buttonClasses.focusVisible} {
      box-shadow: 0 4px 20px 0 rgb(61 71 82 / 0.1), 0 0 0 5px rgb(0 127 255 / 0.5);
      outline: none;
    }
  
    &.${buttonClasses.disabled} {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

export default Home;