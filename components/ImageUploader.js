/* eslint-disable jsx-a11y/label-has-associated-control */
// import { useState } from "react";
// import { auth, storage, STATE_CHANGED } from "@lib/firebase";
import { Button, Tooltip, Text } from "@geist-ui/core";
import Loader from "./Loader";

// Uploads images to Firebase Storage
export default function ImageUploader() {
  // const [uploading, setUploading] = useState(false);
  // const [progress, setProgress] = useState(0);
  // const [downloadURL, setDownloadURL] = useState(null);

  // Creates a Firebase Upload Task
  // const uploadFile = async (e) => {
  //   // Get the file
  //   const file = Array.from(e.target.files)[0];
  //   const extension = file.type.split("/")[1];

  //   // Makes reference to the storage bucket location
  //   const ref = storage.ref(
  //     `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`
  //   );
  //   setUploading(true);

  //   // Starts the upload
  //   const task = ref.put(file);

  //   // Listen to updates to upload task
  //   task.on(STATE_CHANGED, (snapshot) => {
  //     const pct = (
  //       (snapshot.bytesTransferred / snapshot.totalBytes) *
  //       100
  //     ).toFixed(0);
  //     setProgress(pct);
  //   });

  //   // Get downloadURL AFTER task resolves (Note: this is not a native Promise)
  //   task
  //     .then((d) => ref.getDownloadURL())
  //     .then((url) => {
  //       setDownloadURL(url);
  //       setUploading(false);
  //     });
  // };

  return (
    <div className="box">
      <Loader show={uploading} />
      {uploading && <h3>{progress}%</h3>}

      {!uploading && (
        <>
          <label className="hidden">📸 Upload Img</label>
          <div className="flex space-x-2 items-center">
            <Text>Upload Cover Image</Text>
            <Tooltip text="Feature comming soon⏳">
              <Button scale={1 / 2} disabled type="secondary" auto>
                Choose file
              </Button>
            </Tooltip>
          </div>
        </>
      )}

      {downloadURL && (
        <code className="upload-snippet">{`![alt](${downloadURL})`}</code>
      )}
    </div>
  );
}
