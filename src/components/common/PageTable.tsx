import React from 'react';
import Table from 'react-bootstrap/Table';

interface TableProps{
  tableHead: JSX.Element,
  tableRows: JSX.Element[]
}

const PageTable: React.FC<TableProps> = ({tableHead, tableRows}) => (
  <>
    <Table striped bordered hover>
      <thead>
        {tableHead}
      </thead>
      <tbody>
        {tableRows}
      </tbody>
    </Table>
  </>
)

export default PageTable