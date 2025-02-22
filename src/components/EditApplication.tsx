import { useTranslation } from 'react-i18next';
import { Application } from '../types';
import { closeDialog } from '../utils';
import { ApplicationForm } from './ApplicationForm';
import { CloseIcon } from './CloseIcon';

export function EditApplication({ application }: { application: Application }) {
  const { t } = useTranslation();

  return (
    <dialog id="edit-application">
      <button
        className="dialog-close"
        onClick={() => closeDialog('edit-application')}
        aria-label={t('close')}>
        <CloseIcon />
      </button>
      <div className="dialog-content">
        {application.applicants ? (
          <>
            <h2 className="h3">
              {t('your_application_for')}: {application.applicants[0].firstName}
            </h2>
            <ApplicationForm application={application} />
          </>
        ) : (
          <h2>{t('error')}</h2>
        )}
      </div>
    </dialog>
  );
}
