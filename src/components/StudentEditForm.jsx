import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function StudentEditForm({ student, onClose, onSubmitSuccess }) {
    const [form, setForm] = useState(student || {});

    useEffect(() => {
        setForm(student);
    }, [student]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const ref = doc(db, "students", student.id);
            await updateDoc(ref, form);
            alert("Student updated successfully!");
            onSubmitSuccess?.();
            onClose?.();
        } catch (error) {
            alert("Error updating student: " + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                    className="p-2 border rounded"
                    name="name"
                    value={form.name || ""}
                    onChange={handleChange}
                    placeholder="Name"
                />
                <input
                    className="p-2 border rounded"
                    name="class"
                    value={form.class || ""}
                    onChange={handleChange}
                    placeholder="Class"
                />
                <input
                    className="p-2 border rounded"
                    name="section"
                    value={form.section || ""}
                    onChange={handleChange}
                    placeholder="Section"
                />
                <input
                    className="p-2 border rounded"
                    name="roll"
                    value={form.roll || ""}
                    onChange={handleChange}
                    placeholder="Roll No"
                />
                <input
                    className="p-2 border rounded"
                    name="dob"
                    type="date"
                    value={form.dob || ""}
                    onChange={handleChange}
                    placeholder="DOB"
                />
                <input
                    className="p-2 border rounded"
                    name="age"
                    type="number"
                    value={form.age || ""}
                    onChange={handleChange}
                    placeholder="Age"
                />
                <input
                    className="p-2 border rounded"
                    name="fatherName"
                    value={form.fatherName || ""}
                    onChange={handleChange}
                    placeholder="Father's Name"
                />
                <input
                    className="p-2 border rounded"
                    name="motherName"
                    value={form.motherName || ""}
                    onChange={handleChange}
                    placeholder="Mother's Name"
                />
                <input
                    className="p-2 border rounded"
                    name="fatherMobile"
                    value={form.fatherMobile || ""}
                    onChange={handleChange}
                    placeholder="Father's Mobile"
                />
                <input
                    className="p-2 border rounded"
                    name="motherMobile"
                    value={form.motherMobile || ""}
                    onChange={handleChange}
                    placeholder="Mother's Mobile"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700"
            >
                Update Student
            </button>
        </form>
    );
}
