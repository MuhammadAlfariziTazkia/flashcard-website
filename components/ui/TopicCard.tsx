import Button from "./Button";

export default function TopicCard ({id, name, cards, testAction} : TopicType) {
    return (
        <div key={id} className="bg-gray-100 p-6 rounded-xl shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff]">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">{name}</h2>
        <p className="text-gray-600 mb-4">Cards: {cards.length}</p>
        <div className="flex space-x-4">
          <Button iconType="play" text="Start Test" action={testAction} />
          <Button iconType="list" text="View Cards" />
        </div>
      </div>
    )
}