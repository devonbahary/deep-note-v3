export class RouteUtil {
    static async handleAsync(cb, next) {
        try {
            await cb();
        } catch (err) {
            next(err)
        }
    }

    static sendSuccess(res) {
        res.sendStatus(200);
    }

    static sendNotFound(res) {
        res.sendStatus(404);
    }
}