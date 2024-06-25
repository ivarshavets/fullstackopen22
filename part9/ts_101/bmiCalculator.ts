export const calculateBmi = (height: number, weight: number): string => {
  const heighIntMeters = height/100;
  const bmi = weight/ Math.pow(heighIntMeters, 2)
  let result = ''

  if ( bmi < 16 ) {
    result = "Underweight (Severe thinness)";
  } else if ( bmi < 17 ) {
    result = "Underweight (Moderate thinness)";
  } else if ( bmi < 18.5) {
    result = "Underweight (Mild thinness)";
  } else if ( bmi < 25) {
    result = "Normal range";
  } else if ( bmi < 30) {
    result = "Overweight (Pre-obese)";
  } else if ( bmi < 35) {
    result = "Obese (Class I)";
  } else if ( bmi < 40) {
    result = "Obese (Class II)";
  } else {
    result = "Obese (Class III)";
  }

  return result;
};

interface BmiParams {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): BmiParams => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error('Provided arguments are not numbers')
  }

  return {
    height: Number(args[2]),
    weight: Number(args[3])
  };
}

try {
  // The process.argv() method is used for returning all the command-line arguments that were passed when the Node. js process was being launched.
  const {height, weight} = parseArguments(process.argv)
  const result = calculateBmi(height, weight)
  console.log(result)
} catch (error: unknown) {
  let errorMessage = 'Something happend'
  if (error instanceof Error) {
    errorMessage += `Error ${error.message}`
  }
  console.log(errorMessage)
}
