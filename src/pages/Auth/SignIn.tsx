import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import { useAuthStore } from "../../store/auth";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../api/auth";
import { useState } from "react";

type FormData = {
  userName: string;
  password: string;
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f7f7f7;
`;

const Card = styled.div`
  background: white;
  padding: 32px;
  border-radius: 16px;
  width: 32rem;
  margin: 0 2rem;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 18px;
`;

const Input = styled.input`
  border-radius: 50px;
  padding: 16px;
  border: 1px solid #eee;
  background: rgba(0, 0, 0, 0.02);
  width: 100%;
  margin-bottom: 16px;
  font-size: 12px;
`;

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  border-radius: 20px;
  padding: 10px 32px;
  cursor: pointer;
  font-size: 14px;
  border: none;

  ${({ variant }) =>
    variant === "secondary"
      ? `
        background: white;
        border: 1px solid black;
        color: black;
      `
      : `
        background: black;
        color: white;
      `}
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`;

export default function SignIn() {
  const { register, handleSubmit } = useForm<FormData>();
  const { setUser } = useAuthStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const res = await login(data.userName, data.password);
      setUser({
        id: "1",
        name: data.userName,
        token: res.access_token,
      });
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed! Please check username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <Title>{t("auth.signin")}</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("userName", { required: true })}
            placeholder={t("auth.username")}
          />
          <Input
            type="password"
            {...register("password", { required: true })}
            placeholder={t("auth.password")}
          />
          <Actions>
            <Link to="/signup">
              <Button variant="secondary">{t("auth.signup")}</Button>
            </Link>
            <Button type="submit" disabled={loading}>
              {loading ? "..." : "→"}
            </Button>
          </Actions>
        </form>
      </Card>
    </Container>
  );
}
