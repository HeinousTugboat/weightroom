
export enum weightUnit {
    IMPERIAL = 1, METRIC = 2
}

export interface wrestlerJSON {
    wrestler_id: number;
    wrestler_name: string;
    wrestler_age?: number | null;
    wrestler_weight?: number | null;
    wrestler_weight_unit?: weightUnit | null;
}

export interface exerciseJSON {
    exercise_id: number;
    exercise_name: string;
}

export interface routineJSON {
    routine_id: number;
    routine_label: string;
}

export interface routineTemplateJSON {
    routine_template_id: number;
    routine_id: number;
    routine_template_label: string;
}

export interface routineSetJSON {
    routine_set_id: number;
    routine_id: number;
    routine_template_id: number;
    exercise_id: number;
    exercise_reps: number;
    exercise_weight?: number | null;
}

export interface workoutJSON {
    workout_id: number;
    wrestler_id: number;
    workout_date: Date;
    routine_id?: number | null;
    routine_template_id?: number | null;
    workout_duration?: Date | null; //???
    workout_label?: string | null;
}

export interface exerciseSetJSON {
    exercise_set_id: number;
    exercise_id: number;
    workout_id: number;
    routine_set_id?: number | null;
    exercise_reps: number;
    exercise_weight: number;
    exercise_weight_unit?: weightUnit | null;
}
