import Mob from "../../models/Mob";

export default function MobInfo(props: { mob: Mob }) {
    let { mob } = props;
    return (
        <li>
            <div>{mob.name}</div>
            <div>Starting Coordinates</div>
            <div>
                {mob.startingCoordinates.x}, {mob.startingCoordinates.y}
            </div>
            <div>Unknown1: {mob.unknown1}</div>
            <div>Unknown2: {mob.unknown2}</div>
            <div><input type="checkbox" disabled checked={!!mob.flippedH} /> Flipped horizontally?</div>
            <div>Path Coordinates</div>
            <div>
                {mob.pathCoordinates.map(
                    pc => {
                        return <div>{pc.x}, {pc.y}</div>;
                    }
                )}
            </div>
        </li>
    );
}