import { CoursePartsProps } from "../type";
import Part from "./Part";

const Content = ({courseParts}: CoursePartsProps) => (
  <div>
    {courseParts.map((el, index) =>
      <Part key={`${index}-${el.name}`} coursePart={el}/>
    )}
  </div>
)

export default Content
