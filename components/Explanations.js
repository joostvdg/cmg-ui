import Explanation from './Explanation.js';

export default function Explanations(props) {
    return (
        <div>
            <Explanation id="explanationGeneral"        title="Resource Scoring"    body="The scores are the probabilities of throwing the Number on the tile with two dice. For example, the chance of throwing 6 or 8, is around 13,9% which is scored as 139. There is a score - maximum per three tiles - and a resource score - average score per tile for a particular resource. Resource being the things like Grain or Bricks." />
            <Explanation id="explanationMax"            title="Max"                 body="Maximum score per three adjacent tiles."  />
            <Explanation id="explanationMin"            title="Min"                 body="Minimum score per three adjacent tiles."  />
            <Explanation id="explanationMaxR"           title="MaxR"                body="Maximum average score per tile for each resource."  />
            <Explanation id="explanationMinR"           title="MinR"                body="Minimum average score per tile for each resource."  />
            <Explanation id="explanationMax300"         title="Max300"              body="Maximum number of groups of three tiles that have a score of 300 or more."  />
            <Explanation id="explanationMaxRow"         title="MaxRow"              body="Maximum number of the same Resource in a Row (horizontal)."  />
            <Explanation id="explanationMaxColumn"      title="MaxColumn"           body="Maximum number of the same Resource in a Column (vertical)."  />
            <Explanation id="explanationAdjacentSame"   title="AdjacentSam"         body="Whether adjacent tiles (by 3) are allowed to be of the same Resource."  />
        </div>
    );
}