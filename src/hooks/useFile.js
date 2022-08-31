import { useGetFileQuery } from "api/data/file";
import { useEffect, useState } from "react";

function useFile(filename, defaultValue = "") {
  const [link, setLink] = useState("");
  const { data: blob, isLoading } = useGetFileQuery(filename, {
    skip: !filename,
  });

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

  return { link: link || defaultValue, isLoading };
}

export default useFile;
