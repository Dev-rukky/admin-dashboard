import { Popover, Button } from "antd";
import CustomAvatar from "../custom-avatar";


const CurrentUser = () => {
  return (
    <>
      <Popover placement="bottomRight" trigger="click" overlayInnerStyle={{ padding: 0 }} overlayStyle={{ zIndex: 9999 }}>
        <CustomAvatar />
      </Popover>
    </>
  );
};

export default CurrentUser;
