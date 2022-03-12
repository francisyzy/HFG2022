import { useRouter } from "next/router";
import nc from "next-connect";
import { FaPencilAlt } from "react-icons/fa";

import { firestoreAdmin } from "@/lib/firebaseAdmin";
import useAuth from "@/store/useAuth";
import { Collections } from "@/constants/collections";
import { withAuth } from "@/middleware/withAuth";
import { fixFirebaseDate } from "@/utils/fix-firebase-date";
import { ILocation } from "@/types/location";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { PageTitle } from "@/components/ui";

interface LocationProps {
  location: ILocation;
}

export default function Main({ location }: LocationProps) {
  const router = useRouter();
  const { signout } = useAuth();

  const logout = () => {
    signout();
    router.push("/login");
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle>Welcome to raiSEs Membership app</PageTitle>
      </div>

      <div className="flex align-items center">
        <h3>View locations near YOU:</h3>
      </div>

      <div>
        <Card sx={{ maxWidth: 250 }}>
        <CardMedia
          component="img"
          height="300"
          image="https://www.raise.sg/images/directories/logo/1646467250_Vertical%20Logo%20+%20blue%20bg.png"
          alt="21 EXTRA GOODNESS"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {"21 EXTRA GOODNESS"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Distance: {"1.2KM"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Address: {"Unknown address"}
          </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">View details</Button>
          </CardActions>
        </Card>
        <br/>
        <Card sx={{ maxWidth: 250 }}>
        <CardMedia
          component="img"
          height="300"
          image="https://www.raise.sg/images/directories/logo/1646467250_Vertical%20Logo%20+%20blue%20bg.png"
          alt="21 EXTRA GOODNESS"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {"KIMCHI XPRESS"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Distance: {"3.0KM"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Address: {"Unknown address"}
          </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">View details</Button>
          </CardActions>
        </Card>
      </div>
    </>
  );
}

// export async function getServerSideProps({ req, res }) {
//   const handler = nc().use(withAuth());

//   try {
//     await handler.run(req, res);
//   } catch (e) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   const user = await firestoreAdmin
//     .collection(Collections.USERS)
//     .doc(req.user.uid)
//     .get();

//   return {
//     props: {
//       user: fixFirebaseDate(user.data()),
//     },
//   };
// }
