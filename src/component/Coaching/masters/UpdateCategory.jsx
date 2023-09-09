import React,{useState,useEffect} from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { getcourse, Updatecategory } from "../../../redux/actions/commanAction";
import { useDispatch, useSelector } from "react-redux";
function UpdateCategory({ updatedata,setOpen }) {
  const dispatch = useDispatch()
  const [Categoryname, setCategoryname] = useState('')
  const submit = (e) => {
    e.preventDefault();
    const data = {
      id:updatedata?.id,  
      category:Categoryname,
    };
    dispatch(Updatecategory(data, setOpen));
  };
  useEffect(() => {
    if (updatedata) {
      setCategoryname(updatedata?.category);
    }
  }, []);
  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Add Category</h1>
        <form onSubmit={submit}>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Category</label>
              <input type="text" placeholder="Enter the Category" 
              
              value={Categoryname}
              name="Categoryname"
              onChange={(e)=>setCategoryname(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.logbtnstylediv}>
            <button className={styles.logbtnstyle}>Save Category</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateCategory;
