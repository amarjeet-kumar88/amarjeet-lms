import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { env } from "@/lib/env";
import { prisma } from "@/lib/db";
export async function POST(req:Request) {
    const body = await req.text();

    const  headerList = await headers();

    const signature = headerList.get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature, 
            env.STRIPE_WEBHOOK_SECRET
        )
        
    } catch (error){
        console.error("Webhook signature verification failed", error);
        return new Response("Webhook error", { status: 400});
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if(event.type === 'checkout.session.completed'){
        const courseId = session.metadata?.courseId;
        const customerId = session.customer as string;
        const enrollmentId = session.metadata?.enrollmentId;

        if(!courseId || !enrollmentId){
            throw new Error("Webhook Error: Missing metadata");
        }

        const user = await prisma.user.findUnique({
            where: {
                stripeCustomerId: customerId,
            },
        });

        if(!user){
            throw new Error("User not found...");
        }

        await prisma.enrollment.update({
            where: {
                id: enrollmentId,
            },
            data: {
                status: "Active",
            },
        });
    }

    return new Response(null, { status: 200 });
}