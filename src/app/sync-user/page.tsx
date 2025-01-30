import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { db } from "~/server/db";


const SyncUserPage = async() => {
    const userId = await currentUser();
    if (!userId) {
        throw new Error('User not found');
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId.id);
    if (!user.emailAddresses[0]?.emailAddress) {
        return notFound();

    }

    await db.user.upsert({
        where: {
            emailAddress: user.emailAddresses[0]?.emailAddress,
        },
        update: {
            imageUrl: user.imageUrl,
            firstName: user.firstName,
            lastName: user.lastName,
        },
        create: {
            id: userId.id,
            emailAddress: user.emailAddresses[0]?.emailAddress,
            imageUrl: user.imageUrl,
            firstName: user.firstName,
            lastName: user.lastName,
        },
    });
    return redirect('/dashboard');
}

export default SyncUserPage;
