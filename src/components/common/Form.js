import { Box } from "@mui/material";
import { ControlContext } from "context";
import useForm from "hooks/useForm";

function Form({ onSubmit, control, children }) {
  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
      <ControlContext.Provider value={control}>
        {children}
      </ControlContext.Provider>
    </Box>
  );
}

export function BasicForm({ schema, defaultValues, onSubmit, children }) {
  const { control, handleSubmit } = useForm(schema, defaultValues);
  return (
    <Form control={control} onSubmit={handleSubmit(onSubmit)}>
      {children}
    </Form>
  );
}

export default Form;
