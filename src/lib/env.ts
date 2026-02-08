const DEFAULT_SCHEDULE_URL = "/data/schedules.json";

function readOptionalEnvString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export const isDev = import.meta.env.DEV;

export const scheduleUrl =
  readOptionalEnvString(import.meta.env.VITE_SCHEDULE_URL) ??
  DEFAULT_SCHEDULE_URL;
