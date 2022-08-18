function appendFiles(formData, key, files) {
  for (const file of files) {
    formData.append(key, file);
  }
}

function appendData(formData, key, value) {
  formData.append(key, JSON.stringify(value));
}

export function toFormData(data) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (
      value instanceof FileList ||
      (Array.isArray(value) && value.every((v) => v instanceof File))
    ) {
      appendFiles(formData, key, value);
    } else if (value) {
      appendData(formData, key, value);
    }
  });

  return formData;
}
