import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

// eslint-disable-next-line react/prop-types
const AddCard = ({ addData }) => {
   const types = [
       {
           value: 1,
           text: "Pemasukan",
       },
       {
           value: 2,
           text: "Pengeluaran",
       },
   ];

   const [showModal, setShowModal] = useState(false);
   const [title, setTitle] = useState("");
   const [value, setValue] = useState(0);
   const [type, setType] = useState(1);
   const [error, setError] = useState(false);
   const [showSuccess, setShowSuccess] = useState(false);

   const cleaningData = () => {
       setTitle("");
       setValue(0);
       setType(1);
   };

   const submitForm = (e) => {
       setError(false);
       e.preventDefault();

       if (title !== "") {
           const inputValue = {
               title: title,
               value: value,
               type: type,
           };

           addData(inputValue);
           cleaningData();
           setShowModal(false);
           setShowSuccess(true); // Show success popup
           setTimeout(() => setShowSuccess(false), 2000); // Hide success popup after 2 seconds
       } else {
           setError(true);
       }
   };

   const SuccessAlert = () => {
    return (
      <div className="alert alert-success d-flex align-items-center" role="alert">
        <svg
          className="bi flex-shrink-0 me-2"
          role="img"
          aria-label="Success:"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.93 10.588l3.832-3.832c.534-.534.877-.833.746-1.232-.16-.484-.752-.651-1.21-.292l-3.387 2.774-1.386-1.391c-.5-.5-1.18-.813-1.616-.323-.448.5-.353 1.33.141 1.872l2.15 2.194z"/>
        </svg>
        <div>
          Sukses
        </div>
      </div>
    );
  };

   return (
       <>
           <div className='col-md-5'>
               <div className='card mb-3'>
                   <div className='card-body'>
                       <h5>Tambah Transaksi</h5>
                       <button className='btn btn-primary' onClick={() => setShowModal(true)}>
                           Tambah Transaksi
                       </button>
                   </div>
               </div>
           </div>

           <Modal show={showModal} onHide={() => setShowModal(false)}>
               <Modal.Header closeButton>
                   <Modal.Title>Tambah Transaksi</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                   <form onSubmit={submitForm}>
                       <div className='mb-3'>
                           <label htmlFor='inputTitle' className='form-label'>
                               Judul
                           </label>
                           <input
                               type='text'
                               className={`form-control ${error ? "is-invalid" : ""}`}
                               id='inputTitle'
                               value={title}
                               onChange={(e) => setTitle(e.target.value)}
                           />
                           {title === "" && (
                               <div className='invalid-feedback'>Wajib Diisi</div>
                           )}
                       </div>
                       <div className='mb-3'>
                           <label htmlFor='inputType' className='form-label'>
                               Tipe
                           </label>
                           <select
                               className='form-select'
                               aria-label='inputType'
                               value={type}
                               onChange={(e) => setType(Number(e.target.value))}
                           >
                               {types.map((item, index) => (
                                   <option key={index} value={item.value}>
                                       {item.text}
                                   </option>
                               ))}
                           </select>
                       </div>
                       <div className='mb-3'>
                           <label htmlFor='inputNominal' className='form-label'>
                               Nominal
                           </label>
                           <input
                               type='number'
                               className='form-control'
                               id='inputNominal'
                               value={value}
                               onChange={(e) => setValue(Number(e.target.value))}
                           />
                       </div>

                       <Button variant="primary" type="submit">
                           Simpan Transaksi
                       </Button>
                   </form>
               </Modal.Body>
           </Modal>

           <Modal show={showSuccess} onHide={() => setShowSuccess(false)} centered>
               <Modal.Body>
                    <SuccessAlert />

                   <p>Transaksi berhasil disimpan!</p>
               </Modal.Body>
           </Modal>
       </>
   );
};

export default AddCard;
