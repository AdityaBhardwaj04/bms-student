import { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function StudentEditForm({ student, onClose, onSubmitSuccess }) {
    const [form, setForm] = useState(student || {});
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        setForm(student);
    }, [student]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const refDoc = doc(db, "students", student.id);
            let updatedData = { ...form };

            if (image) {
                setUploading(true);
                const storageRef = ref(storage, `students/${student.id}`);
                await uploadBytes(storageRef, image);
                const downloadURL = await getDownloadURL(storageRef);
                updatedData.photoUrl = downloadURL;
                setUploading(false);
            }

            await updateDoc(refDoc, updatedData);
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

            <div>
                <label className="block mb-1 font-medium">
                    Upload Student Image
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {form.photoUrl && (
                    <img
                        src={form.photoUrl}
                        alt="Current"
                        className="mt-2 w-24 h-24 object-cover rounded"
                    />
                )}
            </div>

            <button
                type="submit"
                disabled={uploading}
                className={`w-full px-4 py-2 text-white rounded ${
                    uploading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
                {uploading ? "Updating..." : "Update Student"}
            </button>
        </form>
    );
}
