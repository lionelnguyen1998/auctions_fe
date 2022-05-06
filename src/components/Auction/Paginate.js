import React, {Fragment, useState} from 'react';
import Pagination from "@mui/material/Pagination";

function Paginate(props) {
    console.log(props)
    const [index, setPage] = useState(1);
    const [counts, setCount] = useState(1);
    const [count, setPageSize] = useState(4);
    const pageSizes = [4, 8, 12];

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(1);
    };
    return (
        <Fragment>
            <div>
                <select onChange={handlePageSizeChange} value={count}>
                    {pageSizes.map((size) => (
                    <option key={size} value={size}>
                        {size}
                    </option>
                    ))}
                </select>
                <Pagination
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