export const closeDialog = (id: string) => {
  const dialogElement = document.getElementById(id) as HTMLDialogElement;
  if (dialogElement) {
    dialogElement.close();
  }
};
