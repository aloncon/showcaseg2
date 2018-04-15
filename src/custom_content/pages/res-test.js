import React from 'react';
import ResponsiveContainer from '../../system/codes/ResponsiveContainer';

//styling
const dashedStyle = { border: '2px dashed green' };
const Hr = () => <hr style={dashedStyle} />;
//~~~~~~~

const ResTest = () => {
  return (
    <div>
      <ResponsiveContainer>
        {size => {
          if (size === 'sm') return <h3 style={{ backgroundColor: '#e238cc' }}>{size}</h3>;
          if (size === 'md') return <h3 style={{ backgroundColor: '#65f796' }}>{size}</h3>;
          if (size === 'lg') return <h3 style={{ backgroundColor: '#fcff7c' }}>{size}</h3>;
          if (size === 'xl') return <h3 style={{ backgroundColor: '#ffa0e2' }}>{size}</h3>;
          //The null is important in case of not checking all the cases (sm,md etc').
          return null;
        }}
      </ResponsiveContainer>
      <Hr />
      <ResponsiveContainer querySize="md">
        <p>
          Display only on <strong>md</strong> size!
        </p>
      </ResponsiveContainer>
      <Hr />
      <ResponsiveContainer>
        <p>
          Won't display! lack of function or querySize prop!
        </p>
      </ResponsiveContainer>
    </div>
  );
};

export default ResTest;
