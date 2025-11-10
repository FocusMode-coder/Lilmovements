import { PRIMARY_INSTRUCTOR } from "./constants";

export const displayInstructor = (name?: string) => name?.trim() || PRIMARY_INSTRUCTOR;