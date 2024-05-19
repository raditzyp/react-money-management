import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

/* eslint-disable react/prop-types */
const DeleteModal = ({ show, handleClose, handleConfirm }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className = "text-danger text-center w-100">Hapus Transaksi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Apakah anda yakin ingin menghapus transaksi ini?
          </h3>
          <div className="d-flex justify-content-center gap-2">
            <Button variant="danger" onClick={handleConfirm}>
              {"Iya, saya yakin"}
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Tidak, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

DeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
};


const ListCard = ({ data, deleteData }) => {
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleShowModal = (item) => {
    setItemToDelete(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setItemToDelete(null);
  };

  const handleConfirmDelete = () => {
    deleteData(itemToDelete.code);
    handleCloseModal();
  };

  function formatRupiah(number) {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(number);
  }

  return (
    <>
      <div className="col-md-7">
        <div className="card mb-3">
          <div className="card-body">
            <h5>Data</h5>
            <table className="table mt-4">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Judul</th>
                  <th scope="col">Jumlah</th>
                  <th scope="col">Jenis</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.title}</td>
                    <td>{formatRupiah(item.value)}</td>
                    <td>{item.type === 1 ? "Pemasukan" : "Pengeluaran"}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleShowModal(item)}
                        className="mb-0"
                      >
                        Hapus
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {itemToDelete && (
        <DeleteModal
          show={showModal}
          handleClose={handleCloseModal}
          handleConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
};

ListCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      type: PropTypes.number.isRequired,
    })
  ).isRequired,
  deleteData: PropTypes.func.isRequired,
};

export default ListCard;
