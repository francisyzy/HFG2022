import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { authAdmin, firestoreAdmin } from "@/lib/firebaseAdmin";
import { Collections } from "@/constants/collections";
import { withAuth } from "@/middleware/withAuth";
import { fixFirebaseDate } from "@/utils/fix-firebase-date";
import { editProfileSchema } from "@/schemas/profile/edit";
import { withValidate } from "@/middleware/withValidate";

/* 
Used to  update user
*/

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(withAuth())
  .post(withValidate(editProfileSchema), async (req, res) => {
    const data = req.body;
    const uid = req["user"].uid;

    try {
      await firestoreAdmin
        .collection(Collections.USERS)
        .doc(uid)
        .set(
          {
            ...data,
          },
          { merge: true }
        );

      // Set name / email if given
      authAdmin.updateUser(uid, {
        displayName: data.name,
        email: data.email,
      });

      const user = await firestoreAdmin
        .collection(Collections.USERS)
        .doc(uid)
        .get();

      return res.status(200).json(fixFirebaseDate(user.data()));
    } catch (e) {
      res.status(400).json(e);
    }
  });

export default handler;
