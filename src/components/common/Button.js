import BaseButton from "@mui/material/Button";

const Button = (props) => {
   return (
      <BaseButton
         {...props}
         sx={{
            fontFamily: "monospace",
            fontWeight: 700,
            "&:hover": {
               boxShadow: 10,
               transitionDuration: "0.4s",
            },
            ...props.sx,
         }}
      >
         {props.children}
      </BaseButton>
   );
};

export default Button;
