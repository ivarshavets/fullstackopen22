import { CoursePart } from "../type";
import { assertNever } from "../helpers/assertNever";

const Part = ({coursePart}: {coursePart: CoursePart}) => {
  const courseHeader = <h3>{coursePart.name}: {coursePart.exerciseCount}</h3>

  switch (coursePart.type) {
    case "normal":
      return (
        <div>
          {courseHeader}
          <em>{coursePart.description}</em>
        </div>
      )
    case "groupProject":
      return (
        <div>
          {courseHeader}
          <div>Project exercises: {coursePart.groupProjectCount}</div>
        </div>
      )
    case "submission":
      return (
        <div>
          {courseHeader}
          <em>{coursePart.description}</em>
          <div>Submit to <a href={coursePart.exerciseSubmissionLink}>{coursePart.exerciseSubmissionLink}</a></div>
        </div>
      )
    case "special":
      return (
        <div>
          {courseHeader}
          <em>{coursePart.description}</em>
          <div>Required skills: {coursePart.requirements.join(', ')}
            {/* {coursePart.requirements.map(
              (el, index) => <span key={index}>{
                index === coursePart.requirements.length - 1 ? el : `${el}, `
              }</span>)
            } */}
          </div>
        </div>
      )
    default:
      return assertNever(coursePart)
      // const _exhaustiveCheck: never = coursePart;
      // return _exhaustiveCheck;
  }
}

export default Part;
