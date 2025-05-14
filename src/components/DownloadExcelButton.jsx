import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export default function DownloadExcelButton({ data }) {
    const handleDownloadExcel = () => {
        if (!data || data.length === 0) {
            alert("No data to export.");
            return;
        }

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        const blob = new Blob([excelBuffer], {
            type: "application/octet-stream",
        });

        saveAs(blob, "student_data.xlsx");
    };

    return (
        <button
            onClick={handleDownloadExcel}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ml-2"
        >
            📥 Download Excel
        </button>
    );
}
