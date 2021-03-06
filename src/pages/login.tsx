import { useState } from "react";
import nc from "next-connect";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { withAuth } from "@/middleware/withAuth";
import useAuth from "@/store/useAuth";
import { fillForm } from "@/utils/form-debug";
import { loginSchema } from "@/schemas/auth/login";

import {
  FormWrapper,
  FormField,
  FormEnd,
  FormErrorBlock,
  FormDebug,
} from "@/components/form";
import { PageTitle, Button, SmartLink, Loading } from "@/components/ui";

export default function Auth({}) {
  const router = useRouter();
  const { isAuthed, signinWithEmail } = useAuth();
  const { register, errors, handleSubmit, watch, setValue } = useForm({
    mode: "onBlur",
    resolver: yupResolver(loginSchema),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async ({ email, password }) => {
    setLoading(true);
    setError(undefined);
    try {
      await signinWithEmail(email, password);
      router.push("/profile");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const fillFormMerchant = () => {
    fillForm(setValue, {
      email: "pos@singheng.com.sg",
      password: "password",
    });
  };
  const fillFormUser = () => {
    fillForm(setValue, {
      email: "customer@francisyzy.com",
      password: "password",
    });
  };

  return (
    <>
      <PageTitle className="mb-base">Login to your account</PageTitle>

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

            {error && <FormErrorBlock error={error}></FormErrorBlock>}

            <FormEnd>
              <Button href="/signup">Sign up</Button>
              <Button primary submit loading={loading}>
                Login
              </Button>
            </FormEnd>

            <FormDebug
              data={{ ...watch() }}
              actions={[
                { function: fillFormMerchant, text: "Merchant" },
                { function: fillFormUser, text: "User" },
              ]}
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
