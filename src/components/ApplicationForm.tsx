export function ApplicationForm() {
  return (
    <form className="flex flex-col gap-sm">
      <label className="flex gap-sm">
        First name:
        <input type="text" name="firstName" />
      </label>
      <label className="flex gap-sm">
        Last name:
        <input type="text" name="lastName" />
      </label>
      <label className="flex gap-sm">
        Email:
        <input type="email" name="email" />
      </label>
      <label className="flex gap-sm">
        Phone:
        <input type="tel" name="phone" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
