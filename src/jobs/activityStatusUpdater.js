import cron from 'node-cron'
import { prisma } from "../lib/prisma.js";

export const activityStatusUpdater = () => {
    //'*/5 * * * *' means every 5นาที
    cron.schedule('*/5 * * * *', async () => {
       console.log("⏳ [CRON] Sweeping database for finished activities...") 
       try {
            const res = await prisma.activity.updateMany({
                where: { 
                    eventStartTime: { lt: new Date() },
                    status: { not: 'FINISHED' }
                },
                data: { status: 'FINISHED' }
            })
            console.log(`✅ [CRON] Successfully updated ${res.count} activities to FINISHED.`)
       } catch (error) {
            console.error("❌ [CRON] Error updating activities:", error)
       }
    })

}

