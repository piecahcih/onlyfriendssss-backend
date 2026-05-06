import { prisma } from "../lib/prisma.js";

export async function getPlaceData(query) {
    try {
        return await prisma.place.findMany({
            where:{ 
                placeName: {
                    contains: query,
                }
            },
            take: 5
        })
        
    } catch (error) {
        console.error("Prisma Error:", error);
        throw error     
    }
}

