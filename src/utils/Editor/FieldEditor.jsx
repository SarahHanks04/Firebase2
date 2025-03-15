// import React, { useState } from "react";
// import { PlusCircle, Trash2 } from "lucide-react";

// const FieldEditor = ({ fields, onSave }) => {
//   const [editingFields, setEditingFields] = useState(fields || []);
//   const [nextId, setNextId] = useState(() => {
//     const maxId = Math.max(...fields.map((f) => parseInt(f.id, 10) || 0), 0);
//     return maxId + 1;
//   });

//   const addField = () => {
//     setEditingFields([
//       ...editingFields,
//       {
//         id: nextId.toString(),
//         label: "",
//         type: "text",
//         placeholder: "Enter your answer",
//         required: true,
//         options: [],
//         maxRating: 5,
//         ratingValue: 0,
//       },
//     ]);
//     setNextId((prevId) => prevId + 1);
//   };

//   const deleteField = (id) => {
//     setEditingFields(editingFields.filter((field) => field.id !== id));
//   };

//   const updateField = (id, key, value) => {
//     setEditingFields(
//       editingFields.map((field) =>
//         field.id === id ? { ...field, [key]: value } : field
//       )
//     );
//   };

//   const handleSave = () => {
//     onSave(editingFields);
//   };

//   return (
//     <section className="max-w-4xl bg-bulb-lightBlue dark:bg-bulb-blue mx-auto p-6 shadow-lg rounded-lg text-[var(--text)] border border-[var(--border)]">
//       <h2 className="text-xl md:text-xl font-semibold mb-4">Fields</h2>

//       <div className="space-y-6">
//         {editingFields.map((field, index) => (
//           <div
//             key={field.id}
//             className="border p-4 rounded-lg shadow-md bg-[var(--background)] text-[var(--text)] border-[var(--border)]"
//           >
//             <div className="w-full">
//               {/* Align index and input */}
//               <div className="flex items-start mb-3">
//                 <span className="font-bold mr-2 mt-2">{index + 1}.</span>
//                 <div className="flex-grow">
//                   <input
//                     type="text"
//                     value={field.label}
//                     onChange={(e) =>
//                       updateField(field.id, "label", e.target.value)
//                     }
//                     placeholder="Enter your text"
//                     className="border focus:outline-none focus:ring-[var(--accent)] rounded-lg p-2 w-full bg-[var(--background)] text-[var(--text)] border-gray-300"
//                   />
//                 </div>
//               </div>

//               {/* Select input */}
//               <div className="flex items-start mb-2 ml-5">
//                 <select
//                   value={field.type}
//                   onChange={(e) =>
//                     updateField(field.id, "type", e.target.value)
//                   }
//                   className="border focus:ring-[var(--accent)] rounded-lg p-2 w-full bg-[var(--background)] text-[var(--text)] border-gray-300"
//                 >
//                   <option value="text">Text</option>
//                   <option value="number">Number</option>
//                   <option value="email">Email</option>
//                   <option value="tel">Tel</option>
//                   <option value="radio">Radio</option>
//                   <option value="checkbox">Checkbox</option>
//                   <option value="rating">Rating</option>
//                   <option value="dropdown">Select</option>
//                   <option value="textarea">Textarea</option>
//                 </select>
//               </div>

//               {/* Input fields (text, email, number, tel) */}
//               {["text", "email", "number", "tel"].includes(field.type) && (
//                 <div className="flex items-start mb-2 ml-5">
//                   <input
//                     type={
//                       field.type === "email"
//                         ? "email"
//                         : field.type === "tel"
//                         ? "tel"
//                         : field.type
//                     }
//                     value={field.placeholder}
//                     onChange={(e) =>
//                       updateField(field.id, "placeholder", e.target.value)
//                     }
//                     placeholder="Enter your answer"
//                     className="border focus:outline-none focus:ring-[var(--accent)] rounded-lg p-2 w-full bg-[var(--background)] text-[var(--text)] border-gray-300"
//                   />
//                 </div>
//               )}

//               {/* Textarea with "Enter your answer" placeholder */}
//               {field.type === "textarea" && (
//                 <div className="flex items-start mb-2 ml-5">
//                   <textarea
//                     value={field.placeholder}
//                     onChange={(e) =>
//                       updateField(field.id, "placeholder", e.target.value)
//                     }
//                     placeholder="Enter your answer"
//                     className="border focus:outline-none focus:ring-[var(--accent)] rounded-lg p-2 w-full bg-[var(--background)] text-[var(--text)] border-gray-300"
//                   />
//                 </div>
//               )}

//               {/* Textarea with "Enter options separated by commas" placeholder */}
//               {(field.type === "radio" ||
//                 field.type === "checkbox" ||
//                 field.type === "dropdown") && (
//                 <div className="flex items-start mb-2 ml-5">
//                   <textarea
//                     value={field.options?.join(",") || ""}
//                     onChange={(e) =>
//                       updateField(
//                         field.id,
//                         "options",
//                         e.target.value.split(",")
//                       )
//                     }
//                     rows={2}
//                     placeholder="Enter options separated by commas"
//                     className="border focus:outline-none focus:ring-[var(--accent)] rounded-lg p-2 w-full bg-[var(--background)] text-[var(--text)] border-gray-300"
//                   />
//                 </div>
//               )}

//               {/* "Required" toggle and trash icon */}
//               <div className="flex items-center justify-between mt-2 ml-4">
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={field.required}
//                     onChange={(e) =>
//                       updateField(field.id, "required", e.target.checked)
//                     }
//                     className="mr-2"
//                   />
//                   <label>Required</label>
//                 </div>

//                 <button
//                   onClick={() => deleteField(field.id)}
//                   className="text-red-500 transition"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-between gap-6 mt-6 dark:text-bulb-white">
//         <button
//           onClick={addField}
//           className="flex items-center justify-center gap-2 bg-bulb-blue dark:bg-bulb-yellow text-white px-4 py-2 rounded-[8px] shadow-md transition w-full md:w-auto"
//         >
//           <PlusCircle className="w-5 h-5" />
//           Add
//         </button>
//         <button
//           onClick={handleSave}
//           className="bg-bulb-yellow dark:bg-bulb-success text-white px-4 py-2 rounded-[8px] shadow-md transition w-full md:w-auto"
//         >
//           Update
//         </button>
//       </div>
//     </section>
//   );
// };

// export default FieldEditor;



// WITH FIREBASE
import React, { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";


const FieldEditor = ({ formId, fields, onSave }) => {
  const [editingFields, setEditingFields] = useState(fields || []);
  const [nextId, setNextId] = useState(() => {
    const maxId = Math.max(...fields.map((f) => parseInt(f.id, 10) || 0), 0);
    return maxId + 1;
  });

  const maxId = Math.max(...(fields ?? []).map((f) => parseInt(f.id, 10) || 0), 0);


  const addField = () => {
    setEditingFields([
      ...editingFields,
      {
        id: nextId.toString(),
        label: "",
        type: "text",
        placeholder: "Enter your answer",
        required: true,
        options: [],
        maxRating: 5,
        ratingValue: 0,
      },
    ]);
    setNextId((prevId) => prevId + 1);
  };

  const deleteField = (id) => {
    setEditingFields(editingFields.filter((field) => field.id !== id));
  };

  const updateField = (id, key, value) => {
    setEditingFields(
      editingFields.map((field) =>
        field.id === id ? { ...field, [key]: value } : field
      )
    );
  };

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, "formEvents", formId), {
        fields: editingFields,
      });
      onSave(editingFields);
      alert("Fields updated successfully!");
    } catch (error) {
      console.error("Error updating fields:", error);
      alert("Failed to update fields. Please try again.");
    }
  };

  return (
    <section className="max-w-4xl bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Fields</h2>

      <div className="space-y-6">
        {editingFields.map((field, index) => (
          <div key={field.id} className="border p-4 rounded-lg shadow-md">
            <div className="flex items-start mb-3">
              <span className="font-bold mr-2 mt-2">{index + 1}.</span>
              <input
                type="text"
                value={field.label}
                onChange={(e) => updateField(field.id, "label", e.target.value)}
                placeholder="Enter your text"
                className="border p-2 w-full rounded-lg"
              />
            </div>

            <div className="flex items-start mb-2">
              <select
                value={field.type}
                onChange={(e) => updateField(field.id, "type", e.target.value)}
                className="border p-2 w-full rounded-lg"
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="email">Email</option>
                <option value="tel">Tel</option>
                <option value="radio">Radio</option>
                <option value="checkbox">Checkbox</option>
                <option value="rating">Rating</option>
                <option value="dropdown">Select</option>
                <option value="textarea">Textarea</option>
              </select>
            </div>

            {(field.type === "radio" || field.type === "checkbox" || field.type === "dropdown") && (
              <div className="flex items-start mb-2">
                <textarea
                  value={field.options?.join(",") || ""}
                  onChange={(e) => updateField(field.id, "options", e.target.value.split(","))}
                  rows={2}
                  placeholder="Enter options separated by commas"
                  className="border p-2 w-full rounded-lg"
                />
              </div>
            )}

            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) => updateField(field.id, "required", e.target.checked)}
                  className="mr-2"
                />
                Required
              </label>
              <button onClick={() => deleteField(field.id)} className="text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between gap-6 mt-6">
        <button onClick={addField} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          <PlusCircle className="w-5 h-5" /> Add
        </button>
        <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-lg">
          Update
        </button>
      </div>
    </section>
  );
};

export default FieldEditor;
