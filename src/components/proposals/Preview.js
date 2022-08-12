import { useParams } from "react-router-dom";

import PdfViewer from "components/PdfViewer";

import { useGetVersionQuery } from "api/data/version";
import LoadingCircle from "components/common/LoadingCircle";
import { useGetFileQuery } from "api/data/file";
import { useEffect, useState } from "react";

export default function Preview() {
  const [link, setLink] = useState("");
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

  useEffect(() => {
    if (blob && !link) {
      setLink(URL.createObjectURL(blob));
    }
    return () => {
      if (link) {
        URL.revokeObjectURL(link);
      }
    };
  }, [blob, link]);

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
      <PdfViewer link={link} />
    </>
  );
}
