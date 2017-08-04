-- SELECT * FROM wrestlers;
-- SELECT * FROM exercises;
-- SELECT * FROM workouts;
-- SELECT * FROM exercise_sets;

-- SELECT exercise_sets.exercise_id, exercises.exercise_id, exercises.exercise_name
--   FROM exercise_sets
--   INNER JOIN exercises ON exercise_sets.exercise_id = exercises.exercise_id
--   WHERE workout_id = 1
--   ORDER BY exercise_set_id;

SELECT exercise_reps, exercises.exercise_name, exercise_weight, wrestlers.wrestler_name, workouts.workout_date
  FROM exercise_sets
  NATURAL JOIN exercises
  NATURAL JOIN workouts
  NATURAL JOIN wrestlers
  WHERE workout_id = 1
  ORDER BY wrestlers.wrestler_name, exercise_sets.exercise_set_id

