CREATE TABLE wrestlers (
    wrestler_id serial PRIMARY KEY,
    wrestler_name text NOT NULL
    );
CREATE TABLE exercises (
    exercise_id serial PRIMARY KEY,
    exercise_name text NOT NULL
    );
CREATE TABLE workouts (
    workout_id serial PRIMARY KEY,
    wrestler_id int NOT NULL REFERENCES wrestlers(wrestler_id),
    workout_date timestamp NOT NULL
    );
CREATE TABLE exercise_sets (
    exercise_set_id serial PRIMARY KEY,
    exercise_id int NOT NULL REFERENCES exercises(exercise_id),
    workout_id int NOT NULL REFERENCES workouts(workout_id),
    exercise_reps int NOT NULL,
    exercise_weight int NOT NULL
    );
CREATE TABLE routines (
    routine_id serial PRIMARY KEY
    );

INSERT INTO exercises (exercise_name)
VALUES
    ('Bench Press'),
    ('Squat'),
    ('Overhead Press'),
    ('Barbell Row'),
    ('Deadlift');

INSERT INTO wrestlers(wrestler_name) VALUES ('Joe Book'), ('Jim-bo Bob');
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
