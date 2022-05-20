import React, {Fragment} from 'react';
import Pagination from "@mui/material/Pagination";
import './index.css'

function Paginate(props) {
    const counts = props.counts;
    const index = props.index;
    const setPage = props.setPage;
    const count = props.count;
    const setPageSize = props.setPageSize
    const pageSizes = [4, 8, 12, 24];

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(1);
    };
    return (
        <Fragment>
            <div style={{magrinTop: '10px'}}>
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
        </Fragment>
    )
}

export default Paginate;