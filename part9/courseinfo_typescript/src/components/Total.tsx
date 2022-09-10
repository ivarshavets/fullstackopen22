import { CoursePartsProps } from "../type";

const Total = ({courseParts}: CoursePartsProps) => (
  <p>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
)

export default Total;
