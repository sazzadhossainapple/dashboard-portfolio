import React from 'react';

function ProjectCategoryTable({ data, i }) {
    const { title, status } = data;

    return (
        <tr>
            <td className="text-center align-middle table-text fw-bold">{i}</td>
            <td className="text-center align-middle table-text">
                {title ? title : 'N/A'}
            </td>
            <td className="text-center align-middle table-text">sdfs</td>

            <td className="text-center align-middle table-text">
                <div className="d-flex align-items-center justify-content-center gap-1  ">
                    <button
                        className="btn btn-sm bg-primary text-white"
                        style={{ padding: '2px 10px' }}
                    >
                        Edit
                    </button>
                    <button
                        className="btn btn-sm bg-danger text-white"
                        style={{
                            padding: '2px 10px',
                        }}
                    >
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default ProjectCategoryTable;
