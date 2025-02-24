import { createContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DEFAULT_HEADERS } from '../consts';
import { ApplicationsSchema } from '../schemas';
import { Application } from '../types';
import { ApplicationTile } from './ApplicationTile';

interface ApplicationsContextType {
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
}

export const ApplicationsContext = createContext<
  ApplicationsContextType | undefined
>(undefined);

export function ApplicationsList() {
  const { t } = useTranslation();
  const [applications, setApplications] = useState<Application[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('https://nesto-fe-exam.vercel.app/api/applications', {
      headers: DEFAULT_HEADERS,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const result = ApplicationsSchema.safeParse(data);

        if (!result.success) {
          console.error(result.error);
          return;
        }
        setApplications(data);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  return (
    <ApplicationsContext.Provider value={{ applications, setApplications }}>
      {applications.length > 0 ? (
        <ul className="flex flex-col gap-md">
          {applications.map((application: Application) => (
            <ApplicationTile key={application.id} application={application} />
          ))}
        </ul>
      ) : error ? (
        <p>{t('error')}</p>
      ) : (
        <p>{t('no_applications_found')}</p>
      )}
    </ApplicationsContext.Provider>
  );
}
