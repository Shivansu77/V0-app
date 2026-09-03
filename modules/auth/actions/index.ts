"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export const onBoardUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return null;
    }

    const email =
      user.emailAddresses.find(
        (address) => address.id === user.primaryEmailAddressId,
      )?.emailAddress ?? user.emailAddresses[0]?.emailAddress;

    if (!email) {
      return null;
    }

    if (!db) {
      return null;
    }

    const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || null;

    return await db.user.upsert({
      where: { clerkId: user.id },
      update: {
        email,
        name,
        image: user.imageUrl,
      },
      create: {
        clerkId: user.id,
        email,
        name,
        image: user.imageUrl,
      },
    });
  } catch (error) {
    console.error("Error in onBoardUser:", error);
    return null;
  }
};
