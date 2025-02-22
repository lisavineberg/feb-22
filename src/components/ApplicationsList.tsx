import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DEFAULT_HEADERS } from '../consts';
import { Application } from '../types';
import { handleOpenDialog } from '../utils';
import { EditApplication } from './EditApplication';

export function ApplicationsList() {
  const { t } = useTranslation();
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('https://nesto-fe-exam.vercel.app/api/applications', {
      headers: DEFAULT_HEADERS,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setApplications(data);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  // const isApplicationValid = (applicant: Applicant) => {
  //   return (
  //     applicant.firstName.length > 0 &&
  //     applicant.lastName.length > 0 &&
  //     applicant.email.length > 0 &&
  //     applicant.phone.length > 0
  //   );
  // };

  console.log('applications', applications);
  return (
    <div>
      {applications.length > 0 ? (
        <div>
          {applications.map((application: Application) => (
            <div key={application.id}>
              <p>
                {t('application')} {application.id}
              </p>
              <p>
                {t('product_id')}: {application.productId}
              </p>
              <p>application name? {application.applicants[0].firstName} </p>
              <button onClick={() => handleOpenDialog('edit-application')}>
                edit
              </button>
              <EditApplication application={application} />
            </div>
          ))}
        </div>
      ) : error ? (
        <p>{t('error')}</p>
      ) : (
        <p>{t('no_applications_found')}</p>
      )}
    </div>
  );
}
