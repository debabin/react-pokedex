import classnames from 'classnames';
import React from 'react';

import { IconButton, SettingChangeModal, Spinner, UploadPhotoModal } from '@common';
import { PenIcon } from '@common/icons';
import type { SettingModalItem } from '@common/modals';
import { useAuthState } from '@utils/firebase';

import { Setting } from './Setting/Setting';

import styles from './SettingsPage.module.css';

export const SettingsPage = () => {
  const [isShowUploadPhotoModal, setIsShowUploadPhotoModal] = React.useState(false);
  const [selectedSetting, setSelectedSetting] = React.useState<SettingModalItem | null>(null);

  const authState = useAuthState();

  if (!authState.data) return <Spinner />;
  const user = authState.data;

  const photoURL = user.photoURL!;

  return (
    <div className={classnames('page', styles.settings_container)}>
      <div className={styles.image_container}>
        <img aria-hidden src={photoURL} alt='photoURL' />
        <div>
          <IconButton
            icon={<PenIcon />}
            onClick={() => setIsShowUploadPhotoModal(!isShowUploadPhotoModal)}
          />
        </div>
      </div>
      <div className='card'>
        <ul className={styles.settings}>
          <li>
            <Setting label='User id' value={user.uid} />
          </li>
          {user.email && (
            <li>
              <Setting label='Email' value={user.email} />
            </li>
          )}
          {user.displayName && (
            <li>
              <Setting
                label='Your name'
                value={user.displayName}
                onClick={() => setSelectedSetting({ type: 'displayName', value: user.displayName })}
              />
            </li>
          )}

          <li>
            <Setting
              label='City'
              value={user.city ?? 'no data'}
              onClick={() => setSelectedSetting({ type: 'city', value: user.city ?? '' })}
            />
          </li>
        </ul>
      </div>
      <UploadPhotoModal
        uid={user.uid}
        isShowing={isShowUploadPhotoModal}
        onClose={() => setIsShowUploadPhotoModal(false)}
      />
      <SettingChangeModal setting={selectedSetting} onClose={() => setSelectedSetting(null)} />
    </div>
  );
};
