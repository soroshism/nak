import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { registerUser } from "../../api/auth";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  confirmPassword: string;
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

export default function SignUp() {
  const { register, handleSubmit, watch } = useForm<FormData>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await registerUser(
        data.firstName,
        data.lastName,
        data.userName,
        data.password
      );
      alert("Registration successful! You can login now.");
      navigate("/signin");
    } catch (err) {
      alert("Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Title>{t("auth.signup")}</Title>
          <Input {...register("firstName")} placeholder={t("auth.name")} />
          <Input {...register("lastName")} placeholder={t("auth.lastname")} />
          <Input {...register("userName")} placeholder={t("auth.username")} />
          <Input
            type="password"
            {...register("password")}
            placeholder={t("auth.password")}
          />
          <Input
            type="password"
            {...register("confirmPassword")}
            placeholder={t("auth.confirmPassword")}
          />

          <Actions>
            <Link to="/signin">
              <Button variant="secondary">{t("auth.signin")}</Button>
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
