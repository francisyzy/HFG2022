import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import firebaseAdmin, {
  authAdmin,
  firestoreAdmin,
} from "@/lib/firebaseAdmin";
import { Collections } from "@/constants/collections";
import { formatUser } from "@/store/useAuth";
import { withAuth } from "@/middleware/withAuth";

/* 
This is called after a user successfully logs in with the Firebase SDK. It sets
default fields (if the user logged in for the first time) or sends the user
object from Firestore
*/

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(withAuth())
  .get(async (req, res) => {
    let user = {
      ...formatUser(await authAdmin.getUser(req["user"].uid)),
      lastLogIn: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
    };

    /* Check if user has a document */
    const existingUser = await firestoreAdmin
      .collection(Collections.USERS)
      .doc(user.uid)
      .get();

    if (!existingUser.exists) {
      /* New user, set initial fields */
      console.log("User logging in for the first time");

      const newUser = { ...user, points: 10, merchant: false };
      console.log(newUser);
      console.log(req["body"]);

      await firestoreAdmin
        .collection(Collections.USERS)
        .doc(user.uid)
        // Points is an initial field
        .set({ ...newUser }, { merge: true });

      return res.json(newUser);
    }

    /* Existing user */
    await firestoreAdmin
      .collection(Collections.USERS)
      .doc(user.uid)
      .set(user, { merge: true });
    return res.status(200).json(user);
  });

export default handler;
