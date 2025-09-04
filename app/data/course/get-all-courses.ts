import { prisma } from "@/lib/db";

export async function getAllCourses() {
    const data = await prisma.course.findMany({
        where: {
            status: "Publish",
        },
        orderBy: {
            createdAt: "desc"
        },
        select: {
            title: true,
            fileKey: true,
            price: true,
            duration: true,
            level: true,
            slug: true,
            id: true,
            smallDescription: true,
            category: true,
        }
    })

    return data;
}

export type PublicCourseType = Awaited<ReturnType<typeof getAllCourses>>[0];