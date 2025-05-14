import { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export default function StudentForm({ onSubmitSuccess, onClose }) {
    const [form, setForm] = useState({
        name: "",
        class: "",
        section: "",
        roll: "",
        dob: "",
        age: "",
        fatherName: "",
        motherName: "",
        fatherMobile: "",
        motherMobile: "",
        enrolled: true,
        enrolmentDate: new Date().toISOString(),
    });

    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            // Check if student already exists
            const q = query(
                collection(db, "students"),
                where("name", "==", form.name),
                where("fatherName", "==", form.fatherName),
                where("motherName", "==", form.motherName)
            );

            const existing = await getDocs(q);
            if (!existing.empty) {
                alert("Student already exists with the same parent names.");
                setUploading(false);
                return;
            }

            // Upload image if selected
            let photoUrl = "";
            if (imageFile) {
                const imageRef = ref(storage, `students/${uuidv4()}`);
                await uploadBytes(imageRef, imageFile);
                photoUrl = await getDownloadURL(imageRef);
            }

            // Add to Firestore
            await addDoc(collection(db, "students"), {
                ...form,
                photoUrl,
            });

            alert("Student added successfully!");
            if (onSubmitSuccess) onSubmitSuccess();
            if (onClose) onClose();

            // Reset
            setForm({
                name: "",
                class: "",
                section: "",
                roll: "",
                dob: "",
                age: "",
                fatherName: "",
                motherName: "",
                fatherMobile: "",
                motherMobile: "",
                enrolled: true,
                enrolmentDate: new Date().toISOString(),
            });
            setImageFile(null);
        } catch (error) {
            alert("Error adding student: " + error.message);
        }

        setUploading(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow-md w-full max-w-2xl space-y-4"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                    name="name"
                    placeholder="Student Name"
                    value={form.name}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required
                />
                <input
                    name="class"
                    placeholder="Class"
                    value={form.class}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required
                />
                <input
                    name="section"
                    placeholder="Section"
                    value={form.section}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required
                />
                <input
                    name="roll"
                    placeholder="Roll No"
                    value={form.roll}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required
                />
                <input
                    name="dob"
                    type="date"
                    value={form.dob}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required
                />
                <input
                    name="age"
                    type="number"
                    placeholder="Age"
                    value={form.age}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required
                />
                <input
                    name="fatherName"
                    placeholder="Father's Name"
                    value={form.fatherName}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    name="motherName"
                    placeholder="Mother's Name"
                    value={form.motherName}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    name="fatherMobile"
                    placeholder="Father's Mobile"
                    value={form.fatherMobile}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    name="motherMobile"
                    placeholder="Mother's Mobile"
                    value={form.motherMobile}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Upload Student Picture
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        className="p-2 border rounded w-full"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={uploading}
                className="bg-green-600 text-white px-4 py-2 w-full rounded hover:bg-green-700"
            >
                {uploading ? "Uploading..." : "Add Student"}
            </button>
        </form>
    );
}
