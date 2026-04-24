import { getNoti, markAllAsRead, markAsRead } from "../services/notification.service.js"

export async function getNotiCtrl(req, res, next) {
    try {
        const userId = req.result.id
        const notifications = await getNoti({ userId })
        res.json({ data: notifications })
    } catch (error) {
        next(error)
    }

}

export async function markAsReadCtrl(req, res, next) {
    try {
        const userId = req.result.id
        const { id } = req.params
        const result = await markAsRead({ id, userId })
        res.json({ message: "Mark as read", data: result })

    } catch (error) {
        next(error)

    }
}

export async function markAllAsReadCtrl(req, res, next) {
    try {
        const userId = req.result.id
        await markAllAsRead(userId)
        res.json({ message: "All marked as read" })
    } catch (error) {
        next(error)

    }
}