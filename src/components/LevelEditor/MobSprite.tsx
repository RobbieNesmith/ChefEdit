import Mob from "../../models/mob";

export default function MobSprite(props: { mob: Mob }) {
    const { mob } = props;
    const pathStartString = `M ${mob.startingCoordinates.x} ${mob.startingCoordinates.y}`;
    const pathContinuationString = mob.pathCoordinates.map(p => `L ${p.x} ${p.y}`)
    const pathString = [pathStartString, ...pathContinuationString].join(" ");
    return (
        <>
            {
                pathString.length > 1 &&
                <svg width="640" height="480" className="MobPath">
                    <path fill="none" stroke="#FF00FF" strokeWidth="2" d={pathString} />
                </svg>
            }
            <div
                className="Mob"
                style={{
                    left: mob.startingCoordinates.x,
                    bottom: 480 - mob.startingCoordinates.y,
                }}
            >
                <img
                    src={`${process.env.PUBLIC_URL}/img/${mob.name}.gif`}
                    alt={mob.name}
                />
            </div>
            {mob.pathCoordinates.map(pc => {
                return (
                    <div
                        className="Mob"
                        style={{
                            opacity: 0.5,
                            left: pc.x,
                            bottom: 480 - pc.y,
                        }}
                    >
                        <img
                            src={`${process.env.PUBLIC_URL}/img/${mob.name}.gif`}
                            alt={mob.name}
                        />
                    </div>
                );
            })}
        </>
    );
}