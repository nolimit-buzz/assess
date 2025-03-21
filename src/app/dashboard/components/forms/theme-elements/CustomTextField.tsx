import React, { useState } from "react";
import { InputBase, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { Visibility, VisibilityOff } from "@mui/icons-material";


const StyledInputWrapper = styled("div")({
  position: "relative",
  width: "100%",
  borderRadius: "8px",
  border: "0.5px solid rgba(17, 17, 17, 0.12)",
  background: "#F3F4F7",
  padding: "12px",
  display: "flex",
  flexDirection: "column",
});

const StyledLabel = styled("label")({
  color: "rgba(17, 17, 17, 0.68)",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "100%", // 14px
  marginBottom: "4px",
});

const StyledInputContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  width: "100%",
  position: "relative",
});

const StyledInput = styled(InputBase)({
  width: "100%",
  fontSize: "16px",
  fontWeight: 400,
  background: "transparent",
  border: "none",
  outline: "none",
  paddingRight: "40px", // Space for icon
  "&::placeholder": {
    color: "rgba(17, 17, 17, 0.38)",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "100%", // 16px
  },
});

const IconWrapper = styled("div")({
  position: "absolute",
  right: "10px",
  cursor: "pointer",
});

export default function CustomInput({ label, placeholder, type, ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <StyledInputWrapper>
      <StyledLabel>{label}</StyledLabel>
      <StyledInputContainer>
        <StyledInput 
          placeholder={placeholder} 
          type={type === "password" && !showPassword ? "password" : "text"} 
          {...props} 
        />
        {type === "password" && (
          <IconWrapper onClick={handleTogglePassword}>
            <IconButton size="small">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </IconWrapper>
        )}
      </StyledInputContainer>
    </StyledInputWrapper>
  );
}
