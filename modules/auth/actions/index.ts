"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export const onBoardUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const email =
    user.emailAddresses.find(
      (address) => address.id === user.primaryEmailAddressId,
    )?.emailAddress ?? user.emailAddresses[0]?.emailAddress;

  if (!email) {
    throw new Error("The signed-in user does not have an email address.");
  }

  if (!db) {
    return null;
  }

  const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || null;

  return db.user.upsert({
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
};

export const getCurrentUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  if (!db) {
    return null;
  }

  return db.user.findUnique({
    where: { clerkId: user.id },
  });
};
