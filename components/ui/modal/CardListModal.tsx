import { EditIcon, TrashIcon, XIcon } from "lucide-react";

export default function CardListModal() {
    const cards = [
        { id: '1', value1: 'Car', value2: 'Mobil' },
        { id: '2', value1: 'Money', value2: 'Uang' },
        { id: '3', value1: 'Book', value2: 'Buku' },
    ];
    return (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-90 flex items-center justify-center p-4">
            <div className="bg-gray-100 p-8 rounded-2xl w-full max-w-2xl shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff] overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Topic Name</h2>
                    <button
                        className="text-gray-600 hover:text-gray-800 bg-gray-100 rounded-full p-2 shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] transition-all duration-300"
                    >
                        <XIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="space-y-4">
                    {cards.map(card => (
                        <div key={card.id} className="bg-gray-100 p-4 rounded-xl shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff]">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-gray-800">{card.value1}</p>
                                    <p className="text-gray-600">{card.value2}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        className="p-2 bg-gray-100 text-gray-800 shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] transition-all duration-300"
                                    >
                                        <EditIcon className="h-4 w-4" />
                                    </button>
                                    <button
                                        className="p-2 bg-gray-100 text-red-500 shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] transition-all duration-300"
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}