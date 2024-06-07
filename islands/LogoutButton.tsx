import { FunctionComponent } from "preact";
export const LogoutButton: FunctionComponent = () => {
  const Logout = () => {
    document.cookie = "auth= ; path=/";
    window.location.href = "/login";
  };

  return <button onClick={Logout} class="logout-button">Logout</button>;
};
