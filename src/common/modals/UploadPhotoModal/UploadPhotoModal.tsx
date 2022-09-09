import React from 'react';

import { Button } from '@common';
import { useUpdateDocumentMutation, useUploadFile } from '@utils/firebase';

import type { ModalProps } from '../Modal/Modal';
import { Modal } from '../Modal/Modal';

interface UploadPhotoModalProps extends Omit<ModalProps, 'children' | 'loading'> {
  uid: User['uid'];
}

export const UploadPhotoModal: React.FC<UploadPhotoModalProps> = ({ onClose, uid, ...props }) => {
  const [loading, setLoading] = React.useState(false);

  const photoName = `photo_${uid}`;
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { uploadFile, progresspercent } = useUploadFile(photoName);
  const updateDocumentMutation = useUpdateDocumentMutation();

  const onFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setLoading(true);
    const result = await uploadFile(event.target.files[0]);

    await updateDocumentMutation.mutateAsync({
      collection: 'users',
      data: { photoURL: result?.url },
      id: uid
    });

    onClose();
    setLoading(false);
  };

  return (
    <Modal {...props} onClose={onClose}>
      <label htmlFor='upload-button'>
        <input
          type='file'
          id='upload-button'
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={onFileInputChange}
        />
        <Button variant='text' onClick={() => !loading && fileInputRef.current?.click()}>
          {!loading ? 'Upload your photo' : `${progresspercent}%`}
        </Button>
      </label>
      <Button onClick={onClose} loading={loading}>
        CANCEL
      </Button>
    </Modal>
  );
};
