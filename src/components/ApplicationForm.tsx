import { DEFAULT_HEADERS } from '../consts';
import { Application } from '../types';

export function ApplicationForm({ application }: { application: Application }) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

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
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch(() => {
        console.log('error');
      });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-sm">
      <label className="flex gap-sm">
        First name:
        <input
          type="text"
          name="firstName"
          defaultValue={application.applicants[0].firstName ?? undefined}
        />
      </label>
      <label className="flex gap-sm">
        Last name:
        <input
          type="text"
          name="lastName"
          defaultValue={application.applicants[0].lastName ?? undefined}
        />
      </label>
      <label className="flex gap-sm">
        Email:
        <input
          type="email"
          name="email"
          defaultValue={application.applicants[0].email ?? undefined}
        />
      </label>
      <label className="flex gap-sm">
        Phone:
        <input
          type="tel"
          name="phone"
          defaultValue={application.applicants[0].phone ?? undefined}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
