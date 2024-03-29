import { useForm as useBaseForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const useForm = (schema, defaultValues = schema.getDefault() || null) =>
  useBaseForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

export default useForm;
