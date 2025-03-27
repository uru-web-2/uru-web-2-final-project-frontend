    import React, { useState } from "react";
    import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    Paper,
    Button,
    } from "@mui/material";

    const GridTable = ({
    columns,
    data,
    actions = [],
    rowsPerPageOptions = [5, 10, 15],
    }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

    const handleChangePage = (_, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedData = data.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 500, minHeight:400, minWidth: 1000 }}>
            <Table stickyHeader>

            <TableHead>
                <TableRow>
                {columns.map((column) => (
                    <TableCell
                    key={column}
                    sx={{
                        backgroundColor: "#1A4568",
                        color: "#FFFFFF",
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                    }}
                    >
                    {column.charAt(0).toUpperCase() +
                        column.slice(1).replace(/([A-Z])/g, " $1")}
                    </TableCell>
                ))}

                {actions.length > 0 && (
                    <TableCell
                    sx={{
                        backgroundColor: "#1A4568",
                        color: "#FFFFFF",
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                        textAlign: "right",
                    }}
                    >
                    Actions
                    </TableCell>
                )}
                </TableRow>
            </TableHead>


            <TableBody>
                {paginatedData.map((row, index) => (
                <TableRow
                    key={row.id || index}
                    sx={{
                    backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#E3EAF9",
                    "&:hover": {
                        backgroundColor: index % 2 === 0 ? "#F5F5F5" : "#E0E7FF",
                    },
                    }}
                >
                    {columns.map((column) => (
                    <TableCell key={`${row.id || index}-${column}`}>
                        {Array.isArray(row[column])
                        ? row[column].join(", ")
                        : row[column]}
                    </TableCell>
                    ))}

                    {actions.length > 0 && (
                    <TableCell sx={{ textAlign: "right", minWidth: 200 }}>
                        {actions.map((action, actionIndex) => (
                        <Button
                            key={actionIndex}
                            onClick={() => action.onClick(row)}
                            variant="outlined"
                            color={action.color || "primary"}
                            sx={{ mr: 1 }}
                        >
                            {action.label}
                        </Button>
                        ))}
                    </TableCell>
                    )}
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>

        <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Paper>
    );
    };

    export default GridTable;
