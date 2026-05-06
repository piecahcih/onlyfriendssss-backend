import { prisma } from "../lib/prisma.js";
import fs from "fs/promises";
import path from "path";
import cloudinary from "../../config/cloudinary.js";

export async function getAllActivities() {
    try {
        return await prisma.activity.findMany({
            orderBy: { id: 'desc' },
            include: {
                place: true,
                host: true,
                joinRequests: {
                    include: { user: true }
                }
            }
        })

        
    } catch (error) {
        console.error("Prisma Error:", error);
        throw error     
    }
}

export async function getUpcomingActivities(userid) {
    const now = new Date();

    const nextWeek = new Date();
    nextWeek.setDate(now.getDate() + 7);

    try {
        return await prisma.activity.findMany({
            orderBy: { eventStartTime: 'asc' },
            where: { 
                eventStartTime: {
                    gte: now,
                    lte: nextWeek
                },
                OR: [
                    { hostId: userid }, 
                    { 
                        joinRequests: { 
                            some: { 
                                userId: userid,
                                status: 'APPROVED'
                            } 
                        } 
                    } 
                ]
            },
            include: {
                place: true,
                host: true,
                joinRequests: {
                    include: { user: true }
                }
            }
        })

        
    } catch (error) {
        console.error("Prisma Error:", error);
        throw error     
    }

}

export async function getAllCurrentActivities() {
    try {
        return await prisma.activity.findMany({
            where: {
                status: { not: 'CANCELLED' },
                eventStartTime: { gte: new Date() }
            },
            orderBy: { eventStartTime: 'asc' },
            include: {
                place: true,
                host: true,
                joinRequests: {
                    include: { user: true }
                }
            }
        })

        
    } catch (error) {
        console.error("Prisma Error:", error);
        throw error     
    }
}

export async function getFinishedActivitiesOnThisAccount(userid) {
    try {
        return await prisma.activity.findMany({
            orderBy: { eventStartTime: 'desc' },
            where: {
                status: 'FINISHED',
                OR: [
                    { hostId: userid },
                    {
                        joinRequests: {
                            some: {
                                userId: userid,
                                status: 'APPROVED'
                            }
                        }
                    }
                ]
            },
            include: {
                place: true,
                host: true,
                joinRequests: {
                    include: { user: true }
                }
            }
        })

        
    } catch (error) {
        console.error("Prisma Error:", error);
        throw error     
    }
}

export async function getActivitiesCreatedByThisAccount(userid) {
    try {
        return await prisma.activity.findMany({
            orderBy: { id: 'desc' },
            where: { hostId: userid },
            include: {
                place: true,
                host: true,
                joinRequests: {
                    include: { user: true }
                }
            }
        })   
    } catch (error) {
        console.error("Prisma Error:", error);
        throw error     
    }
}

export async function getActivitiesJoinedByThisAccount(userid) {
    try {
        return await prisma.activity.findMany({
            orderBy: { eventStartTime: 'asc' },
            where: {
                //some เพราะมีคนjoinหลายคน ถ้าสักคนที่จอยในแอคทิวิตี้นั้นเป็นuserเราก็จะใช่ (มีnone/everyด้วย)
                joinRequests: {
                    some: {
                        userId: userid,
                        status: 'APPROVED'
                    }
                }
            },
            include: {
                place: true,
                host: true,
                joinRequests: {
                    include: { user: true }
                }
            }
        })

        
    } catch (error) {
        console.error("Prisma Error:", error);
        throw error     
    }
}

export async function getActivityById(activityId) {
    try {
        return await prisma.activity.findUnique({
            where: { id: activityId },
            include: {
                place: true,
                host: true,
                joinRequests: {
                    include: { user: true }
                }
            }
        })

    } catch (error) {
        console.error("Prisma Error:", error);
        throw error     
    }
}

export async function getActivityByCategory(category) {4
    try {
        return await prisma.activity.findMany({
            where: {
                status: { not: 'CANCELLED' },
                eventStartTime: { gte: new Date() },
                category: category
            },
            orderBy: { eventStartTime: 'asc' },
            include: {
                place: true,
                host: true,
                joinRequests: {
                    include: { user: true }
                }
            }
        })
        
    } catch (error) {
        console.error("Prisma Error:", error);
        throw error     
    }
}

export async function createActivity(Adata, localFilePath) {
    // console.log('first')
    // console.log('Adata', Adata)
    // console.log('local', localFilePath)
    if (localFilePath) {
        const absolutePath = path.isAbsolute(localFilePath)
            ? localFilePath
            : path.join(process.cwd(), localFilePath)


        try {
            const uploadResult = await cloudinary.uploader.upload(absolutePath, {
                folder: "activity_coverPhoto",
            })
            Adata.coverPhoto = uploadResult.secure_url

            await fs.unlink(absolutePath);
            console.log(`✅ Deleted temporary file: ${absolutePath}`)
        } catch (uploadErr) {
            console.error("Cloudinary Upload Error:", uploadErr)

            await fs.unlink(absolutePath).catch(() => { })
            throw new Error("ไม่สามารถอัปโหลดรูปภาพได้")
        }
    }

    try {
        const activity = await prisma.activity.create({
            data: Adata
        })
        //สร้างห้องแชทสำหรับกิจกรรมนี้ และดึง Host เข้าห้อง
        await prisma.chatRoom.create({
            data: {
                type: 'ACTIVITY',
                activityId: activity.id,
                members: {
                    create: {
                        userId: activity.hostId
                    }
    
                }
            }
        })
        return activity

        
    } catch (error) {
        console.error("Prisma Error:", error);
        throw error     
    }

}

export async function letHostBeFirstMember(userid,actid){
    try {
        return await prisma.joinRequest.create({
            data: {
                status: 'APPROVED',
                userId: userid,
                activityId: actid
            }
        })
    } catch (error) {
        console.error("Prisma Error:", error);
        throw error     
    }

}

export async function getOrAddPlaceId(placeName, address, latitude, longitude) {

    const tolerance = 0.001 //0.001degrees ~ 111 meters

    const existingPlace = await prisma.place.findFirst({
        where: {
            placeName: placeName,
            latitude: {
                gte: latitude - tolerance,
                lte: latitude + tolerance,
            },
            longitude: {
                gte: longitude - tolerance,
                lte: longitude + tolerance,
            }
        }
    })
    if (existingPlace) {
        return existingPlace.id
    }

    try {
        const newPlace = await prisma.place.create({
            data: { placeName, address, latitude, longitude }
        })
        return newPlace.id
    } catch (error) {
        console.error("Prisma Error:", error);
        throw error     
    }
}

export async function editActivityById(userid, activityId, Editdata, localFilePath) {
    let oldCoverPhoto = null;

    const existingActivity = await prisma.activity.findFirst({
        where: { hostId: userid, id: activityId },
    })
    oldCoverPhoto = existingActivity?.coverPhoto

    if (localFilePath) {
        const absolutePath = path.isAbsolute(localFilePath)
            ? localFilePath
            : path.join(
                process.cwd(),
                "src",
                "uploads",
                path.basename(localFilePath),
            );

        try {
            const uploadResult = await cloudinary.uploader.upload(absolutePath, {
                folder: "activity_coverPhoto",
            });

            Editdata.coverPhoto = uploadResult.secure_url;

            await fs.unlink(absolutePath);
            console.log(`✅ Temporary file deleted: ${absolutePath}`);
        } catch (uploadErr) {
            console.error("Cloudinary Upload Error:", uploadErr);

            await fs.unlink(absolutePath).catch(() => { });
            throw new Error("Failed to upload image to Cloudinary");
        }
    }

    await prisma.activity.update({
        where: { id: activityId },
        data: Editdata
    })

    if (
        oldCoverPhoto &&
        Editdata.coverPhoto &&
        oldCoverPhoto !== Editdata.coverPhoto
    ) {
        if (!oldCoverPhoto.startsWith("http")) {
            const cleanPath = oldCoverPhoto.startsWith("/")
                ? oldCoverPhoto.substring(1)
                : oldCoverPhoto;

            const oldFilePath = path.join(process.cwd(), "src", cleanPath);

            try {
                await fs.unlink(oldFilePath);
                console.log(`🗑️ Deleted old local file: ${oldFilePath}`);
            } catch (fsErr) {
                console.warn("⚠️ No old files found to delete:", fsErr.message);
            }
        }
    }

    return Editdata
}

export async function changeActivityStatus(activityId, status) {
    try {
        return await prisma.activity.update({
            where: { id: activityId },
            data: { status: status }
        })
    } catch (error) {
        console.error("Prisma Error:", error);
        throw error     
    }
}

export async function cancelActivityStatus(activityId) {
    try {
        return await prisma.activity.update({
            where: { id: activityId },
            data: { status: 'CANCELLED' }
        })
    } catch (error) {
        console.error("Prisma Error:", error);
        throw error     
    }
}

export async function deleteActivityById(userid, activityId) {
    try {
        return await prisma.activity.delete({
            where: { hostId: userid, id: activityId }
        })  
    } catch (error) {
        console.error("Prisma Error:", error);
        throw error     
    }
}