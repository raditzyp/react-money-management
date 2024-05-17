import AddCard from "./data/AddCard";
import ListCard from "./data/ListCard";


// eslint-disable-next-line react/prop-types
const Data = ({ data, addData, deleteData }) => {
   return (
       <>
           <div className='mt-3'>
               <div className='row'>
                   <AddCard addData={addData} />
                   <ListCard data={data} deleteData={deleteData} />
               </div>
           </div>
       </>
   );
};


export default Data;
