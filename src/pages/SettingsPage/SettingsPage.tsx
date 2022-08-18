import React from 'react';

import { Button, UploadPhotoModal, Typography } from '@common';
import { useStore } from '@utils/contexts';
import { useUpdateDocumentMutation, useUploadFile, useUsersCollection } from '@utils/firebase';

import styles from './SettingsPage.module.css';

export const SettingsPage = () => {
  const [isShowUploadPhotoModal, setIsShowUploadPhotoModal] = React.useState(false);

  const { user } = useStore();
  const photoUrlId = `photoUrl_${user.uid}`;
  const { uploadFile, progresspercent } = useUploadFile(photoUrlId);
  const updateDocumentMutation = useUpdateDocumentMutation();

  const userDocument = useUsersCollection({ uid: user.uid });

  const [image, setImage] = React.useState<{ preview: string; raw: File } | null>(null);
  const handleChange = async (e: any) => {
    setImage({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0]
    });
    const result = await uploadFile(e.target.files[0]);

    updateDocumentMutation.mutate({
      collection: 'users',
      data: { photoURL: result?.url },
      id: user.uid
    });
  };

  if (userDocument.isLoading || !userDocument.data) return null;
  const profile = userDocument.data[0];

  const photoURL = profile.photoURL!;

  return (
    <div className='page'>
      <div className={styles.user_image_container}>
        <img
          aria-hidden
          src={photoURL}
          onClick={() => setIsShowUploadPhotoModal(!isShowUploadPhotoModal)}
          alt='photoURL'
        />
      </div>

      <Typography tag='h1' variant='title'>
        {profile.displayName}
      </Typography>

      <UploadPhotoModal
        isShowing={isShowUploadPhotoModal}
        onClose={() => setIsShowUploadPhotoModal(false)}
      />
    </div>
  );
};
