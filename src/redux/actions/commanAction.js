import axios from "axios";
import { toast } from "react-toastify";
import { backendApiUrl } from "../../config/config";
import { serverInstance } from "../../API/ServerInstance";
import {
  ALL_COACHING_REQUEST,
  ALL_COACHING_SUCCESS,
  ALL_COACHING_FAIL,
  ALL_COLLEGE_REQUEST,
  ALL_COLLEGE_SUCCESS,
  ALL_COLLEGE_FAIL,
  ALL_SCHOOL_REQUEST,
  ALL_SCHOOL_SUCCESS,
  ALL_SCHOOL_FAIL,
  ALL_CLIENT_REQUEST,
  ALL_CLIENT_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  ADD_BATCH_REQUEST,
  ADD_BATCH_SUCCESS,
  ADD_BATCH_FAIL,
  UPDATE_BATCH_REQUEST,
  UPDATE_BATCH_SUCCESS,
  UPDATE_BATCH_FAIL,
  DELETE_BATCH_REQUEST,
  DELETE_BATCH_SUCCESS,
  DELETE_BATCH_FAIL,
  ALL_BATCH_REQUEST,
  ALL_BATCH_SUCCESS,
  ALL_BATCH_FAIL,
  ADD_COURSE_REQUEST,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_FAIL,
  UPDATE_COURSE_REQUEST,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_FAIL,
  ALL_COURSE_REQUEST,
  ALL_COURSE_SUCCESS,
  ALL_COURSE_FAIL,
  DELETE_COURSE_REQUEST,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAIL,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  ALL_CATEGORY_REQUEST,
  ALL_CATEGORY_SUCCESS,
  ALL_CATEGORY_FAIL,
  ADD_FEESTRUCTURE_REQUEST,
  ADD_FEESTRUCTURE_SUCCESS,
  ADD_FEESTRUCTURE_FAIL,
  UPDATE_FEESTRUCTURE_REQUEST,
  UPDATE_FEESTRUCTURE_SUCCESS,
  UPDATE_FEESTRUCTURE_FAIL,
  DELETE_FEESTRUCTURE_REQUEST,
  DELETE_FEESTRUCTURE_SUCCESS,
  DELETE_FEESTRUCTURE_FAIL,
  ALL_FEESTRUCTURE_REQUEST,
  ALL_FEESTRUCTURE_SUCCESS,
  ALL_FEESTRUCTURE_FAIL,
  ADD_EMPLOYEETYPE_REQUEST,
  ADD_EMPLOYEETYPE_SUCCESS,
  ADD_EMPLOYEETYPE_FAIL,
  UPDATE_EMPLOYEETYPE_REQUEST,
  UPDATE_EMPLOYEETYPE_SUCCESS,
  UPDATE_EMPLOYEETYPE_FAIL,
  DELETE_EMPLOYEETYPE_REQUEST,
  DELETE_EMPLOYEETYPE_SUCCESS,
  DELETE_EMPLOYEETYPE_FAIL,
  ALL_EMPLOYEETYPE_REQUEST,
  ALL_EMPLOYEETYPE_SUCCESS,
  ALL_EMPLOYEETYPE_FAIL,
  // ADD_BRANCH_REQUEST,
  // ADD_BRANCH_SUCCESS,
  // ADD_BRANCH_FAIL,
  // UPDATE_BRANCH_REQUEST,
  // UPDATE_BRANCH_SUCCESS,
  // UPDATE_BRANCH_FAIL,
  // DELETE_BRANCH_REQUEST,
  // DELETE_BRANCH_SUCCESS,
  // DELETE_BRANCH_FAIL,
  // ALL_BRANCH_REQUEST,
  // ALL_BRANCH_SUCCESS,
  // ALL_BRANCH_FAIL,
  ADD_STUDENT_REQUEST,
  ADD_STUDENT_SUCCESS,
  ADD_STUDENT_FAIL,
  UPDATE_STUDENT_REQUEST,
  UPDATE_STUDENT_SUCCESS,
  UPDATE_STUDENT_FAIL,
  ALL_STUDENT_REQUEST,
  ALL_STUDENT_SUCCESS,
  ALL_STUDENT_FAIL,
  DELETE_STUDENT_REQUEST,
  DELETE_STUDENT_SUCCESS,
  DELETE_STUDENT_FAIL,
  ADD_Designation_REQUEST,
  ADD_Designation_SUCCESS,
  ADD_Designation_FAIL,
  DELETE_Designation_REQUEST,
  DELETE_Designation_SUCCESS,
  DELETE_Designation_FAIL,
  ALL_Designation_REQUEST,
  ALL_Designation_SUCCESS,
  ALL_Designation_FAIL,
  UPDATE_Designation_REQUEST,
  UPDATE_Designation_SUCCESS,
  UPDATE_Designation_FAIL,
  ADD_Department_REQUEST,
  ADD_Department_SUCCESS,
  ADD_Department_FAIL,
  UPDATE_Department_REQUEST,
  UPDATE_Department_SUCCESS,
  UPDATE_Department_FAIL,
  ALL_Department_REQUEST,
  ALL_Department_SUCCESS,
  ALL_Department_FAIL,
  DELETE_Department_REQUEST,
  DELETE_Department_SUCCESS,
  DELETE_Department_FAIL,
  ADD_CourseDuration_REQUEST,
  ADD_CourseDuration_SUCCESS,
  ADD_CourseDuration_FAIL,
  UPDATE_CourseDuration_REQUEST,
  UPDATE_CourseDuration_SUCCESS,
  UPDATE_CourseDuration_FAIL,
  ALL_CourseDuration_REQUEST,
  ALL_CourseDuration_SUCCESS,
  ALL_CourseDuration_FAIL,
  DELETE_CourseDuration_REQUEST,
  DELETE_CourseDuration_SUCCESS,
  DELETE_CourseDuration_FAIL,
  ADD_TEST_REQUEST,
  ADD_TEST_SUCCESS,
  ADD_TEST_FAIL,
  ALL_TEST_REQUEST,
  ALL_TEST_SUCCESS,
  ALL_TEST_FAIL,
  DELETE_TEST_REQUEST,
  DELETE_TEST_SUCCESS,
  DELETE_TEST_FAIL,
  UPDATE_TEST_REQUEST,
  UPDATE_TEST_SUCCESS,
  UPDATE_TEST_FAIL,
  ALL_CLIENT_FAIL,
  UPDATE_CREDENTIALS_REQUEST,
  UPDATE_CREDENTIALS_SUCCESS,
  UPDATE_CREDENTIALS_FAIL,
  ALL_STUDENT_TEST_REQUEST,
  ALL_STUDENT_TEST_SUCCESS,
  ALL_STUDENT_TEST_FAIL,
  UPDATE_STUDENT_TEST_REQUEST,
  UPDATE_STUDENT_TEST_SUCCESS,
  UPDATE_STUDENT_TEST_RESET_SUCCESS,
  UPDATE_STUDENT_TEST_FAIL,
  ADD_RECEIPTPREFIX_REQUEST,
  ADD_RECEIPTPREFIX_SUCCESS,
  ADD_RECEIPTPREFIX_FAIL,
  UPDATE_RECEIPTPREFIX_REQUEST,
  UPDATE_RECEIPTPREFIX_SUCCESS,
  UPDATE_RECEIPTPREFIX_FAIL,
  ALL_RECEIPTPREFIX_REQUEST,
  ALL_RECEIPTPREFIX_SUCCESS,
  ALL_RECEIPTPREFIX_FAIL,
  ALL_RECEIPTDATA_REQUEST,
  ALL_RECEIPTDATA_SUCCESS,
  ALL_RECEIPTDATA_FAIL,
} from "../constants/commanConstants";

// Get all College
export const allCollege = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({ type: ALL_COLLEGE_REQUEST });
    const { data } = await axios.get(
      `${backendApiUrl}comman/allcollege`,

      config
    );
    dispatch({
      type: ALL_COLLEGE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: ALL_COLLEGE_FAIL,
      payload: error?.response?.data?.msg,
    });
  }
};

// Get all School
export const allschool = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({ type: ALL_SCHOOL_REQUEST });
    const { data } = await axios.get(
      `${backendApiUrl}comman/allschool`,

      config
    );
    dispatch({
      type: ALL_SCHOOL_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: ALL_SCHOOL_FAIL,
      payload: error?.response?.data?.msg,
    });
  }
};

// Get all School
export const alCoaching = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({ type: ALL_COACHING_REQUEST });
    const { data } = await axios.get(
      `${backendApiUrl}comman/allcoaching`,

      config
    );
    dispatch({
      type: ALL_COACHING_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: ALL_COACHING_FAIL,
      payload: error?.response?.data?.msg,
    });
  }
};

// Get all School
export const allClient = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({ type: ALL_CLIENT_REQUEST });
    const { data } = await axios.get(
      `${backendApiUrl}comman/allclient`,

      config
    );
    dispatch({
      type: ALL_CLIENT_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: ALL_CLIENT_FAIL,
      payload: error?.response?.data?.msg,
    });
  }
};

export const Addbatch = (datas, setOpen) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: ADD_BATCH_REQUEST });

    const { data } = await axios.post(
      `${backendApiUrl}coaching/batch`,
      datas,
      config
    );

    if (data?.status) {
      toast.success(data?.msg, {
        autoClose: 1000,
      });
      setOpen(false);
    }

    dispatch({
      type: ADD_BATCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_BATCH_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
  }
};

// post add enquiry
export const Updatebatch = (datas, setOpen) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: UPDATE_BATCH_REQUEST });

    const { data } = await axios.put(
      `${backendApiUrl}coaching/batch`,
      datas,
      config
    );

    if (data?.status) {
      toast.success(data?.msg, {
        autoClose: 1000,
      });
      setOpen(false);
    }

    dispatch({
      type: UPDATE_BATCH_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_BATCH_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
  }
};

// delete  enquiry
export const deletebatch = (deleteid, setOpenalert) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BATCH_REQUEST });
    serverInstance("coaching/batch", "delete", {
      id: deleteid,
    }).then((res) => {
      if (res?.status) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpenalert(false);
      }
      console.log("delete data is ", res);
      dispatch({
        type: DELETE_BATCH_SUCCESS,
        payload: res?.data,
      });
    });
  } catch (error) {
    dispatch({
      type: DELETE_BATCH_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
    setOpenalert(false);
  }
};

// Get all Enquiry
export const getbatch = (page, limit, setPage) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: ALL_BATCH_REQUEST });

    const { data } = await axios.get(
      `${backendApiUrl}coaching/batch`,

      config
    );
    dispatch({
      type: ALL_BATCH_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    dispatch({
      type: ALL_BATCH_FAIL,
      payload: error?.response?.data?.msg,
    });
  }
};

export const Addcourse = (datas, setOpen) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: ADD_COURSE_REQUEST });

    const { data } = await axios.post(
      `${backendApiUrl}comman/course`,
      datas,
      config
    );

    if (data?.status) {
      toast.success(data?.msg, {
        autoClose: 1000,
      });
      setOpen(false);
    }

    dispatch({
      type: ADD_COURSE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_COURSE_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
  }
};

// post add enquiry
export const UpdateCourse = (datas, setOpen) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: UPDATE_COURSE_REQUEST });

    const { data } = await axios.put(
      `${backendApiUrl}comman/course`,
      datas,
      config
    );

    if (data?.status) {
      toast.success(data?.msg, {
        autoClose: 1000,
      });
      setOpen(false);
    }

    dispatch({
      type: UPDATE_COURSE_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_COURSE_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
  }
};

// delete  enquiry
export const deletecourse = (deleteid, setOpenalert) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_COURSE_REQUEST });
    serverInstance("comman/course", "delete", {
      id: deleteid,
    }).then((res) => {
      if (res?.status) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpenalert(false);
      }

      dispatch({
        type: DELETE_COURSE_SUCCESS,
        payload: res?.data,
      });
    });
  } catch (error) {
    dispatch({
      type: DELETE_COURSE_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
    setOpenalert(false);
  }
};

// Get all Enquiry
export const getcourse = (page, limit, setPage) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: ALL_COURSE_REQUEST });

    const { data } = await axios.get(
      `${backendApiUrl}comman/course`,

      config
    );
    dispatch({
      type: ALL_COURSE_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    dispatch({
      type: ALL_COURSE_FAIL,
      payload: error?.response?.data?.msg,
    });
  }
};

export const Addcategory = (datas, setOpen) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: ADD_CATEGORY_REQUEST });

    const { data } = await axios.post(
      `${backendApiUrl}comman/studentcategory`,
      datas,
      config
    );

    if (data?.status) {
      toast.success(data?.msg, {
        autoClose: 1000,
      });
      setOpen(false);
    }

    dispatch({
      type: ADD_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_CATEGORY_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
  }
};

// post add enquiry
export const Updatecategory = (datas, setOpen) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: UPDATE_CATEGORY_REQUEST });

    const { data } = await axios.put(
      `${backendApiUrl}comman/studentcategory`,
      datas,
      config
    );

    if (data?.status) {
      toast.success(data?.msg, {
        autoClose: 1000,
      });
      setOpen(false);
    }

    dispatch({
      type: UPDATE_CATEGORY_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CATEGORY_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
  }
};

// delete  enquiry
export const deletecategory = (deleteid, setOpenalert) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORY_REQUEST });
    serverInstance("comman/studentcategory", "delete", {
      id: deleteid,
    }).then((res) => {
      if (res?.status) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpenalert(false);
      }

      dispatch({
        type: DELETE_CATEGORY_SUCCESS,
        payload: res?.data,
      });
    });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
    setOpenalert(false);
  }
};

// Get all Enquiry
export const getcategory = (page, limit, setPage) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: ALL_CATEGORY_REQUEST });

    const { data } = await axios.get(
      `${backendApiUrl}comman/studentcategory`,

      config
    );
    dispatch({
      type: ALL_CATEGORY_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    dispatch({
      type: ALL_CATEGORY_FAIL,
      payload: error?.response?.data?.msg,
    });
  }
};

export const AddFee = (datas, setOpen) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: ADD_FEESTRUCTURE_REQUEST });

    const { data } = await axios.post(
      `${backendApiUrl}comman/fee`,
      datas,
      config
    );

    if (data?.status) {
      toast.success(data?.msg, {
        autoClose: 1000,
      });
      setOpen(false);
    }

    dispatch({
      type: ADD_FEESTRUCTURE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_FEESTRUCTURE_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
  }
};

// post add enquiry
export const Updatefee = (datas, setOpen) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: UPDATE_FEESTRUCTURE_REQUEST });

    const { data } = await axios.put(
      `${backendApiUrl}comman/fee`,
      datas,
      config
    );

    if (data?.status) {
      toast.success(data?.msg, {
        autoClose: 1000,
      });
      setOpen(false);
    }

    dispatch({
      type: UPDATE_FEESTRUCTURE_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_FEESTRUCTURE_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
  }
};

// delete  enquiry
export const deletefee = (deleteid, setOpenalert) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_FEESTRUCTURE_REQUEST });
    serverInstance("comman/fee", "delete", {
      id: deleteid,
    }).then((res) => {
      if (res?.status) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpenalert(false);
      }

      dispatch({
        type: DELETE_FEESTRUCTURE_SUCCESS,
        payload: res?.data,
      });
    });
  } catch (error) {
    dispatch({
      type: DELETE_FEESTRUCTURE_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
    setOpenalert(false);
  }
};

// Get all Enquiry
export const getfee = (page, limit, setPage) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: ALL_FEESTRUCTURE_REQUEST });

    const { data } = await axios.get(
      `${backendApiUrl}comman/fee`,

      config
    );
    dispatch({
      type: ALL_FEESTRUCTURE_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    dispatch({
      type: ALL_FEESTRUCTURE_FAIL,
      payload: error?.response?.data?.msg,
    });
  }
};

export const AddDesignation = (datas, setOpen) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: ADD_Designation_REQUEST });

    const { data } = await axios.post(
      `${backendApiUrl}comman/designation`,
      datas,
      config
    );

    if (data?.status) {
      toast.success(data?.msg, {
        autoClose: 1000,
      });
      setOpen(false);
    }

    dispatch({
      type: ADD_Designation_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_Designation_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
  }
};

// post add enquiry
export const UpdateDesignation = (datas, setOpen) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: UPDATE_Designation_REQUEST });

    const { data } = await axios.put(
      `${backendApiUrl}comman/designation`,
      datas,
      config
    );

    if (data?.status) {
      toast.success(data?.msg, {
        autoClose: 1000,
      });
      setOpen(false);
    }

    dispatch({
      type: UPDATE_Designation_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_Designation_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
  }
};

// delete  enquiry
export const deleteDesignation =
  (deleteid, setOpenalert) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_Designation_REQUEST });
      serverInstance("comman/designation", "delete", {
        id: deleteid,
      }).then((res) => {
        if (res?.status) {
          toast.success(res?.msg, {
            autoClose: 1000,
          });
          setOpenalert(false);
        }

        dispatch({
          type: DELETE_Designation_SUCCESS,
          payload: res?.data,
        });
      });
    } catch (error) {
      dispatch({
        type: DELETE_Designation_FAIL,
        payload: error?.response?.data?.msg,
      });
      toast.error(error?.response?.data?.msg, { autoClose: 1000 });
      setOpenalert(false);
    }
  };

// Get all Enquiry
export const getDesignation = (page, limit, setPage) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: ALL_Designation_REQUEST });

    const { data } = await axios.get(
      `${backendApiUrl}comman/designation`,
      config
    );

    dispatch({
      type: ALL_Designation_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    dispatch({
      type: ALL_Designation_FAIL,
      payload: error?.response?.data?.msg,
    });
  }
};

export const Addstudent = (datas) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: ADD_STUDENT_REQUEST });

    const { data } = await axios.post(
      `${backendApiUrl}student/addstudent`,
      datas,
      config
    );

    if (data?.status) {
      toast.success(data?.msg, {
        autoClose: 1000,
      });
    }

    dispatch({
      type: ADD_STUDENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_STUDENT_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
  }
};

// post add enquiry
export const Updatestudent = (datas, setOpen) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: UPDATE_STUDENT_REQUEST });

    const { data } = await axios.put(
      `${backendApiUrl}student/addstudent`,
      datas,
      config
    );

    if (data?.status) {
      toast.success(data?.msg, {
        autoClose: 1000,
      });
      setOpen(false);
    }

    dispatch({
      type: UPDATE_STUDENT_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_STUDENT_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
  }
};

// delete  enquiry
export const deletestudent = (deleteid, setOpenalert) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_STUDENT_REQUEST });
    serverInstance(`student/addstudent?id=${deleteid}`, "delete", {
      id: deleteid,
    }).then((res) => {
      if (res?.status) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpenalert(false);
      }

      dispatch({
        type: DELETE_STUDENT_SUCCESS,
        payload: res?.data,
      });
    });
  } catch (error) {
    dispatch({
      type: DELETE_STUDENT_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
    setOpenalert(false);
  }
};

// Get all Enquiry
export const getstudent =
  (
    fromdate,
    todate,
    scoursename,
    sbatch,
    sstudent,
    sfathers,
    rollnumber,
    status
  ) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("erptoken")}`,
        },
      };
      if (
        fromdate ||
        todate ||
        scoursename ||
        sbatch ||
        sfathers ||
        sstudent ||
        rollnumber ||
        status
      ) {
        dispatch({ type: ALL_STUDENT_REQUEST });
        const { data } = await axios.get(
          `${backendApiUrl}student/addstudent?name=${scoursename}&batch=${sbatch}&fromdate=${fromdate}&todate=${todate}&fathers=${sfathers}&studentname=${sstudent}&rollnumber=${rollnumber}&status=${status}`,
          config
        );
        dispatch({
          type: ALL_STUDENT_SUCCESS,
          payload: data?.data,
        });
      } else {
        dispatch({ type: ALL_STUDENT_REQUEST });
        const { data } = await axios.get(
          `${backendApiUrl}student/addstudent`,

          config
        );
        dispatch({
          type: ALL_STUDENT_SUCCESS,
          payload: data?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: ALL_STUDENT_FAIL,
        payload: error?.response?.data?.msg,
      });
    }
  };

export const AddEmployee = (datas, setOpen) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: ADD_EMPLOYEETYPE_REQUEST });

    const { data } = await axios.post(
      `${backendApiUrl}comman/createemployee`,
      datas,
      config
    );

    if (data?.status) {
      toast.success(data?.msg, {
        autoClose: 1000,
      });
      setOpen(false);
    }

    dispatch({
      type: ADD_EMPLOYEETYPE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_EMPLOYEETYPE_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
  }
};

// post add enquiry
export const UpdateEmployee = (datas, setOpen) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: UPDATE_EMPLOYEETYPE_REQUEST });

    const { data } = await axios.put(
      `${backendApiUrl}comman/updateemployee`,
      datas,
      config
    );

    if (data?.status) {
      toast.success(data?.msg, {
        autoClose: 1000,
      });
      setOpen(false);
    }

    dispatch({
      type: UPDATE_EMPLOYEETYPE_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_EMPLOYEETYPE_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
  }
};

// delete  enquiry
export const deleteEmployee = (deleteid, setOpenalert) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EMPLOYEETYPE_REQUEST });
    serverInstance("comman/deleteemployee", "delete", {
      id: deleteid,
    }).then((res) => {
      if (res?.status) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpenalert(false);
      }

      dispatch({
        type: DELETE_EMPLOYEETYPE_SUCCESS,
        payload: res?.data,
      });
    });
  } catch (error) {
    dispatch({
      type: DELETE_EMPLOYEETYPE_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
    setOpenalert(false);
  }
};

// Get all Enquiry
export const getEmployee = (fromdate, todate, sstudent,status) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: ALL_EMPLOYEETYPE_REQUEST });
    if (fromdate || todate || sstudent||status) {
      dispatch({ type: ALL_STUDENT_REQUEST });
      const { data } = await axios.get(
        `${backendApiUrl}comman/allemployee?name=${sstudent}&fromdate=${fromdate}&todate=${todate}&status=${status}`,
        config
      );
      dispatch({
        type: ALL_EMPLOYEETYPE_SUCCESS,
        payload: data?.data,
      });
    } else {
      const { data } = await axios.get(
        `${backendApiUrl}comman/allemployee`,
        config
      );

      dispatch({
        type: ALL_EMPLOYEETYPE_SUCCESS,
        payload: data?.data,
      });
    }
  } catch (error) {
    dispatch({
      type: ALL_EMPLOYEETYPE_FAIL,
      payload: error?.response?.data?.msg,
    });
  }
};

export const AddDepartment = (datas, setOpen) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: ADD_Department_REQUEST });

    const { data } = await axios.post(
      `${backendApiUrl}comman/department`,
      datas,
      config
    );

    if (data?.status) {
      toast.success(data?.msg, {
        autoClose: 1000,
      });
      setOpen(false);
    }

    dispatch({
      type: ADD_Department_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_Department_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
  }
};

// post add enquiry
export const UpdateDepartment = (datas, setOpen) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: UPDATE_Department_REQUEST });

    const { data } = await axios.put(
      `${backendApiUrl}comman/department`,
      datas,
      config
    );

    if (data?.status) {
      toast.success(data?.msg, {
        autoClose: 1000,
      });
      setOpen(false);
    }

    dispatch({
      type: UPDATE_Department_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_Department_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
  }
};

// delete  enquiry
export const deleteDepartment =
  (deleteid, setOpenalert) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_Department_REQUEST });
      serverInstance("comman/department", "delete", {
        id: deleteid,
      }).then((res) => {
        if (res?.status) {
          toast.success(res?.msg, {
            autoClose: 1000,
          });
          setOpenalert(false);
        }

        dispatch({
          type: DELETE_Department_SUCCESS,
          payload: res?.data,
        });
      });
    } catch (error) {
      dispatch({
        type: DELETE_Department_FAIL,
        payload: error?.response?.data?.msg,
      });
      toast.error(error?.response?.data?.msg, { autoClose: 1000 });
      setOpenalert(false);
    }
  };

// Get all Enquiry
export const getDepartment = (page, limit, setPage) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: ALL_Department_REQUEST });

    const { data } = await axios.get(
      `${backendApiUrl}comman/department`,
      config
    );

    console.log("data from department", data?.data);

    dispatch({
      type: ALL_Department_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    dispatch({
      type: ALL_Department_FAIL,
      payload: error?.response?.data?.msg,
    });
  }
};

export const AddCourseDuration = (datas, setOpen) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: ADD_CourseDuration_REQUEST });

    const { data } = await axios.post(
      `${backendApiUrl}comman/courseduration`,
      datas,
      config
    );

    if (data?.status) {
      toast.success(data?.msg, {
        autoClose: 1000,
      });
      setOpen(false);
    }

    dispatch({
      type: ADD_CourseDuration_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_CourseDuration_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
  }
};

// post add enquiry
export const UpdateCourseDuration = (datas, setOpen) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: UPDATE_CourseDuration_REQUEST });

    const { data } = await axios.put(
      `${backendApiUrl}comman/courseduration`,
      datas,
      config
    );

    if (data?.status) {
      toast.success(data?.msg, {
        autoClose: 1000,
      });
      setOpen(false);
    }

    dispatch({
      type: UPDATE_CourseDuration_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CourseDuration_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
  }
};

// delete  enquiry
export const deleteCourseDuration =
  (deleteid, setOpenalert) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_CourseDuration_REQUEST });
      serverInstance("comman/courseduration", "delete", {
        id: deleteid,
      }).then((res) => {
        if (res?.status) {
          toast.success(res?.msg, {
            autoClose: 1000,
          });
          setOpenalert(false);
        }

        dispatch({
          type: DELETE_CourseDuration_SUCCESS,
          payload: res?.data,
        });
      });
    } catch (error) {
      dispatch({
        type: DELETE_CourseDuration_FAIL,
        payload: error?.response?.data?.msg,
      });
      toast.error(error?.response?.data?.msg, { autoClose: 1000 });
      setOpenalert(false);
    }
  };

// Get all Enquiry
export const getCourseDuration = (page, limit, setPage) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: ALL_CourseDuration_REQUEST });

    const { data } = await axios.get(
      `${backendApiUrl}comman/courseduration`,
      config
    );

    console.log("data from course", data?.data);

    dispatch({
      type: ALL_CourseDuration_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    dispatch({
      type: ALL_CourseDuration_FAIL,
      payload: error?.response?.data?.msg,
    });
  }
};

export const Addtest = (datas, setOpen) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: ADD_TEST_REQUEST });

    const { data } = await axios.post(
      `${backendApiUrl}test/addtest`,
      datas,
      config
    );

    if (data?.status) {
      toast.success(data?.msg, {
        autoClose: 1000,
      });
      setOpen(false);
    }

    dispatch({
      type: ADD_TEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_TEST_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
  }
};

// post add enquiry
export const Updatetest = (datas, setOpen) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: UPDATE_TEST_REQUEST });

    const { data } = await axios.put(
      `${backendApiUrl}test/updatetest`,
      datas,
      config
    );

    if (data?.status) {
      toast.success(data?.msg, {
        autoClose: 1000,
      });
      setOpen(false);
    }

    dispatch({
      type: UPDATE_TEST_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TEST_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
  }
};

// delete  enquiry
export const deleteTest = (deleteid, setOpenalert) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TEST_REQUEST });
    serverInstance("test/deletetest", "delete", {
      id: deleteid,
    }).then((res) => {
      if (res?.status) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpenalert(false);
      }

      dispatch({
        type: DELETE_TEST_SUCCESS,
        payload: res?.data,
      });
    });
  } catch (error) {
    dispatch({
      type: DELETE_TEST_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
    setOpenalert(false);
  }
};

// Get all Enquiry
export const getTest =
  (fromdate, todate, scoursename, sbatch, page, limit, setPage) =>
  async (dispatch) => {
    try {
      if (fromdate || todate || scoursename || sbatch) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("erptoken")}`,
          },
        };
        dispatch({ type: ALL_TEST_REQUEST });

        const { data } = await axios.get(
          `${backendApiUrl}test/getalltest?course=${scoursename}&batch=${sbatch}&testdate=${todate}`,
          config
        );
        dispatch({
          type: ALL_TEST_SUCCESS,
          payload: data?.data,
        });
      } else {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("erptoken")}`,
          },
        };
        dispatch({ type: ALL_TEST_REQUEST });

        const { data } = await axios.get(
          `${backendApiUrl}test/getalltest`,
          config
        );
        dispatch({
          type: ALL_TEST_SUCCESS,
          payload: data?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: ALL_TEST_FAIL,
        payload: error?.response?.data?.msg,
      });
    }
  };

// post add enquiry
export const Updatecredentials = (formData, setOpen) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: UPDATE_CREDENTIALS_REQUEST });

    const { data } = await axios.put(
      `${backendApiUrl}comman/credentials`,
      formData,
      config
    );
    if (data?.status) {
      toast.success(data?.msg, {
        autoClose: 1000,
      });
      setOpen(false);
    }

    dispatch({
      type: UPDATE_CREDENTIALS_SUCCESS,
      payload: data?.status,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CREDENTIALS_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
  }
};

// post add enquiry
export const Adddresult = (datas, setOpen) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };

    dispatch({ type: UPDATE_STUDENT_TEST_REQUEST });

    const { data } = await axios.post(
      `${backendApiUrl}test/addtestretult`,
      datas,
      config
    );

    if (data?.status) {
      toast.success(data?.msg, {
        autoClose: 1000,
      });
      setOpen(false);
    }

    dispatch({
      type: UPDATE_STUDENT_TEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_STUDENT_TEST_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
  }
};

// Get all Enquiry
export const getStudenttest = (page, limit, setPage) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: ALL_STUDENT_TEST_REQUEST });

    const { data } = await axios.get(
      `${backendApiUrl}test/getstudentalltest`,
      config
    );

    console.log("data from course", data?.data);

    dispatch({
      type: ALL_STUDENT_TEST_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    dispatch({
      type: ALL_STUDENT_TEST_FAIL,
      payload: error?.response?.data?.msg,
    });
  }
};

export const AddReceiptPrefix = (datas, setOpen) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: ADD_RECEIPTPREFIX_REQUEST });

    const { data } = await axios.post(
      `${backendApiUrl}comman/receiptprefix`,
      datas,
      config
    );

    if (data?.status) {
      toast.success(data?.msg, {
        autoClose: 1000,
      });
      setOpen(false);
    }

    dispatch({
      type: ADD_RECEIPTPREFIX_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_RECEIPTPREFIX_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
  }
};

// post add enquiry
export const UpdateReceiptPrefix = (datas, setOpen) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: UPDATE_RECEIPTPREFIX_REQUEST });

    const { data } = await axios.put(
      `${backendApiUrl}comman/receiptprefix`,
      datas,
      config
    );

    if (data?.status) {
      toast.success(data?.msg, {
        autoClose: 1000,
      });
      setOpen(false);
    }

    dispatch({
      type: UPDATE_RECEIPTPREFIX_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_RECEIPTPREFIX_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
  }
};

// Get all Enquiry
export const getReceiptPrefix = (page, limit, setPage) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: ALL_RECEIPTPREFIX_REQUEST });

    const { data } = await axios.get(
      `${backendApiUrl}comman/receiptprefix`,

      config
    );
    dispatch({
      type: ALL_RECEIPTPREFIX_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    dispatch({
      type: ALL_RECEIPTPREFIX_FAIL,
      payload: error?.response?.data?.msg,
    });
  }
};

// Get all Enquiry
export const getPrintReceipt =
  (fromdate, scoursename, sstudent, rollnumber) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("erptoken")}`,
        },
      };
      if (fromdate || scoursename || sstudent || rollnumber) {
        dispatch({ type: ALL_RECEIPTDATA_REQUEST });
        const { data } = await axios.get(
          `${backendApiUrl}student/getreceiptdata?name=${scoursename}&fromdate=${fromdate}&studentname=${sstudent}&rollnumber=${rollnumber}`,
          config
        );
        dispatch({
          type: ALL_RECEIPTDATA_SUCCESS,
          payload: data?.data,
        });
      } else {
        dispatch({ type: ALL_RECEIPTDATA_REQUEST });
        const { data } = await axios.get(
          `${backendApiUrl}student/getreceiptdata`,

          config
        );
        dispatch({
          type: ALL_RECEIPTDATA_SUCCESS,
          payload: data?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: ALL_RECEIPTDATA_FAIL,
        payload: error?.response?.data?.msg,
      });
    }
  };
