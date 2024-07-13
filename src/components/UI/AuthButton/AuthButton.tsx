import { logoutUser } from "@/services/actions/logoutUser";
import { getUserInfo, removeUser } from "@/services/auth.service";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthButton = () => {
  const userInfo = getUserInfo();
  const router = useRouter();
  const handleLogOut = () => {
    logoutUser(router);
    router.refresh();
  };
  return (
    <>
      {userInfo?.id ? (
        <Button color="error" onClick={handleLogOut} sx={{ mx: 2 }}>
          Logout
        </Button>
      ) : (
        <Button component={Link} sx={{ mx: 2 }} href="/login">
          Login
        </Button>
      )}
    </>
  );
};

export default AuthButton;
