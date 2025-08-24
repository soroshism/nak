import { Global, css } from "@emotion/react";

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "Inter", sans-serif;
    background: linear-gradient(135deg, #f4f4f4 0%, #f6f6f6 100%);
    color: #333;
    line-height: 1.5;
  }

  button {
    font-family: inherit;
  }
`;

export default function GlobalStyles() {
  return <Global styles={globalStyles} />;
}
