import React,{useState,useEffect} from "react";
import styles from "@/styles/register.module.css";
function UploadPdfTest() {
    const [typefileuploaded, settypefileuploaded] = useState("");
    const [preview2, setpreview2] = useState(null);
  return (
    <>
   
        <div className={styles.inputdiv}>
          <label>Upload Test File</label>
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              settypefileuploaded(file?.name?.split(".")[1]);
              // if (file?.name?.split(".")[1] === "pdf") {
              //   let reader = FileReader();
              //   reader.readAsDataUrl(file);
              //   reader.onload = (e) => {
              //     setpreviewpdf(e.target.result);
              //   };
              // }

              const maxFileSize = 2000000 * 1024 * 1024; // 5 MB in bytes

              if (file && file.size > maxFileSize) {
                alert("File size exceeds the limit of 5 MB.");

                e.target.value = ""; // Clear the file input
                settestfile(e.target.files[0]);
                setpreviewpdf(e.target.files[0]);

                return;
              } else {
                settestfile(file);
                setpreviewpdf(URL.createObjectURL(file));
                setpreview2(URL.createObjectURL(file));
              }
            }}
          />
        </div>
        {typefileuploaded === "pdf" ? (
          <>
            <div className={styles.inputdivimg10}>
              <label>Preview of test paper</label>
              <object data={preview2} width="100%" height="500" />
            </div>
          </>
        ) : (
          <>
            {preview2 && (
              <>
                <div className={styles.inputdivimg10}>
                  <label>Preview of test paper</label>
                  <img
                    className="keydetailsdivlogoimg10"
                    src={preview2}
                    alt="imgdd"
                  />
                </div>
              </>
            )}
          </>
        )}
    
    </>
  );
}

export default UploadPdfTest;
