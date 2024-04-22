import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Loading from '../../../components/Loading/Loading';

const Test = () => {
    const column = [
        { name: 'ID', selector: (row) => row?.id, sortable: true },
        { name: 'Name', selector: (row) => row?.name, sortable: true },
        { name: 'Email', selector: (row) => row?.email, sortable: true },
        {
            name: 'Designation',
            selector: (row) => row?.designation,
            sortable: true,
        },
    ];
    const customStyles = {
        headRow: {
            style: {
                backgroundColor: 'blue',
                color: 'white',
            },
        },
        headCells: {
            style: {
                fontSize: '15px',
                fontWeight: '600',
                textTransform: 'uppercase',
            },
        },
        cells: {
            style: {
                fontSize: '15px',
            },
        },
    };

    const [totalRows, setTotalRows] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [loading, setLoading] = useState(true);
    const [records, setRecords] = useState([]);
    const [recordsFilter, setRecordsFilter] = useState([]);

    useEffect(() => {
        fetchData();
    }, [currentPage, pageSize]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                `https://glil-api.nextgenitltd.com/api/v1/staff?page=${currentPage}&limit=${pageSize}`
            );
            setRecords(res?.data?.data?.staffLists);
            setTotalRows(res?.data?.data?.totalStaffLists);
            setRecordsFilter(res.data?.data?.staffLists);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePerPageChange = (newPageSize, page) => {
        setPageSize(newPageSize);
        setCurrentPage(page);
    };

    const handleFilter = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const newData = recordsFilter.filter(
            (row) =>
                row.name.toLowerCase().includes(searchTerm) ||
                row.designation.toLowerCase().includes(searchTerm)
        );
        setRecords(newData);
    };

    return (
        <div className="home-content">
            <div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        placeholder="search by name, designation ..."
                        style={{ padding: '6px 10px', width: '100%' }}
                        onChange={handleFilter}
                    />
                </div>
                <DataTable
                    columns={column}
                    data={records}
                    customStyles={customStyles}
                    selectableRows
                    pagination
                    paginationServer
                    paginationTotalRows={totalRows}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handlePerPageChange}
                    paginationPerPage={pageSize}
                    paginationRowsPerPageOptions={[5, 10, 15, 20]}
                    progressPending={loading}
                />
            </div>
        </div>
    );
};

export default Test;
