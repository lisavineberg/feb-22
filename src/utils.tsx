export const closeDialog = (id: string) => {
  const dialogElement = document.getElementById(id) as HTMLDialogElement;
  if (dialogElement) {
    dialogElement.close();
  }
};

export const handleOpenDialog = (id: string) => {
  const dialog = document.getElementById(id) as HTMLDialogElement;
  if (dialog) {
    dialog.showModal();
  }
};
