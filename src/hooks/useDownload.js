import { useLazyGetFileQuery } from "api/data/file";

const anchor = document.createElement("a");
document.body.appendChild(anchor);

function onDownload(blob, filename = "download.pdf") {
  if (blob) {
    const url = URL.createObjectURL(blob);
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
  } else {
    alert("No file to download");
  }
}

function useDownload(filename, name = filename) {
  const [getFile, { isLoading }] = useLazyGetFileQuery();

  const download = () =>
    getFile(filename, true)
      .unwrap()
      .then((blob) => onDownload(blob, name))
      .catch(({ data }) => alert(data?.message || "Could not download file"));

  return { download, isLoading };
}

export default useDownload;
