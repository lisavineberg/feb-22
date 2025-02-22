import { useTranslation } from 'react-i18next';
import { Applicant, Application } from '../types';
import { handleOpenDialog } from '../utils';
import { EditApplication } from './EditApplication';

export function ApplicationTile({ application }: { application: Application }) {
  const { t } = useTranslation();

  const isApplicationValid = (applicant: Applicant) => {
    return (
      applicant.firstName.length > 0 &&
      applicant.lastName.length > 0 &&
      applicant.email.length > 0 &&
      applicant.phone.length > 0
    );
  };

  return (
    <li className="application" key={application.id}>
      <p>
        {t('application')}: {application.id}
      </p>
      <p>
        {t('product_id')}: {application.productId}
      </p>
      {isApplicationValid(application.applicants[0]) ? (
        <>
          <p>
            {t('primary_applicant')}: {application.applicants[0].firstName}{' '}
            {application.applicants[0].lastName}
          </p>
          <button
            onClick={() =>
              handleOpenDialog(`edit-application--${application.id}`)
            }>
            {t('edit')}
          </button>
        </>
      ) : (
        <>
          <p className="tag tag--red">{t('application_incomplete')}</p>
          <button
            onClick={() =>
              handleOpenDialog(`edit-application--${application.id}`)
            }>
            {t('edit')}
          </button>
        </>
      )}
      <EditApplication application={application} />
    </li>
  );
}
