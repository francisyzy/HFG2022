import { useState } from "react";
import nc from "next-connect";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";

import { Collections } from "@/constants/collections";
import { firestoreAdmin } from "@/lib/firebaseAdmin";
import { withAuth } from "@/middleware/withAuth";
import { IUser } from "@/types/user";
import { fixFirebaseDate } from "@/utils/fix-firebase-date";
import useAuth from "@/store/useAuth";
import { editProfileSchema } from "@/schemas/profile/edit";

import { BackButton, Button, PageTitle } from "@/components/ui";
import {
  FormEnd,
  FormErrorBlock,
  FormField,
  FormWrapper,
} from "@/components/form";

interface ProfileEditProps {
  user: IUser;
}

export default function ProfileEdit({ user }: ProfileEditProps) {
  const { update } = useAuth();
  const { register, errors, handleSubmit, watch } = useForm({
    mode: "onBlur",
    resolver: yupResolver(editProfileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    } as any,
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(undefined);

    try {
      await update(data);
      router.push("/profile");
      location.reload();
    } catch (e) {
      console.log("Error in editing profile");
      setError(e);
    }
    setLoading(false);
  };

  return (
    <>
      <BackButton href="/profile">Profile</BackButton>
      <PageTitle className="mt-xs">Edit Profile</PageTitle>

      <FormWrapper className="mt-base" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="email"
          type="email"
          label="Email"
          errors={errors}
          ref={register}
        ></FormField>

        <FormField
          name="name"
          type="text"
          label="Name"
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

  return {
    props: {
      user: fixFirebaseDate(user.data()),
    },
  };
}
