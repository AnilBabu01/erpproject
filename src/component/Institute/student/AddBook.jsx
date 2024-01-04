import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { GetBooks } from "../../../redux/actions/liraryAction";
import CircularProgress from "@mui/material/CircularProgress";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
const formData = new FormData();

function AddBook({ setOpen }) {
  const dispatch = useDispatch();
  const [stream, setstream] = useState("NONE");
  const [courseorclass, setcourseorclass] = useState("");
  const [BookId, setBookId] = useState("");
  const [BookTitle, setBookTitle] = useState("");
  const [auther, setauther] = useState("");
  const [quantity, setquantity] = useState("");
  const [addDate, setaddDate] = useState("");
  const [classlist, setclasslist] = useState([]);
  const { course } = useSelector((state) => state.getcourse);
  const { user } = useSelector((state) => state.auth);
  const { loading, test } = useSelector((state) => state.addTest);

  const submit = () => {
    serverInstance("library/addbook", "post", {
      courseorclass: courseorclass,
      BookId: BookId,
      BookTitle: BookTitle,
      auther: auther,
      quantity: quantity,
      addDate: addDate,
      stream:stream
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpen(false);
        dispatch(GetBooks());
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });
      }
    });
  };
  useEffect(() => {
    if (course) {
      setclasslist(course);
    }
  }, [course]);
  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Add Book</h1>
        <form>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Stream</label>
              <div></div>
              <Select
                // required
                className={styles.addwidth}
                sx={{
                  width: "18.8rem",
                  fontSize: 14,
                  "& .MuiSelect-select": {
                    paddingTop: "0.6rem",
                    paddingBottom: "0.6em",
                  },
                }}
                value={stream}
                name="stream"
                onChange={(e) => setstream(e.target.value)}
                displayEmpty
              >
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={"NONE"}
                >
                  NONE
                </MenuItem>

                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={"Arts"}
                >
                  Arts
                </MenuItem>

                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={"COMMERCE"}
                >
                  COMMERCE
                </MenuItem>

                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={"SCIENCE"}
                >
                  SCIENCE
                </MenuItem>
              </Select>
            </div>
          </div>

          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Class</label>
              <div></div>
              <Select
                // required
                className={styles.addwidth}
                sx={{
                  width: "18.8rem",
                  fontSize: 14,
                  "& .MuiSelect-select": {
                    paddingTop: "0.6rem",
                    paddingBottom: "0.6em",
                  },
                }}
                value={courseorclass}
                name="courseorclass"
                onChange={(e) => setcourseorclass(e.target.value)}
                displayEmpty
              >
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={""}
                >
                  Please Select
                </MenuItem>
                {classlist?.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      sx={{
                        fontSize: 14,
                      }}
                      value={item?.coursename}
                    >
                      {item?.coursename}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>

            <div className={styles.inputdiv}>
              <label>BOOKID</label>
              <input
                required
                type="text"
                placeholder="Enter Book Id"
                value={BookId}
                name="BookId"
                onChange={(e) => setBookId(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Book Title</label>
              <input
                required
                type="text"
                placeholder="Enter Book Title"
                value={BookTitle}
                name="BookTitle"
                onChange={(e) => setBookTitle(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Auther</label>
              <input
                required
                type="text"
                placeholder="Enter Auther Name"
                value={auther}
                name="auther"
                onChange={(e) => setauther(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Book Quanriry</label>
              <input
                required
                type="text"
                placeholder="Enter Book Quanriry"
                value={quantity}
                name="quantity"
                onChange={(e) => setquantity(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Add Date</label>
              <input
                required
                type="date"
                value={addDate}
                name="addDate"
                onChange={(e) => setaddDate(e.target.value)}
              />
            </div>
          </div>
        </form>
        <div className={styles.mainbtnndivcancel}>
          <button onClick={() => setOpen(false)} className={styles.cancelbtn}>
            Back
          </button>
          <button className={styles.cancelbtn} onClick={() => submit()}>
            {loading ? (
              <CircularProgress size={25} style={{ color: "red" }} />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default AddBook;
