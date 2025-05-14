import { Dialog } from "@headlessui/react";
import { Fragment } from "react";
import StudentForm from "./StudentForm";

export default function StudentModal({ isOpen, onClose, onSubmitSuccess }) {
    return (
        <Dialog
            as="div"
            className="relative z-10"
            open={isOpen}
            onClose={onClose}
        >
            <div
                className="fixed inset-0 bg-black bg-opacity-25"
                aria-hidden="true"
            />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
                    <div className="flex justify-between items-center mb-4">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                            Add New Student
                        </Dialog.Title>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 text-sm"
                        >
                            ✕
                        </button>
                    </div>
                    <StudentForm onSubmitSuccess={onSubmitSuccess} onClose={onClose}/>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}
