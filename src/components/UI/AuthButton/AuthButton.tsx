import { logoutUser } from "@/services/actions/logoutUser";
import { getUserInfo, removeUser } from "@/services/auth.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../button";

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
        <Button variant="destructive" onClick={handleLogOut}>
          Logout
        </Button>
      ) : (
        <Link href="/login">
          <Button variant="outline" className="bg-green-300">
            Login
          </Button>
        </Link>
      )}
    </>
  );
};

export default AuthButton;
