import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { firestoreAdmin } from "@/lib/firebaseAdmin";
import { Collections } from "@/constants/collections";
import { withAuth } from "@/middleware/withAuth";

import { withValidate } from "@/middleware/withValidate";
import { addPointsSchema } from "@/schemas/points/add";

/* Create TRANSACTIONS */

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(withAuth())

  /* Create Transaction */
  .post(withValidate(addPointsSchema), async (req, res) => {
    // console.log(req.body);
    const additionalPoints = Math.ceil(
      Number(req.body["amountSpent"]) * 0.8,
    );

    try {
      // console.log(req.body["customerEmail"]);
      const usersRef = await firestoreAdmin
        .collection(Collections.USERS)
        .where("email", "==", req.body["customerEmail"])
        .get();
      if (usersRef.empty && usersRef.size !== 1) {
        console.log("User not found");
        return res.status(400).json({ message: "User not found" });
      }
      let userUID = "";
      usersRef.forEach((doc) => {
        userUID = doc.id;
      });
      if (userUID == req["user"].uid) {
        return res.status(400).json({
          message: "You are not allowed to give yourself points",
        });
      }
      const transactionRef = firestoreAdmin
        .collection(Collections.TRANSACTIONS)
        .doc();
      const user = firestoreAdmin
        .collection(Collections.USERS)
        .doc(userUID);

      await firestoreAdmin.runTransaction(async (t) => {
        const userData = (await user.get()).data();
        const newPoints = userData.points + additionalPoints;
        const userName = userData.name;
        const merchantName = (
          await firestoreAdmin
            .collection(Collections.USERS)
            .doc(req["user"].uid)
            .get()
        ).data().name;
        t.update(user, { points: newPoints });
        t.create(transactionRef, {
          amountSpent: Number(req.body["amountSpent"]),
          pointsAdded: additionalPoints,
          createdAt: new Date(),
          merchantUID: req["user"].uid,
          userUID: userUID,
          uid: transactionRef.id,
          userName: userName,
          merchantName: merchantName,
        });
      });

      const transaction = (await transactionRef.get()).data();
      // console.log(transaction);
      return res.status(200).json(transaction);
    } catch (e) {
      console.log(e);
      return res.status(400).json(e);
    }
  });

export default handler;
