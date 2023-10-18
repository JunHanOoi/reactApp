import React, { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { tableData } from "./tableData";
import classes from "./Home.module.css";
import { Modal } from "@mui/material";
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/base/Button';
import CountryTreeItem from "../components/CountryTreeItem";



const Home = () => {
    const [selectedRowId, serSelectedRowId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterCriteria, setFilterCriteria] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const filteredTableData = useMemo(() => {
        if (!filterCriteria) {
            return tableData;
        }
        let filteredData = tableData.filter((row) =>
            row.country === filterCriteria || row.state === filterCriteria || row.city === filterCriteria
        );
        if (filteredData.length === 0) {
            filteredData = tableData.filter((row) =>
                row.state === filterCriteria || row.city === filterCriteria
            );
        }
        return filteredData;
    }, [filterCriteria]);

    const slicedTableData = useMemo(() => {
        const startIndex = page * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        return filteredTableData.slice(startIndex, endIndex);
    }, [page, rowsPerPage, filteredTableData]);

    const selectedRow = useMemo(() => {
        let selectedData = tableData.filter((row) => 
            row.id === selectedRowId
        )
        return selectedData;
    }, [selectedRowId])

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

    const handleViewButtonClick = (rowId) => {
        serSelectedRowId(rowId);
        setIsModalOpen(true);
    };

    const handleNodeSelect = (node) => {
        setFilterCriteria(node);
        setPage(0);
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
    console.log(classes)

    return (
        <div className={classes.container}>
            <div className={classes.containerTreeMenu}>
                <Typography variant="h3" className={classes.header}>
                    Home
                </Typography>
                <Box
                    className={classes.containerTreeView}
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
                <Table className={classes.containerTable} size="small" aria-label="simple table">
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
                                    <Button className={classes.customButton} onClick={() => handleViewButtonClick(row.id)}>View</Button>
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
                <Box className={classes.modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Customer Details
                    </Typography>
                    {selectedRow.length > 0 && (
                        <Box>
                            <Typography id="modal-modal-description" className={classes.modalDescription}>
                                Name     : {selectedRow[0].name}
                            </Typography>
                            <Typography id="modal-modal-description" className={classes.modalDescription}>
                                Address  : {selectedRow[0].address}
                            </Typography>
                            <Typography id="modal-modal-description" className={classes.modalDescription}>
                                Country  : {selectedRow[0].country}
                            </Typography>
                            <Typography id="modal-modal-description" className={classes.modalDescription}>
                                State    : {selectedRow[0].state}
                            </Typography>
                            <Typography id="modal-modal-description" className={classes.modalDescription}>
                                City     : {selectedRow[0].city}
                            </Typography>
                            <Typography id="modal-modal-description" className={classes.modalDescription}>
                                Pin Code : {selectedRow[0].pinCode}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Modal>
        </div>
    );
}

export default Home;