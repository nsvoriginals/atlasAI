export function MissingSkill({ skill, color = 'bg-green-300' }) {
    return (
        <div className={`flex items-center justify-center ${color} inline-flex px-3 py-1 mx-2 my-2 rounded-full`}>
            <h4 className="text-2xl">{skill}</h4>
        </div>
    );
}
