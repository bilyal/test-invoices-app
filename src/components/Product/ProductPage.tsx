import React, { useState, useEffect } from "react";
import Page from "../common/Page";
import PageHeader from "../common/PageHeader";
import DeleteModal from "./DeleteModal";
import { Product } from "../../store/types/productTypes";
import PageTable from "../common/PageTable";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";
import EditModal from "./EditModal";

interface ProductPageProps {
  products: Product[];
  fetchProducts: () => void;
}

const ProductPage: React.FC<ProductPageProps> = ({
  products,
  fetchProducts,
}) => {
  const [id, setId] = useState(0);
  const [onAdding, setOnAdding] = useState(false);
  const [onEditing, setOnEditing] = useState(false);
  const [onDeleting, setOnDeleting] = useState(false);
  const [addModalOpen, setAddShow] = useState(false);
  const [editModalOpen, setEditShow] = useState(false);
  const [deleteModalOpen, setDeleteShow] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        fetchProducts();
      } catch (e) {
        console.log(e);
      }
    };
    getProducts();
  }, [fetchProducts]);

  const showAddModal = () => {
    setOnAdding(true);
    setAddShow(true);
  };

  const closeAddModal = () => {
    setOnAdding(false);
    setAddShow(false);
  };

  const showEditModal = (id: number) => {
    setId(id);
    setOnEditing(true);
    setEditShow(true);
  };

  const closeEditModal = () => {
    setOnEditing(false);
    setEditShow(false);
  };

  const showDeleteModal = (editId: number) => {
    setId(editId);
    setOnDeleting(true);
    setDeleteShow(true);
  };

  const closeDeleteModal = () => {
    setOnDeleting(false);
    setDeleteShow(false);
  };

  const tableHead = (
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Price</th>
      <th></th>
    </tr>
  );

  const tableRows = products.map((product) => {
    return (
      <tr key={product.id}>
        <td>{product.id + 1}</td>
        <td>{product.name}</td>
        <td>{product.price.toFixed(2)}</td>
        <td>
          <Nav>
            <NavLink onClick={() => showEditModal(product.id)}>edit</NavLink>
            <NavLink onClick={() => showDeleteModal(product.id)}>
              delete
            </NavLink>
          </Nav>
        </td>
      </tr>
    );
  });

  return (
    <Page
      empty={products.length === 0}
      onAdding={onAdding}
      onEditing={onEditing}
      onDeleting={onDeleting}
      Header={<PageHeader pageName="Product" showAddModal={showAddModal} />}
      DataTable={<PageTable tableHead={tableHead} tableRows={tableRows} />}
      AddModal={
        <EditModal
          type="Add"
          isOpen={addModalOpen}
          closeModal={closeAddModal}
          product={products[id]}
        />
      }
      EditModal={
        <EditModal
          type="Edit"
          isOpen={editModalOpen}
          closeModal={closeEditModal}
          product={products[id]}
        />
      }
      DeleteModal={
        <DeleteModal
          isOpen={deleteModalOpen}
          product={products[id]}
          closeModal={closeDeleteModal}
        />
      }
    />
  );
};

export default ProductPage;
