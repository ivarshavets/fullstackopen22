interface Results {
  periodLengthInDays: number;
  trainingDays: number;
  target: number;
  average: number;
  isTargetReached: boolean;
  rating: number;
  ratingDescription: string;
}

export const calculateExercises = (days: Array<number>, target: number): Results => {
  const getRating = () => {
    if (average < 1) {
        return 1;
    }
    if (average < 2) {
        return 2;
    }
    return 3;
  };

  const ratingDescription = {
    1: 'Not enough exercises',
    2: 'Not too bad but could be better',
    3: 'Good job!'
  };

  const periodLengthInDays = days.length;

  const trainingDays = days.reduce((days, dayHrs) => {
    if (dayHrs !== 0) {
      days+=1;
    }
    return days;
  }, 0);

  // const trainingDays = days.filter(d => d>0).length

  const trainingHours = days.reduce((total, hr) => total + hr, 0);

  const average = trainingHours / periodLengthInDays;

  const isTargetReached = average >= target;

  const rating = getRating();

  return {
    periodLengthInDays,
    trainingDays,
    target,
    average,
    isTargetReached,
    rating,
    ratingDescription: ratingDescription[rating]
  };
};

interface Params {
  days: Array<number>;
  target: number;
}

const parseArguments = (args: Array<string>): Params => {
  // ts-node exerciseCalculator.ts 2 3 0 2 4.5 0 3 1
  // ts-node + file name + target + 7 daily exercise hours --> 10 arguments
  if (args.length < 10) throw new Error('Not enough arguments');

  const funcArgs = args.slice(2);
  if (funcArgs.find(v => isNaN(Number(v)))) throw new Error('Values should be numbers');

  const funcArgsNumbers = funcArgs.map(v => Number(v));

  return {
    days: funcArgsNumbers.slice(1),
    target: funcArgsNumbers[0],
  };
};

try {
  const {days, target} = parseArguments(process.argv);
  console.log('days', days, 'target', target);
  const result = calculateExercises(days, target);
  console.log(result);
} catch (e: unknown) {
  let errorMessage = 'Somthing went wrong.';
  if (e instanceof Error) {
    errorMessage += `Error: ${e.message}`;
  }
  console.log(errorMessage);
}
