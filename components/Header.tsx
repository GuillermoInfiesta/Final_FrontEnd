import { FunctionComponent } from "preact";
import { LogoutButton } from "../islands/LogoutButton.tsx";
export const Header: FunctionComponent<{ name: string }> = (props) => {
  return (
    <header class="header-container">
      <div class="header-content">
        <span class="user-name">{props.name}</span>
        <LogoutButton />
      </div>
    </header>
  );
};
