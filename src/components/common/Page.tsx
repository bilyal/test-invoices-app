import React from 'react';
import '../helper.css'

interface PageProps {
  empty: boolean,
  onAdding: boolean,
  onEditing: boolean,
  onDeleting: boolean,
  Header: JSX.Element,
  DataTable: JSX.Element,
  AddModal: JSX.Element,
  EditModal: JSX.Element,
  DeleteModal: JSX.Element
}

const Page: React.FC<PageProps> = (props) => {
  return (
    <>
      {props.Header}

      {!props.empty && props.DataTable}
      
      {props.onAdding && props.AddModal}
      
      {props.onEditing && props.EditModal}

      {props.onDeleting && props.DeleteModal}
    </>
  );
}

export default Page;