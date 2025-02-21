import { useTranslation } from 'react-i18next';
import { Product } from '../types';
import { closeDialog } from '../utils';
import { ApplicationForm } from './ApplicationForm';
import { CloseIcon } from './CloseIcon';

export function CreateApplication({
  selectedMortgage,
}: {
  selectedMortgage: Product | null;
}) {
  const { t } = useTranslation();
  console.log('selectedMortgage', selectedMortgage);

  return (
    <dialog id="create-application">
      <button
        className="dialog-close"
        onClick={() => closeDialog('create-application')}
        aria-label={t('close')}>
        <CloseIcon />
      </button>
      <div className="dialog-content">
        {selectedMortgage ? (
          <>
            <h2 className="h3">
              {t('your_application_for')}: {selectedMortgage.name}
            </h2>
            <ApplicationForm />
          </>
        ) : (
          <h2>{t('error')}</h2>
        )}
      </div>
    </dialog>
  );
}
