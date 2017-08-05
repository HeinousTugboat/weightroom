System.register("src/weightroom/models/workout", ["src/weightroom/models/routine"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var routine_1, Exercise, ExerciseSet, Workout;
    return {
        setters: [
            function (routine_1_1) {
                routine_1 = routine_1_1;
            }
        ],
        execute: function () {
            Exercise = class Exercise {
                constructor(name) {
                    this.name = name;
                    this.id = Exercise.id++;
                    this.name = name;
                    Exercise.list.push(this);
                }
            };
            Exercise.list = [];
            Exercise.id = 0;
            exports_1("Exercise", Exercise);
            ExerciseSet = class ExerciseSet {
                constructor(exercise) {
                    this.id = ExerciseSet.id++;
                    this.reps = 0;
                    this.weight = 0;
                    this.setNumber = 1;
                    exercise && this.setExercise(exercise);
                }
                setExercise(exercise) {
                    this.exercise = exercise;
                    return this;
                }
                setReps(reps) {
                    this.reps = reps;
                    return this;
                }
                setWeight(weight) {
                    this.weight = weight;
                    return this;
                }
                save() {
                }
                next(workout) {
                    this.save();
                    let next = workout.newSet();
                    if (next.exercise === this.exercise) {
                        next.setNumber = this.setNumber + 1;
                    }
                    else {
                    }
                    return next;
                }
            };
            ExerciseSet.id = 0;
            exports_1("ExerciseSet", ExerciseSet);
            Workout = class Workout {
                constructor(wrestler, routine) {
                    this.sets = [];
                    this.wrestler = wrestler;
                    this.routine = routine || new routine_1.default('No Routine');
                    this.nextExercise = this.routine.getFirst();
                    this.date = new Date(Date.now());
                }
                newSet(exercise) {
                    const set = new ExerciseSet;
                    if (!exercise) {
                        set.setExercise(this.routine.getNext());
                    }
                    else {
                        set.setExercise(exercise);
                    }
                    this.sets.push(set);
                    return set;
                }
                complete() { }
                getSets() {
                    return this.sets;
                }
            };
            exports_1("Workout", Workout);
        }
    };
});
System.register("src/weightroom/models/routine", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Routine;
    return {
        setters: [],
        execute: function () {
            Routine = class Routine {
                constructor(name) {
                    this.id = Routine.id++;
                    this.name = name;
                    Routine.list.push(this);
                }
                getFirst() {
                    return this.exercises[0];
                }
                getNext() {
                    return this.exercises[1];
                }
                setExercises(exercises) {
                    this.exercises = exercises;
                }
            };
            Routine.list = [];
            Routine.id = 0;
            exports_2("default", Routine);
        }
    };
});
System.register("src/weightroom/models/wrestler", ["src/weightroom/models/workout"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var workout_1, Wrestler;
    return {
        setters: [
            function (workout_1_1) {
                workout_1 = workout_1_1;
            }
        ],
        execute: function () {
            Wrestler = class Wrestler {
                constructor(name) {
                    this.id = Wrestler.id++;
                    this.workouts = [];
                    this.name = name;
                    Wrestler.list.push(this);
                }
                beginWorkout(routine) {
                    let workout;
                    if (!routine) {
                        workout = new workout_1.Workout(this, this.routine);
                    }
                    else {
                        workout = new workout_1.Workout(this, routine);
                    }
                    this.workouts.push(workout);
                    return workout;
                }
                setRoutine(routine) {
                    this.routine = routine;
                }
            };
            Wrestler.list = [];
            Wrestler.id = 0;
            exports_3("default", Wrestler);
        }
    };
});
System.register("client/fetch", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    function getJSON(url) {
        return fetch("/api/wrestlers", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ a: 'foo', b: 'bar' })
        })
            .then(res => res.json())
            .then(res => console.log(res));
    }
    exports_4("getJSON", getJSON);
    function getHTML(url) {
        return Promise.resolve({});
    }
    exports_4("getHTML", getHTML);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("client/app", ["client/fetch"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    function submitJSON(data) {
        fetch('/wr/wrestlers/add', {
            headers: {
                'Content-Type': 'application/json'
            }, method: 'POST',
            body: JSON.stringify(data)
        })
            .then(res => { console.log(res), location.reload(); })
            .catch(err => console.log(err));
    }
    var fetch_1, submitButton, formEl;
    return {
        setters: [
            function (fetch_1_1) {
                fetch_1 = fetch_1_1;
            }
        ],
        execute: function () {
            console.log('Client-side JS loaded!');
            fetch_1.getJSON('');
            submitButton = document.getElementById('submit');
            formEl = document.getElementById('wrestler-form');
            submitButton && submitButton.addEventListener('click', () => console.log('click'));
            formEl && formEl.addEventListener('submit', (ev) => {
                console.log('form-submit!');
                ev.preventDefault();
                let formData = new FormData(formEl);
                let obj = {
                    name: formData.get('name'),
                    age: formData.get('age')
                };
                submitJSON(obj);
            });
        }
    };
});
//# sourceMappingURL=app.js.map