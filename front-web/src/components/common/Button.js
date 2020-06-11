import React from "react";
import styled, { css } from "styled-components";
import oc from "open-color";

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0.5rem 2rem;
  margin: 5px;
  margin-top: 15px;
  color: white;
  outline: none;
  cursor: pointer;

  background: ${oc.gray[8]};
  &:hover {
    background: ${oc.gray[6]};
  }

  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${(props) =>
    oc.cyan &&
    css`
      background: ${oc.cyan[5]};
      &:hover {
        background: ${oc.cyan[4]};
      }
    `}
`;

const Button = (props) => <StyledButton {...props} />;

export default Button;
