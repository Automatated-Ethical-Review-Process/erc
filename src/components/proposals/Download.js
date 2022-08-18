import { useGetVersionQuery } from "api/data/version";
import LoadingCircle from "components/common/LoadingCircle";
import useDownload from "hooks/useDownload";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Download() {
  const { pid, vid, did } = useParams();
  const navigate = useNavigate();

  const {
    data = {},
    error,
    isLoading: isVersionLoading,
  } = useGetVersionQuery({ pid, vid });

  const document = data.documents?.find((d) => d.id === parseInt(did));

  const { download, isLoading: isFileLoading } = useDownload(
    document?.file,
    document?.name
  );

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      return;
    }
    ref.current = true;

    download();
    navigate(-1, { replace: true });
  }, [download, navigate]);

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
