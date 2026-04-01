import CardUpFolder from "../../components/CardUpFolder";
import MainFullContent from "../MainFullContent";
type Props = {
  reloadCourses: () => Promise<void>;
};

function StartScreen({ reloadCourses }: Props) {
  return (
    <MainFullContent>
      <CardUpFolder reloadCourses={reloadCourses} />
    </MainFullContent>
  );
}

export default StartScreen;
