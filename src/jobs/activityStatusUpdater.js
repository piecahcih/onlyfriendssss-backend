import cron from 'node-cron'
import { prisma } from "../lib/prisma.js";

export const activityStatusUpdater = () => {
    //'*/5 * * * *' means every 5นาที
    cron.schedule('*/5 * * * *', async () => {
        console.log("⏳ [CRON] Sweeping database for finished activities...")
        try {
            const now = new Date();
            const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000);

            const res = await prisma.activity.updateMany({
                where: {
                    // Don't overwrite events that are already FINISHED or CANCELLED
                    status: { notIn: ['FINISHED', 'CANCELLED'] },
                    OR: [
                        // Case A: Event has an end time and it has passed
                        {
                            eventEndTime: { lte: now }
                        },
                        // Case B: No end time set -> finish 15 mins after start time
                        {
                            eventEndTime: null,
                            eventStartTime: { lte: fifteenMinsAgo }
                        }
                    ]
                },
                data: { status: 'FINISHED' }
            });
            console.log(`✅ [CRON] Successfully updated ${res.count} activities to FINISHED.`)
        } catch (error) {
            console.error("❌ [CRON] Error updating activities:", error)
        }
    })

}

