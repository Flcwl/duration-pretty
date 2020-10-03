interface DurationTime {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
}
declare enum DurationType {
    seconds = "seconds",
    milliseconds = "milliseconds"
}
interface Duration {
    $d: DurationTime;
    $t: number;
    format: (formatStr: string) => string;
}
export declare const duration: (t: unknown, type?: DurationType) => Duration;
export {};
