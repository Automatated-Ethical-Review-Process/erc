import { useGetFileQuery } from "api/data/file";
import { useGetVersionQuery } from "api/data/version";
import LoadingCircle from "components/common/LoadingCircle";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { onDownload } from "utils/download";

export default function Download() {
  const { pid, vid, did } = useParams();
  const navigate = useNavigate();

  const {
    data = {},
    error,
    isLoading: isVersionLoading,
  } = useGetVersionQuery({ pid, vid });

  const document = data.documents?.find((d) => d.id === parseInt(did));

  const { data: blob, isLoading: isFileLoading } = useGetFileQuery(
    document?.file,
    { skip: !document?.file }
  );

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      return;
    }
    ref.current = true;

    onDownload(blob, document.name);
    navigate(-1, { replace: true });
  }, [blob, document.name, navigate]);

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
