import styled from "@emotion/styled";
import { useAuthStore } from "../../store/auth";
import { NavLink, useNavigate } from "react-router-dom";
import avatar from "../../assets/icons/profile.svg";
import attrIcon from "../../assets/icons/attributes.svg";
import productIcon from "../../assets/icons/products.svg";
import out from "../../assets/icons/out.svg";

const SidebarContainer = styled.div`
  width: 220px;
  height: 100vh;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  border-right: 1px solid #eee;
  border-radius: 0 30px 30px 0px;
`;

const Profile = styled.div`
  margin-top: 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
`;

const MenuItem = styled(NavLink)`
  text-decoration: none;
  color: #333;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 8px;

  &.active {
    background: #eaeaea;
    color: black;
    font-weight: 600;
  }

  &:hover {
    color: black;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  font-size: 14px;
`;

const Icon = styled.img`
  width: 18px;
  height: 18px;
`;

const Name = styled(NavLink)`
  color: #333;
  cursor: pointer;
  font-size: 16px;
  font-weight: 800;
  text-decoration: none;

  &.active {
    color: black;
  }
`;

export default function Sidebar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <SidebarContainer>
      <div>
        <Profile>
          <img
            src={avatar}
            alt="User Avatar"
            style={{ width: 60, height: 60, borderRadius: "50%" }}
          />
          <Name to="/dashboard">{user?.name}</Name>
        </Profile>

        <Menu>
          <MenuItem to="/attributes">
            <Icon src={attrIcon} alt="Attributes Icon" />
            Attributes
          </MenuItem>

          <MenuItem to="/products">
            <Icon src={productIcon} alt="Products Icon" />
            Products
          </MenuItem>
        </Menu>
      </div>

      <LogoutButton onClick={handleLogout}>
        <Icon src={out} alt="Logout" />
        Log Out
      </LogoutButton>
    </SidebarContainer>
  );
}
