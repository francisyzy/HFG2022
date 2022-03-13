import { useState } from "react";
import nc from "next-connect";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";

import { Collections } from "@/constants/collections";
import { firestoreAdmin } from "@/lib/firebaseAdmin";
import { withAuth } from "@/middleware/withAuth";
import { fixFirebaseDate } from "@/utils/fix-firebase-date";
import useAuth from "@/store/useAuth";
import { IUser } from "@/types/user";
import { ITransaction } from "@/types/transaction";

import { BackButton, Button, PageTitle } from "@/components/ui";
import {
  FormEnd,
  FormErrorBlock,
  FormField,
  FormWrapper,
  FormDebug,
} from "@/components/form";
import { addPointsSchema } from "@/schemas/points/add";
import { fetcher } from "@/utils/fetcher";
import { fillForm } from "@/utils/form-debug";
import { formatISO9075, parseISO } from "date-fns";

interface PointsHistoryProp {
  transactions: ITransaction[];
  user: IUser;
}

export default function ListPoints({
  transactions,
  user,
}: PointsHistoryProp) {
  const { register, errors, handleSubmit, watch, setValue } = useForm({
    mode: "onBlur",
    resolver: yupResolver(addPointsSchema),
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(undefined);

    const submitData = {
      ...data,
    };
    console.log(data);

    try {
      const [res, error] = await fetcher.post("/points", submitData);
      console.log(error);
      console.log(res);
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      router.push("/");
    } catch (e) {
      console.log("Error in adding points");
      setError(e);
    }
    setLoading(false);
  };

  return (
    <>
      <PageTitle className="mt-xs">
        Point {user.merchant ? "distribution" : "receive"} history
      </PageTitle>
      <table>
        <tr>
          <td>DateTime</td>
          <td>{user.merchant ? "Points given" : "Points received"}</td>
          <td>{user.merchant ? "Customer" : "Merchant"}</td>
        </tr>
        {transactions.map((field, index) => {
          return (
            <tr>
              <td>{field.createdAt.toString()}</td>
              <td>{field.pointsAdded}</td>
              <td>
                {user.merchant ? field.userName : field.merchantName}
              </td>
            </tr>
          );
        })}
      </table>
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

  //If user is merchant, retrieve merchant transactions
  if (user.data().merchant) {
    const transactionsSnap = await firestoreAdmin
      .collection(Collections.TRANSACTIONS)
      .where("merchantUID", "==", user.data().uid)
      // .orderBy("createdAt")
      .get();
    let transactions = [];
    transactionsSnap.forEach(async (doc) => {
      // const userName = (
      //   await firestoreAdmin
      //     .collection(Collections.USERS)
      //     .doc(doc.data().userUID)
      //     .get()
      // ).data().name;
      transactions.push({
        ...fixFirebaseDate(doc.data()),
        createdAt: formatISO9075(
          parseISO(fixFirebaseDate(doc.data()).createdAt),
        ),
        // name: userName,
      });
    });
    return {
      props: {
        transactions: transactions,
        user: fixFirebaseDate(user.data()),
      },
    };
  } else {
    const transactionsSnap = await firestoreAdmin
      .collection(Collections.TRANSACTIONS)
      .where("userUID", "==", user.data().uid)
      .orderBy("createdAt")
      .get();
    let transactions = [];
    transactionsSnap.forEach(async (doc) => {
      // const merchantName = (
      //   await firestoreAdmin
      //     .collection(Collections.USERS)
      //     .doc(doc.data().merchantUID)
      //     .get()
      // ).data().name;
      transactions.push({
        ...fixFirebaseDate(doc.data()),
        createdAt: formatISO9075(
          parseISO(fixFirebaseDate(doc.data()).createdAt),
        ),
        // name: merchantName,
      });
    });
    return {
      props: {
        transactions: transactions,
        user: fixFirebaseDate(user.data()),
      },
    };
  }
}
