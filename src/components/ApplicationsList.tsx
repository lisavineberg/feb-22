import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DEFAULT_HEADERS } from '../consts';

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

  return (
    <div>
      {applications.length > 0 ? (
        <p>has applications</p>
      ) : error ? (
        <p>{t('error')}</p>
      ) : (
        <p>{t('no_applications_found')}</p>
      )}
    </div>
  );
}
