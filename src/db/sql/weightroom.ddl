DROP TABLE IF EXISTS wrestlers CASCADE;
DROP TABLE IF EXISTS exercises CASCADE;
DROP TABLE IF EXISTS routines CASCADE;
DROP TABLE IF EXISTS routine_templates CASCADE;
DROP TABLE IF EXISTS routine_sets CASCADE;
DROP TABLE IF EXISTS workouts CASCADE;
DROP TABLE IF EXISTS exercise_sets CASCADE;

CREATE TABLE wrestlers (
    wrestler_id serial PRIMARY KEY,
    wrestler_name text NOT NULL,
    wrestler_age smallint,
    wrestler_weight smallint,
    wrestler_weight_unit smallint,
    deleted_at timestampz
    );
CREATE TABLE exercises (
    exercise_id serial PRIMARY KEY,
    exercise_name text NOT NULL,
    deleted_at timestampz
    );
CREATE TABLE routines (
    routine_id serial PRIMARY KEY,
    routine_label text NOT NULL,
    deleted_at timestampz
    );
CREATE TABLE routine_templates (
    routine_template_id serial PRIMARY KEY,
    routine_id int NOT NULL REFERENCES routines(routine_id),
    routine_template_label text NOT NULL,
    deleted_at timestampz
    );
CREATE TABLE routine_sets (
    routine_set_id serial PRIMARY KEY,
    routine_id int NOT NULL REFERENCES routines(routine_id),
    routine_template_id int NOT NULL REFERENCES routine_templates(routine_template_id),
    exercise_id smallint NOT NULL REFERENCES exercises(exercise_id),
    exercise_reps smallint NOT NULL,
    exercise_weight smallint,
    deleted_at timestampz
    );
CREATE TABLE workouts (
    workout_id serial PRIMARY KEY,
    wrestler_id int NOT NULL REFERENCES wrestlers(wrestler_id),
    workout_date timestampz NOT NULL,
    workout_duration interval,
    workout_label text,
    routine_id int REFERENCES routines(routine_id),
    routine_template_id int REFERENCES routine_templates(routine_template_id),
    deleted_at timestampz
    );

CREATE TABLE exercise_sets (
    exercise_set_id serial PRIMARY KEY,
    exercise_id int NOT NULL REFERENCES exercises(exercise_id),
    workout_id int NOT NULL REFERENCES workouts(workout_id),
    exercise_reps smallint NOT NULL DEFAULT 0,
    exercise_weight smallint NOT NULL DEFAULT 0,
    exercise_weight_unit smallint NOT NULL DEFAULT 1,
    set_number smallint DEFAULT -1,
    routine_set_id int REFERENCES routine_sets(routine_set_id),
    deleted_at timestampz
    );
