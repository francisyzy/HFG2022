import { useRouter } from "next/router";
import nc from "next-connect";
import { FaPencilAlt } from "react-icons/fa";

import { firestoreAdmin } from "@/lib/firebaseAdmin";
import useAuth from "@/store/useAuth";
import { Collections } from "@/constants/collections";
import { withAuth } from "@/middleware/withAuth";
import { fixFirebaseDate } from "@/utils/fix-firebase-date";
import { IUser } from "@/types/user";

import { Button, ButtonGroup, PageTitle } from "@/components/ui";

interface ProfileProps {
  user: IUser;
}

export default function Profile({ user }: ProfileProps) {
  const router = useRouter();
  const { signout } = useAuth();

  const logout = () => {
    signout();
    router.push("/login");
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle>
          {user.name ? (
            user.name
          ) : (
            <span className="italic text-gray-500">No name set</span>
          )}
        </PageTitle>

        <div className="bg-gray-700 py-xs px-sm rounded text-gray-100 font-mono">
          {user.points}
        </div>
      </div>

      <ButtonGroup className="mt-base">
        <Button href="/profile/edit" icon={<FaPencilAlt></FaPencilAlt>}>
          Edit Profile
        </Button>
        <Button href="/pointHistory">Point history</Button>
        {user.merchant ? (
          <Button href="/addPoints">Add Points</Button>
        ) : (
          <></>
        )}
        <Button danger onClick={logout}>
          Logout
        </Button>
      </ButtonGroup>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const handler = nc().use(withAuth());

  try {
    await handler.run(req, res);
  } catch (e) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const user = await firestoreAdmin
    .collection(Collections.USERS)
    .doc(req.user.uid)
    .get();

  return {
    props: {
      user: fixFirebaseDate(user.data()),
    },
  };
}
