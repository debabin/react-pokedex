import React from 'react';

import { IconButton, SettingChangeModal, UploadPhotoModal } from '@common';
import { PenIcon } from '@common/icons';
import type { SettingModalItem } from '@common/modals';
import { useStore } from '@utils/contexts';
import { useUsersCollection } from '@utils/firebase';

import { Setting } from './Setting/Setting';

import styles from './SettingsPage.module.css';

export const SettingsPage = () => {
  const [isShowUploadPhotoModal, setIsShowUploadPhotoModal] = React.useState(false);
  const [selectedSetting, setSelectedSetting] = React.useState<SettingModalItem | null>(null);

  const { user } = useStore();

  const userDocument = useUsersCollection({ uid: user.uid });

  if (userDocument.isLoading || !userDocument.data) return null;
  const profile = userDocument.data[0];

  const photoURL = profile.photoURL!;

  return (
    <div className='page'>
      <div className={styles.image_container}>
        <img aria-hidden src={photoURL} alt='photoURL' />
        <div>
          <IconButton
            icon={<PenIcon />}
            onClick={() => setIsShowUploadPhotoModal(!isShowUploadPhotoModal)}
          />
        </div>
      </div>

      <ul className={styles.settings}>
        <li>
          <Setting label='User id' value={profile.uid} />
        </li>
        {profile.email && (
          <li>
            <Setting label='Email' value={profile.email} />
          </li>
        )}
        {profile.displayName && (
          <li>
            <Setting
              label='Your name'
              value={profile.displayName}
              onClick={() =>
                setSelectedSetting({ type: 'displayName', value: profile.displayName })
              }
            />
          </li>
        )}

        <li>
          <Setting
            label='City'
            value={profile.city ?? 'no data'}
            onClick={() => setSelectedSetting({ type: 'city', value: profile.city ?? '' })}
          />
        </li>
      </ul>

      <UploadPhotoModal
        isShowing={isShowUploadPhotoModal}
        onClose={() => setIsShowUploadPhotoModal(false)}
      />

      <SettingChangeModal setting={selectedSetting} onClose={() => setSelectedSetting(null)} />
    </div>
  );
};
