import React from 'react';
import Button from 'react-bootstrap/Button'

interface HeaderProps{
    pageName: string,
    showAddModal: () => void
}

const PageHeader: React.FC<HeaderProps> = (props) => (
    <div className="row mb-4">
        <div className="col-sm-auto">
          <h1>{props.pageName} List</h1>
        </div>
        <div className="col-sm-auto">
          <Button variant="primary" onClick={props.showAddModal}>Create</Button>
        </div>
      </div>
)

export default PageHeader;