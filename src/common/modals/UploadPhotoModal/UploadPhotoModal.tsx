import React from 'react';

import { Button } from '@common';
import { useStore } from '@utils/contexts';
import { useUpdateDocumentMutation, useUploadFile } from '@utils/firebase';

import type { ModalProps } from '../Modal/Modal';
import { Modal } from '../Modal/Modal';

interface UploadPhotoModalProps extends Omit<ModalProps, 'children'> {}

export const UploadPhotoModal: React.FC<UploadPhotoModalProps> = ({ onClose, ...props }) => {
  const { user } = useStore();
  const photoName = `photo_${user.uid}`;

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { uploadFile, isUploading, progresspercent } = useUploadFile(photoName);
  const updateDocumentMutation = useUpdateDocumentMutation({
    options: {
      onSuccess: () => {
        onClose();
      }
    }
  });

  const onFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const result = await uploadFile(event.target.files[0]);

    updateDocumentMutation.mutate({
      collection: 'users',
      data: { photoURL: result?.url },
      id: user.uid
    });
  };

  const photoIsUploading = updateDocumentMutation.isLoading || isUploading;

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
        <Button variant='text' onClick={() => fileInputRef.current?.click()}>
          {!photoIsUploading ? 'Upload your photo' : `${progresspercent}%`}
        </Button>
      </label>

      <Button
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        loading={photoIsUploading}
      >
        CANCEL
      </Button>
    </Modal>
  );
};
