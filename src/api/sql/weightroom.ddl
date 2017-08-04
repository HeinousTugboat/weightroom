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
    wrestler_age int,
    wrestler_weight int,
    wrestler_weight_unit int
    );
CREATE TABLE exercises (
    exercise_id serial PRIMARY KEY,
    exercise_name text NOT NULL
    );
CREATE TABLE routines (
    routine_id serial PRIMARY KEY,
    routine_label text NOT NULL
    );
CREATE TABLE routine_templates (
    routine_template_id serial PRIMARY KEY,
    routine_id int NOT NULL REFERENCES routines(routine_id),
    routine_template_label text NOT NULL
    );
CREATE TABLE routine_sets (
    routine_set_id serial PRIMARY KEY,
    routine_id int NOT NULL REFERENCES routines(routine_id),
    routine_template_id int NOT NULL REFERENCES routine_templates(routine_template_id),
    exercise_id int NOT NULL REFERENCES exercises(exercise_id),
    exercise_reps int NOT NULL,
    exercise_weight int
    );
CREATE TABLE workouts (
    workout_id serial PRIMARY KEY,
    wrestler_id int NOT NULL REFERENCES wrestlers(wrestler_id),
    routine_id int REFERENCES routines(routine_id),
    routine_template_id int REFERENCES routine_templates(routine_template_id),
    workout_date timestamp NOT NULL,
    workout_duration time,
    workout_label text
    );
CREATE TABLE exercise_sets (
    exercise_set_id serial PRIMARY KEY,
    exercise_id int NOT NULL REFERENCES exercises(exercise_id),
    workout_id int NOT NULL REFERENCES workouts(workout_id),
    routine_set_id int REFERENCES routine_sets(routine_set_id),
    exercise_reps int NOT NULL,
    exercise_weight int NOT NULL,
    exercise_weight_unit int
    );

INSERT INTO exercises (exercise_name)
VALUES
    ('Squat'),
    ('Bench Press'),
    ('Barbell Row'),
    ('Overhead Press'),
    ('Deadlift');

INSERT INTO routines (routine_label)
VALUES
    ('SL5x5');

INSERT INTO routine_templates(routine_id, routine_template_label)
VALUES
    (1, 'SL5x5-A'),
    (1, 'SL5x5-B');

INSERT INTO routine_sets(routine_id, routine_template_id, exercise_id, exercise_reps)
VALUES
    (1, 1, 1, 5), (1, 1, 1, 5), (1, 1, 1, 5), (1, 1, 1, 5), (1, 1, 1, 5),
    (1, 1, 2, 5), (1, 1, 2, 5), (1, 1, 2, 5), (1, 1, 2, 5), (1, 1, 2, 5),
    (1, 1, 3, 5), (1, 1, 3, 5), (1, 1, 3, 5), (1, 1, 3, 5), (1, 1, 3, 5),
    (1, 2, 1, 5), (1, 2, 1, 5), (1, 2, 1, 5), (1, 2, 1, 5), (1, 2, 1, 5),
    (1, 2, 4, 5), (1, 2, 4, 5), (1, 2, 4, 5), (1, 2, 4, 5), (1, 2, 4, 5),
    (1, 2, 5, 5);

INSERT INTO wrestlers(wrestler_name) VALUES ('Joe Book'), ('Jim-bo Bob');
INSERT INTO workouts(workout_date, wrestler_id, routine_id, routine_template_id)
VALUES
    ('2014-11-8 9:15 AM', 1, 1, 1),
    ('2014-11-10 9:15 AM', 1, 1, 2),
    ('2014-11-12 6:15 AM', 1, 1, 1);

INSERT INTO exercise_sets(workout_id, routine_set_id, exercise_id, exercise_reps, exercise_weight)
VALUES
    (1, null, 1, 5, 45), (1, null, 1, 5, 45), (1, null, 1, 5, 80), (1, null, 1, 3, 120), (1, null, 1, 2, 160),
    (1, 1, 1, 5, 205), (1, 1, 1, 5, 205), (1, 1, 1, 10, 205),
    (1, null, 2, 5, 45), (1, null, 2, 5, 45), (1, null, 2, 5, 70), (1, null, 2, 3, 95), (1, null, 2, 2, 125),
    (1, 2, 2, 5, 140), (1, 2, 2, 5, 140), (1, 2, 2, 10, 140),
    (1, null, 3, 5, 45), (1, null, 3, 5, 45), (1, null, 3, 5, 70), (1, null, 3, 3, 95), (1, null, 3, 2, 125),
    (1, 3, 3, 5, 140), (1, 3, 3, 5, 140), (1, 3, 3, 8, 140);

INSERT INTO workouts(workout_date, wrestler_id)
VALUES
    ('2017-07-18 7:53 AM', (SELECT wrestler_id FROM wrestlers WHERE wrestler_name = 'Jim-bo Bob')),
    ('2017-07-18 7:53 AM', (SELECT wrestler_id FROM wrestlers WHERE wrestler_name = 'Joe Book'));

INSERT INTO exercise_sets(workout_id, exercise_id, exercise_reps, exercise_weight)
VALUES
    (1, 1, 5, 85),
    ((SELECT workout_id FROM workouts WHERE workout_date = '2017-07-18 7:53 AM' AND wrestler_id = (SELECT wrestler_id FROM wrestlers where wrestler_name = 'Joe Book')),
     (SELECT exercise_id FROM exercises WHERE exercise_name = 'Bench Press'), 5, 135),
    ((SELECT workout_id FROM workouts WHERE workout_date = '2017-07-18 7:53 AM' AND wrestler_id = (SELECT wrestler_id FROM wrestlers where wrestler_name = 'Joe Book')),
     (SELECT exercise_id FROM exercises WHERE exercise_name = 'Bench Press'), 5, 135),
    ((SELECT workout_id FROM workouts WHERE workout_date = '2017-07-18 7:53 AM' AND wrestler_id = (SELECT wrestler_id FROM wrestlers where wrestler_name = 'Joe Book')),
     (SELECT exercise_id FROM exercises WHERE exercise_name = 'Bench Press'), 5, 135),
    ((SELECT workout_id FROM workouts WHERE workout_date = '2017-07-18 7:53 AM' AND wrestler_id = (SELECT wrestler_id FROM wrestlers where wrestler_name = 'Joe Book')),
     (SELECT exercise_id FROM exercises WHERE exercise_name = 'Bench Press'), 5, 135),
    ((SELECT workout_id FROM workouts WHERE workout_date = '2017-07-18 7:53 AM' AND wrestler_id = (SELECT wrestler_id FROM wrestlers where wrestler_name = 'Joe Book')),
     (SELECT exercise_id FROM exercises WHERE exercise_name = 'Bench Press'), 5, 135),
    ((SELECT workout_id FROM workouts WHERE workout_date = '2017-07-18 7:53 AM' AND wrestler_id = (SELECT wrestler_id FROM wrestlers where wrestler_name = 'Joe Book')),
     (SELECT exercise_id FROM exercises WHERE exercise_name = 'Squat'), 5, 225),
    ((SELECT workout_id FROM workouts WHERE workout_date = '2017-07-18 7:53 AM' AND wrestler_id = (SELECT wrestler_id FROM wrestlers where wrestler_name = 'Joe Book')),
     (SELECT exercise_id FROM exercises WHERE exercise_name = 'Squat'), 5, 225),
    ((SELECT workout_id FROM workouts WHERE workout_date = '2017-07-18 7:53 AM' AND wrestler_id = (SELECT wrestler_id FROM wrestlers where wrestler_name = 'Joe Book')),
     (SELECT exercise_id FROM exercises WHERE exercise_name = 'Squat'), 5, 225),
    ((SELECT workout_id FROM workouts WHERE workout_date = '2017-07-18 7:53 AM' AND wrestler_id = (SELECT wrestler_id FROM wrestlers where wrestler_name = 'Joe Book')),
     (SELECT exercise_id FROM exercises WHERE exercise_name = 'Squat'), 5, 225),
    ((SELECT workout_id FROM workouts WHERE workout_date = '2017-07-18 7:53 AM' AND wrestler_id = (SELECT wrestler_id FROM wrestlers where wrestler_name = 'Joe Book')),
     (SELECT exercise_id FROM exercises WHERE exercise_name = 'Squat'), 5, 225),
    ((SELECT workout_id FROM workouts WHERE workout_date = '2017-07-18 7:53 AM' AND wrestler_id = (SELECT wrestler_id FROM wrestlers where wrestler_name = 'Jim-bo Bob')),
     (SELECT exercise_id FROM exercises WHERE exercise_name = 'Deadlift'), 5, 305),
    ((SELECT workout_id FROM workouts WHERE workout_date = '2017-07-18 7:53 AM' AND wrestler_id = (SELECT wrestler_id FROM wrestlers where wrestler_name = 'Jim-bo Bob')),
     (SELECT exercise_id FROM exercises WHERE exercise_name = 'Deadlift'), 5, 305),
    ((SELECT workout_id FROM workouts WHERE workout_date = '2017-07-18 7:53 AM' AND wrestler_id = (SELECT wrestler_id FROM wrestlers where wrestler_name = 'Jim-bo Bob')),
     (SELECT exercise_id FROM exercises WHERE exercise_name = 'Deadlift'), 5, 305),
    ((SELECT workout_id FROM workouts WHERE workout_date = '2017-07-18 7:53 AM' AND wrestler_id = (SELECT wrestler_id FROM wrestlers where wrestler_name = 'Jim-bo Bob')),
     (SELECT exercise_id FROM exercises WHERE exercise_name = 'Deadlift'), 5, 305),
    ((SELECT workout_id FROM workouts WHERE workout_date = '2017-07-18 7:53 AM' AND wrestler_id = (SELECT wrestler_id FROM wrestlers where wrestler_name = 'Jim-bo Bob')),
     (SELECT exercise_id FROM exercises WHERE exercise_name = 'Deadlift'), 5, 305);
