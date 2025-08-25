import { useAuthStore } from "../store/auth";
import { useTranslation } from "react-i18next";
import Layout from "../components/layout/Layout";
import styled from "@emotion/styled";

const WelcomeBox = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  font-size: 14px;
  gap: 1rem;
  display: flex;
  flex-direction: column;
`;

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const { t } = useTranslation();

  return (
    <Layout>
      <WelcomeBox>
        <h2>{t("dashboard.welcome", { name: user?.name })}</h2>
        <p>
          {t("dashboard.des1")} <br /> {t("dashboard.des2")}
        </p>
      </WelcomeBox>
    </Layout>
  );
}
