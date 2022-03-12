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

interface AddPointsProps {
  email: String;
  customerEmail: String;
  amountSpent: number;
}

export default function AddPoints({
  email,
  customerEmail,
  amountSpent,
}: AddPointsProps) {
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

  const fillFormPoints = () => {
    fillForm(setValue, {
      customerEmail: "spam@francisyzy.com",
      amountSpent: 123.1,
    });
  };

  return (
    <>
      <PageTitle className="mt-xs">Add Points</PageTitle>

      <FormWrapper className="mt-base" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="customerEmail"
          type="email"
          label="Customer Email"
          errors={errors}
          ref={register}
        ></FormField>

        <FormField
          name="amountSpent"
          type="number"
          label="Amount of money spent"
          errors={errors}
          ref={register}
        ></FormField>

        {error?.messages && (
          <FormErrorBlock errors={error.messages}></FormErrorBlock>
        )}
        {error && !error?.messages && (
          <FormErrorBlock error={JSON.stringify(error)}></FormErrorBlock>
        )}

        <FormEnd>
          <Button primary submit loading={loading}>
            Submit
          </Button>
        </FormEnd>

        <FormDebug
          data={{ ...watch() }}
          actions={[{ function: fillFormPoints, text: "points" }]}
        ></FormDebug>
      </FormWrapper>
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

  //If user is not merchant, send away
  if (!user.data().merchant) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      user: fixFirebaseDate(user.data()),
    },
  };
}
