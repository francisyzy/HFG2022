import { useRouter } from "next/router";

import { firestoreAdmin } from "@/lib/firebaseAdmin";
import useAuth from "@/store/useAuth";
import { Collections } from "@/constants/collections";
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

  let index = 0;
  for (let i = 0; i < 9999; i++) {
    if (typeof location[i] === "undefined") {
      index = i;
      break;
    } 
  }


  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle>View locations near you:</PageTitle>
      </div>

        {[...Array(index)].map((x, i) => {
          return (
          <div key={i}>
          <Card sx={{ maxWidth: 350 }}>
            <CardMedia
              component="img"
              height="300"
              image={"../../favicon/" + i + ".png"}
              alt={location[i].name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {location[i].name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Category: {location[i].type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Distance: {location[i].distance + " km"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Address: {location[i].address}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Description: {location[i].shortDescription}
              </Typography>
              </CardContent>
            <CardActions>
              <Button size="small" href={location[i].externalURL} target="_blank">View more details</Button>
            </CardActions>
          </Card>
          <br/>
          </div>
        )})}
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  let locations = []
  const location = await firestoreAdmin
    .collection(Collections.LOCATIONS)
    .get();

  location.forEach(async (doc) => {
    locations.push({
      ...doc.data()
    })
  })

  return {
    props: {
      location: locations,
    },
  };
}
