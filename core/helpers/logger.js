export const SINKS = {
    TTY: Symbol("tty"),
    /* sink all messages */
    VOID: Symbol("void")
}

export class Logger {
    static LOG_SINK = SINKS.TTY

    static log(msg) {
        if (!msg) return;

        switch (Logger.LOG_SINK) {
            case SINKS.TTY:
                console.log(msg);
                break;

            default:
                /* defaults to void */ 
                break;
        }
    }
}