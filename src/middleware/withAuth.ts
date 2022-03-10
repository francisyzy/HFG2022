import { verifyIdToken } from "@/lib/firebaseAdmin";
import nookies from "nookies";

export const withAuth = () => async (req, res, next) => {
  try {
    const cookies = nookies.get({ req });
    const user = await verifyIdToken(cookies.token);
    req.user = user;
    next();
  } catch (error) {
    next(Error("User not logged in"));
  }
};
