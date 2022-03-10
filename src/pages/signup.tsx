import { useState } from "react";
import nc from "next-connect";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { withAuth } from "@/middleware/withAuth";
import useAuth from "@/store/useAuth";
import { fillForm } from "@/utils/form-debug";
import { signupSchema } from "@/schemas/auth/signup";

import {
  FormWrapper,
  FormField,
  FormEnd,
  FormErrorBlock,
  FormDebug,
} from "@/components/form";
import { PageTitle, Button, SmartLink, Loading } from "@/components/ui";

export default function Auth() {
  const router = useRouter();
  const { isAuthed, signUp } = useAuth();
  const { register, errors, handleSubmit, watch, setValue } = useForm({
    mode: "onBlur",
    resolver: yupResolver(signupSchema),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async ({ email, password, confirmPassword }) => {
    setLoading(true);
    setError(undefined);

    try {
      await signUp(email, password);
      router.push("/profile");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const fillFormUser = () => {
    fillForm(setValue, {
      email: "please@work.com",
      name: "Please Work",
      password: "password",
      confirmPassword: "password",
    });
  };

  return (
    <>
      <PageTitle className="mb-base">Create an account</PageTitle>

      {isAuthed ? (
        <>
          <div className="mb-base">
            You have been signed in. Please click{" "}
            <SmartLink underline href="/">
              here
            </SmartLink>{" "}
            if you are not redirected within 3 seconds.
          </div>

          <Loading sizes={[3, 2, 4, 3]}></Loading>
        </>
      ) : (
        <>
          <FormWrapper onSubmit={handleSubmit(onSubmit)}>
            <FormField
              name="email"
              type="email"
              label="Email"
              errors={errors}
              ref={register}
            ></FormField>

            <FormField
              name="password"
              type="password"
              label="Password"
              errors={errors}
              ref={register}
            ></FormField>

            <FormField
              name="passwordConfirmation"
              type="password"
              label="Confirm Password"
              errors={errors}
              ref={register}
            ></FormField>

            {error && <FormErrorBlock error={error}></FormErrorBlock>}

            <FormEnd>
              <Button primary submit loading={loading}>
                Sign up
              </Button>
            </FormEnd>

            <FormDebug
              data={{ ...watch() }}
              actions={[{ function: fillFormUser, text: "User" }]}
            ></FormDebug>
          </FormWrapper>
        </>
      )}
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const handler = nc().use(withAuth());
  try {
    await handler.run(req, res);
    // Redirect to index if logged in
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } catch (e) {}
  return { props: {} };
}
