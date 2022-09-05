# TypeScript
[Exercises 9.1-9.3 of fullstackopen](https://fullstackopen.com/en/part9/first_steps_with_type_script#exercises-9-1-9-3)

## Task1 - calculate [BMI](https://en.wikipedia.org/wiki/Body_mass_index)
1. Write a function calculateBmi that calculates a BMI based on a given height (in centimeters) and weight (in kilograms) and then returns a message that suits the results.
Call the function in the same file with hard-coded parameters and print out the result. The code

```
console.log(calculateBmi(180, 74))
```
should print the following message:

```
Normal (healthy weight)
```

2. Create a npm script to call the function and give the parameters of bmiCalculator as command-line arguments:
```
npm run calculateBmi 180, 74
```

## Task2 - Exercise calculator

1. Write a function `calculateExercises` that calculates the average time of _daily exercise hours_ and compares it to the _target amount_ of daily hours and returns an object that includes the following values:
- the number of days
- the number of training days
- the original target value
- the calculated average time
- boolean value describing if the target was reached
- a rating between the numbers 1-3 that tells how well the hours are met. You can decide on the metric on your own.
- a text value explaining the rating

The daily exercise hours are given to the function as an [array](https://www.typescriptlang.org/docs/handbook/basic-types.html#array) that contains the number of exercise hours for each day in the training period. Eg. a week with 3 hours of training on Monday, none on Tuesday, 2 hours on Wednesday, 4.5 hours on Thursday and so on would be represented by the following array:
```
[3, 0, 2, 4.5, 0, 3, 1]
```
For the Result object, you should create an [interface](https://www.typescriptlang.org/docs/handbook/interfaces.html).

If you call the function with parameters `[3, 0, 2, 4.5, 0, 3, 1]` and `2`, it should return:
```
{ periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.9285714285714286 }
  ```
Handle exceptions and errors appropriately. The exerciseCalculator should accept inputs of varied lengths.

2. Create a npm script, `npm run calculateExercises`, to call the function and give the parameters of exerciseCalculator as command-line arguments, eg:
```
npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4
```
In the example, the first argument is the target value.

## Scripts
### npm run ts-node
Use `ts-node` within this directory by running this command.
If you are using `ts-node` through package.json, all command-line arguments for the script need to be prefixed with --.

Run file.ts with `ts-node`:
```
npm run ts-node -- file.ts
```
