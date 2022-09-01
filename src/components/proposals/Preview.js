import { useParams } from "react-router-dom";

import PdfViewer from "components/PdfViewer";

import { useGetVersionQuery } from "api/data/version";
import LoadingCircle from "components/common/LoadingCircle";
import useFile from "hooks/useFile";

export default function Preview() {
  const { pid, vid, did, doc } = useParams();

  const {
    data = {},
    error,
    isLoading: isVersionLoading,
  } = useGetVersionQuery({ pid, vid }, { skip: !!doc });

  const document = data.documents?.find((d) => d.id === parseInt(did));

  const { link, isLoading: isFileLoading } = useFile(document?.file || doc);

  if (error) {
    return "invalid proposal id: " + pid + " or version id: " + vid;
  }

  if (!document && !doc) {
    return "invalid document id: " + did;
  }

  const isLoading = isVersionLoading || isFileLoading;

  return (
    <>
      <LoadingCircle isLoading={isLoading} />
      {link && <PdfViewer link={link} />}
    </>
  );
}
