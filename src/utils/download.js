const anchor = document.createElement("a");
document.body.appendChild(anchor);

export function onDownload(blob, filename = "download.pdf") {
  if (blob) {
    const url = URL.createObjectURL(blob);
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
  }
}
