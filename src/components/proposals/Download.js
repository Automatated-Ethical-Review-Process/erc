import { useGetFileQuery } from "api/data/file";
import { useGetVersionQuery } from "api/data/version";
import LoadingCircle from "components/common/LoadingCircle";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

export default function Download() {
  const { pid, vid, did } = useParams();

  const {
    data = {},
    error,
    isLoading: isVersionLoading,
  } = useGetVersionQuery({ pid, vid });

  const document = data.documents?.find((d) => d.id === parseInt(did));

  const { data: blob, isLoading: isFileLoading } = useGetFileQuery(
    document?.file
  );

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      return;
    }
    ref.current = true;
    if (blob) {
      const url = URL.createObjectURL(blob);
      anchor.href = url;
      anchor.download = document.name;
      anchor.click();
      URL.revokeObjectURL(url);
    }
  }, [blob, document.name]);

  if (error) {
    return "invalid proposal id: " + pid + " or version id: " + vid;
  }

  if (!document) {
    return "invalid document id: " + did;
  }

  const isLoading = isVersionLoading || isFileLoading;

  return (
    <>
      <LoadingCircle isLoading={isLoading} />
      {"Please wait, downloading in progress ... "}
    </>
  );
}

const anchor = document.createElement("a");
document.body.appendChild(anchor);
