import { trainSchedules, type ScheduleType } from "@/data/trainSchedules";
import {
  weekdayFerries,
  weekendFerries,
  weekdayInboundFerries,
  weekendInboundFerries,
} from "@/data/ferrySchedule";
import type { FerryConnection, TrainSchedule } from "@/types/smartSchedule";

export type FerrySchedules = {
  weekdayFerries: FerryConnection[];
  weekendFerries: FerryConnection[];
  weekdayInboundFerries: FerryConnection[];
  weekendInboundFerries: FerryConnection[];
};

export type SchedulePayload = {
  trainSchedules: Record<ScheduleType, TrainSchedule>;
  ferrySchedules: FerrySchedules;
  generatedAt?: string;
};

export const bundledSchedulePayload: SchedulePayload = {
  trainSchedules,
  ferrySchedules: {
    weekdayFerries,
    weekendFerries,
    weekdayInboundFerries,
    weekendInboundFerries,
  },
};

export function isSchedulePayload(value: unknown): value is SchedulePayload {
  if (!value || typeof value !== "object") return false;
  const payload = value as SchedulePayload;
  const train = payload.trainSchedules;
  const ferry = payload.ferrySchedules;
  return Boolean(
    train &&
      train.weekday &&
      train.weekend &&
      ferry &&
      Array.isArray(ferry.weekdayFerries) &&
      Array.isArray(ferry.weekendFerries) &&
      Array.isArray(ferry.weekdayInboundFerries) &&
      Array.isArray(ferry.weekendInboundFerries)
  );
}
