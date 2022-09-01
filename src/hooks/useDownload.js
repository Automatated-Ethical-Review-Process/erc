import { useGetFileQuery } from "api/data/file";

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
  const { data: blob, isLoading } = useGetFileQuery(filename, {
    // FIXME: lazy download
    skip: !filename,
  });

  return { download: () => onDownload(blob, name), isLoading };
}

export default useDownload;
