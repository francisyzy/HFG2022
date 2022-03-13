import { Grid } from '@material-ui/core';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


import { useState } from "react";
import nc from "next-connect";
import { useRouter } from "next/router";

import { withAuth } from "@/middleware/withAuth";
import useAuth from "@/store/useAuth";

import { firestoreAdmin } from "@/lib/firebaseAdmin";
import { Collections } from "@/constants/collections";
import { fixFirebaseDate } from "@/utils/fix-firebase-date";
import { IUser } from "@/types/user";

interface ProfileProps {
  user: IUser;
}

import {
  FormWrapper,
  FormField,
  FormEnd,
  FormErrorBlock,
  FormDebug,
} from "@/components/form";
import { ButtonGroup, PageTitle, Button, SmartLink, Loading } from "@/components/ui";

export default function Profile({ user }: ProfileProps) {
  const router = useRouter();
  const { signout } = useAuth();

  const { addVoucher5 } = useAuth();
  const { addVoucher10 } = useAuth();
  const { addVoucher20 } = useAuth();

  const logout = () => {
    signout();
    router.push("/login");
  };

  const merchantPage = () => {
    router.push("/login");
  };

  const add10 = async (data) => {
    setLoading(true);
    setError(undefined);
    const submitData = {
      name: user.name,
      email: user.email,
      voucher10: user.voucher10 ? user.voucher10 + 1 : 1,
    };

    try {
      if(user.points < 10) {
        router.push("/noPoints");
      } else {
        addVoucher10(submitData);
        router.push("/voucherAdded");
      }
    } catch (e) {
      console.log("Error in redeeming voucher");
      setError(e);
    }
    setLoading(false);
  };
  const add20 = async (data) => {
    setLoading(true);
    setError(undefined);
    const submitData = {
      name: user.name,
      email: user.email,
      voucher20: user.voucher20 ? user.voucher20 + 1 : 1,
    };

    try {
      if(user.points < 20) {
        router.push("/noPoints");
      } else {
        addVoucher20(submitData);
        router.push("/voucherAdded");
      }
    } catch (e) {
      console.log("Error in redeeming voucher");
      setError(e);
    }
    setLoading(false);
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const add5 = async (data) => {
    setLoading(true);
    setError(undefined);
    const submitData = {
      name: user.name,
      email: user.email,
      points: user.points - 5,
      voucher5: user.voucher5 ? user.voucher5 + 1 : 1,
    };
    
    try {
      if(user.points < 5) {
        router.push("/noPoints");
      } else {
        addVoucher5(submitData);
        router.push("/voucherAdded");
      }
    } catch (e) {
      console.log("Error in redeeming voucher");
      setError(e);
    }
    setLoading(false);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: 'black',
    fontWeight: 'BOLD'
  }));
  const Item2 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(5),
    textAlign: 'center',
    color: 'black'
  }));

  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle className="mb-base">Vouchers</PageTitle>
        <div className="flex bg-gray-700 py-xs px-sm rounded text-gray-100 font-mono">
          <h1>Current Points : </h1>{user.points}
        </div>
      </div>

      <div>
        <h1>Redeem more vouchers here:</h1>

        <Grid container spacing={2}>
          <Grid item xs>
            <Item>$5 Voucher ( 5 reward points )<Button className="container" onClick={add5}><Item2>Click here to redeem</Item2></Button></Item>
          </Grid>
          <Grid item xs>
            <Item>$10 Voucher ( 10 reward points )<Button className="container" onClick={add10}><Item2>Click here to redeem</Item2></Button></Item>
          </Grid>
          <Grid item xs>
            <Item>$20 Voucher ( 20 reward points )<Button className="container" onClick={add20}><Item2>Click here to redeem</Item2></Button></Item>
          </Grid>
        </Grid>
      </div>

      <div>
        <h1>My Vouchers</h1>
        <Grid container spacing={2}>
          <Grid item xs>
            <Item>$5 Voucher
              <Button className="container" onClick={merchantPage}>
                  <Item2>Click here to use voucher</Item2>
                  <div className="flex bg-gray-700 py-xs px-sm rounded text-gray-100 font-mono">
                    <h1>You have : </h1>{user.voucher5}
                  </div>
              </Button>
            </Item>
          </Grid>
          <Grid item xs>
            <Item>$10 Voucher<Button className="container" onClick={merchantPage}><Item2>Click here to use voucher</Item2><div className="flex bg-gray-700 py-xs px-sm rounded text-gray-100 font-mono">
                    <h1>You have : </h1>{user.voucher10 ? user.voucher10 : 0}
                  </div></Button></Item>
          </Grid>
          <Grid item xs>
            <Item>$20 Voucher<Button className="container" onClick={merchantPage}><Item2>Click here to use voucher</Item2><div className="flex bg-gray-700 py-xs px-sm rounded text-gray-100 font-mono">
                    <h1>You have : </h1>{user.voucher20 ? user.voucher20 : 0}
                  </div></Button></Item>
          </Grid>
        </Grid>
      </div>

      <ButtonGroup className="mt-base">
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
