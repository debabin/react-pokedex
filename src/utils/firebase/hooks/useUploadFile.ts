import {
  ref,
  uploadBytesResumable,
  UploadMetadata,
  UploadResult,
  UploadTaskSnapshot,
  getDownloadURL
} from 'firebase/storage';
import React from 'react';
import { usePromise } from '@utils/hooks';

import { storage } from '../instance';

export const useUploadFile = (name: string) => {
  const storageRef = ref(storage, name);
  const { isLoading, setIsLoading, isError, setError, error } = usePromise<UploadResult>();

  const [snapshot, setSnapshot] = React.useState<UploadTaskSnapshot>();
  const [progresspercent, setProgresspercent] = React.useState(0);

  const uploadFile = async (
    data: Blob | Uint8Array | ArrayBuffer,
    metadata?: UploadMetadata | undefined
  ): Promise<(UploadResult & { url: string }) | undefined> =>
    new Promise((resolve, reject) => {
      setIsLoading(true);
      const uploadTask = uploadBytesResumable(storageRef, data, metadata);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setSnapshot(snapshot);
          setProgresspercent(progress);
        },
        (error) => {
          setError(error.message);
          reject(new Error('something went wrong with file uploading'));
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);

          resolve({
            url,
            metadata: uploadTask.snapshot.metadata,
            ref: uploadTask.snapshot.ref
          });
          setIsLoading(false);
        }
      );
    });

  return { uploadFile, progresspercent, snapshot, isUploading: isLoading, error, isError };
};
