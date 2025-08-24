import styled from "@emotion/styled";
import Sidebar from "./Sidebar";

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  padding: 32px;
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Sidebar />
      <Main>{children}</Main>
    </Container>
  );
}
