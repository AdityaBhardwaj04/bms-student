import { useEffect, useState, Fragment } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import StudentModal from "../components/StudentModal";
import StudentEditModal from "../components/StudentEditModal";
import DownloadExcelButton from "../components/DownloadExcelButton";
import LogoutButton from "../components/LogoutButton";

export default function Dashboard() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [expandedRow, setExpandedRow] = useState(null);

    const fetchStudents = async () => {
        const querySnapshot = await getDocs(collection(db, "students"));
        const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setStudents(data);
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const toggleEnrollment = async (student) => {
        const studentRef = doc(db, "students", student.id);
        await updateDoc(studentRef, { enrolled: !student.enrolled });
        fetchStudents();
    };

    const toggleRow = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">📋 Student Entry</h1>
                <button
                    onClick={() => {
                        setSelectedStudent(null);
                        setShowModal(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add New Student
                </button>

                <DownloadExcelButton data={students} />
                <LogoutButton />
            </div>

            <div className="overflow-x-auto bg-white shadow rounded">
                <table className="w-full text-sm text-left text-gray-700">
                    <thead className="bg-gray-200 text-xs uppercase">
                        <tr>
                            <th className="px-6 py-3"></th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Class</th>
                            <th className="px-6 py-3">Roll</th>
                            <th className="px-6 py-3">Enrolled</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <Fragment key={student.id}>
                                <tr className="border-b">
                                    <td className="px-6 py-2">
                                        <button
                                            onClick={() =>
                                                toggleRow(student.id)
                                            }
                                        >
                                            {expandedRow === student.id
                                                ? "▲"
                                                : "▼"}
                                        </button>
                                    </td>
                                    <td className="px-6 py-2">
                                        {student.name}
                                    </td>
                                    <td className="px-6 py-2">
                                        {student.class}
                                    </td>
                                    <td className="px-6 py-2">
                                        {student.roll}
                                    </td>
                                    <td className="px-6 py-2">
                                        <button
                                            onClick={() =>
                                                toggleEnrollment(student)
                                            }
                                            className={`px-2 py-1 text-xs rounded ${
                                                student.enrolled
                                                    ? "bg-green-500 text-white"
                                                    : "bg-red-500 text-white"
                                            }`}
                                        >
                                            {student.enrolled
                                                ? "Enrolled"
                                                : "Completed"}
                                        </button>
                                    </td>
                                    <td className="px-6 py-2">
                                        <button
                                            onClick={() => {
                                                setSelectedStudent(student);
                                                setEditModalOpen(true);
                                            }}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                                {expandedRow === student.id && (
                                    <tr className="bg-gray-50">
                                        <td colSpan="6" className="px-6 py-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <strong>Section:</strong>{" "}
                                                    {student.section}
                                                </div>
                                                <div>
                                                    <strong>DOB:</strong>{" "}
                                                    {student.dob}
                                                </div>
                                                <div>
                                                    <strong>Age:</strong>{" "}
                                                    {student.age}
                                                </div>
                                                <div>
                                                    <strong>
                                                        Father's Name:
                                                    </strong>{" "}
                                                    {student.fatherName}
                                                </div>
                                                <div>
                                                    <strong>
                                                        Mother's Name:
                                                    </strong>{" "}
                                                    {student.motherName}
                                                </div>
                                                <div>
                                                    <strong>
                                                        Father's Mobile:
                                                    </strong>{" "}
                                                    {student.fatherMobile}
                                                </div>
                                                <div>
                                                    <strong>
                                                        Mother's Mobile:
                                                    </strong>{" "}
                                                    {student.motherMobile}
                                                </div>
                                                {student.photoUrl && (
                                                    <div className="mt-2">
                                                        <img
                                                            src={
                                                                student.photoUrl
                                                            }
                                                            alt={`${student.name}'s pic`}
                                                            className="w-24 h-24 object-cover rounded"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <StudentModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onSubmitSuccess={fetchStudents}
                    defaultData={selectedStudent}
                />
            )}

            {editModalOpen && selectedStudent && (
                <StudentEditModal
                    isOpen={editModalOpen}
                    onClose={() => {
                        setEditModalOpen(false);
                        setSelectedStudent(null);
                    }}
                    student={selectedStudent}
                    onSubmitSuccess={fetchStudents}
                />
            )}
        </div>
    );
}
