import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { DEFAULT_HEADERS } from '../consts';
import { Application } from '../types';
import { closeDialog } from '../utils';
import { ApplicationsContext } from './ApplicationsList';

export function ApplicationForm({ application }: { application: Application }) {
  const { t } = useTranslation();
  const context = useContext(ApplicationsContext);

  if (!context) {
    throw new Error(
      'ApplicationForm must be used within an ApplicationsProvider',
    );
  }

  const { applications, setApplications } = context;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const body = { ...application, applicants: [data] };

    fetch(
      `https://nesto-fe-exam.vercel.app/api/applications/${application.id}`,
      {
        method: 'PUT',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(body),
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        const currentApplicationIndex = applications.findIndex(
          (app: Application) => app.id === application.id,
        );
        const updatedApplications = [...applications];
        updatedApplications[currentApplicationIndex] = data;
        setApplications(updatedApplications);

        closeDialog(`edit-application--${application.id}`);
      })
      .catch(() => {
        console.log('error');
      });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-sm">
      <label className="flex gap-sm">
        {t('first_name')}:
        <input
          type="text"
          name="firstName"
          defaultValue={application.applicants[0].firstName ?? undefined}
        />
      </label>
      <label className="flex gap-sm">
        {t('last_name')}:
        <input
          type="text"
          name="lastName"
          defaultValue={application.applicants[0].lastName ?? undefined}
        />
      </label>
      <label className="flex gap-sm">
        {t('email')}:
        <input
          type="email"
          name="email"
          defaultValue={application.applicants[0].email ?? undefined}
        />
      </label>
      <label className="flex gap-sm">
        {t('phone')}:
        <input
          type="tel"
          name="phone"
          defaultValue={application.applicants[0].phone ?? undefined}
        />
      </label>
      <button type="submit">{t('submit')}</button>
    </form>
  );
}
