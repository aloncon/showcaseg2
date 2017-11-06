import React from 'react';

const CatalogChildren = ({ data }) => (
    <tr>
        <td><img src={data.src}/></td>
        <td>
            <h4>{data.title}</h4>
            <p>{data.desc}</p>
        </td>
        <td><p>Learn More</p></td>
    </tr>
)

export default CatalogChildren;