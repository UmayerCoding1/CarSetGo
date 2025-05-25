import React from 'react';

const Table = ({thValue,children}) => {
    return (
        <table className="min-w-full bg-white rounded-xl shadow  border-gray-200">
              <thead>
                <tr className=" text-gray-500 text-left  border-b border-gray-200">
                  {thValue.map((value, inx) => <th key={inx} className={`py-3 px-4 uppercase ${value !== "Vahical" ? 'text-center' : ''}`}>{value}</th>)}
                </tr>
              </thead>
              <tbody>
                {children}
              </tbody>
            </table>
    );
};

export default Table;