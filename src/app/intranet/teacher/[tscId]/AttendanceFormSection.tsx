"use client";

import { upsertAttendance, deleteAttendance } from "../../actions/attendances";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

type Student = { id: string; name: string };
type Attendance = { id: number; student_id: string; date: string; status: string };

const STATUS_OPTIONS = [
  { value: "present", label: "Prezent" },
  { value: "absent", label: "Absent" },
  { value: "motivated", label: "Motivat" },
];

export default function AttendanceFormSection({
  tscId,
  students,
  attendances,
}: {
  tscId: number;
  students: Student[];
  attendances: Attendance[];
}) {
  async function handleUpsert(formData: FormData) {
    formData.set("teacher_subject_class_id", String(tscId));
    const result = await upsertAttendance(formData);
    if (result?.error) toast.error(result.error);
    else toast.success("Prezență salvată.");
  }

  async function handleDelete(id: number) {
    if (!confirm("Ștergi această prezență?")) return;
    const result = await deleteAttendance(id, tscId);
    if (result?.error) toast.error(result.error);
    else toast.success("Prezență ștearsă.");
  }

  const studentName = (id: string) =>
    students.find((s) => s.id === id)?.name ?? id;

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Prezențe / Absențe</h2>

      <form action={handleUpsert} className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 mb-6">
        <select name="student_id" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <option value="">— Selectează elevul —</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <div className="flex gap-2">
          <input name="date" type="date" required defaultValue={new Date().toISOString().slice(0, 10)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          <select name="status" required className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm">
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors">
          Salvează prezența
        </button>
      </form>

      <div className="space-y-2">
        {attendances.length === 0 ? (
          <p className="text-gray-400 text-sm">Nu există înregistrări.</p>
        ) : (
          attendances.map((a) => {
            const statusColor =
              a.status === "present"
                ? "bg-green-100 text-green-700"
                : a.status === "motivated"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700";
            const statusLabel =
              STATUS_OPTIONS.find((o) => o.value === a.status)?.label ?? a.status;
            return (
              <div key={a.id} className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-gray-800">{studentName(a.student_id)}</span>
                  <span className="ml-2 text-xs text-gray-400">{a.date}</span>
                  <span className={`ml-2 text-xs font-semibold px-2 py-0.5 rounded-full ${statusColor}`}>
                    {statusLabel}
                  </span>
                </div>
                <button onClick={() => handleDelete(a.id)} className="text-gray-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
