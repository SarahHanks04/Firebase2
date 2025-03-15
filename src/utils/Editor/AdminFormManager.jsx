// import React, { useState } from "react";
// import { useQueryClient } from "@tanstack/react-query";
// import {
//   useFetchFormEvents,
//   useMutateFormEvent,
//   useDeleteFormEvent,
// } from "@/api/ResponseApi";
// import { toast, ToastContainer } from "react-toastify";
// import FieldEditor from "./FieldEditor";
// import { Trash, Plus } from "lucide-react";
// import Spinner from "../Spinner/Spinner";

// const AdminFormManager = () => {
//   const queryClient = useQueryClient();
//   const { data: forms, isLoading, error } = useFetchFormEvents();
//   const { mutate: saveForm } = useMutateFormEvent();
//   const { mutate: deleteForm } = useDeleteFormEvent();

//   const [selectedForm, setSelectedForm] = useState(null);
//   const [isCreatingForm, setIsCreatingForm] = useState(false);
//   const [newFormType, setNewFormType] = useState("");
//   const [newFormTitle, setNewFormTitle] = useState("");

//   const handleFormSelect = (form) => {
//     setSelectedForm(form);
//   };

//   const handleSaveForm = (updatedFields) => {
//     if (!selectedForm) return;

//     const updatedForm = {
//       ...selectedForm,
//       fields: updatedFields,
//     };

//     saveForm(
//       { id: selectedForm.id, data: updatedForm },
//       {
//         onSuccess: () => {
//           toast.success("Form updated successfully!", {
//             position: "top-center",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//           });
//           queryClient.invalidateQueries(["formEvents"]);
//         },
//         onError: () => {
//           toast.error("Failed to update the form. Please try again.");
//         },
//       }
//     );
//   };

//   const handleDeleteForm = (id) => {
//     if (window.confirm("Are you sure you want to delete this form?")) {
//       deleteForm(id, {
//         onSuccess: () => {
//           toast.success("Form deleted successfully!");
//           setSelectedForm(null);
//         },
//         onError: () => {
//           toast.error("Failed to delete the form. Please try again.");
//         },
//       });
//     }
//   };

//   const generateFourDigitId = () => {
//     return Math.floor(1000 + Math.random() * 9000).toString();
//   };

//   const handleCreateForm = () => {
//     if (!newFormType.trim() || !newFormTitle.trim()) {
//       toast.error("Form type and title cannot be empty.");
//       return;
//     }

//     const newForm = {
//       id: generateFourDigitId(),
//       formId: generateFourDigitId(),
//       formType: newFormType,
//       title: newFormTitle,
//       eventDate: new Date().toISOString(),
//       fields: [],
//     };

//     saveForm(
//       { data: newForm },
//       {
//         onSuccess: () => {
//           toast.success("Form created successfully!");
//           setIsCreatingForm(false);
//           setNewFormType("");
//           setNewFormTitle("");
//           queryClient.invalidateQueries(["formEvents"]);
//         },
//         onError: () => {
//           toast.error("Failed to create the form. Please try again.");
//         },
//       }
//     );
//   };

//   if (isLoading)
//     return (
//       <div className="p-4 text-center">
//         <Spinner />
//       </div>
//     );
//   if (error)
//     return (
//       <div className="p-4 text-center text-red-500">Error loading forms.</div>
//     );

//   return (
//     <div className="h-full bg-bulb-lightBlue px-4 mt-[1.6rem] pt-4 lg:mt-[0rem] md:p-6 lg:pl-10 ml-0 lg:ml-[12rem] sm:ml-0 pb-4">
//       <div className="flex justify-center items-center mb-6">
//         <h1 className="text-2xl font-bold  pt-3">Admin Form Management</h1>
//       </div>

//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Form List */}
//         <div className="w-full md:w-1/4">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">Forms</h2>
//             <button
//               onClick={() => setIsCreatingForm(true)}
//               className="p-2 bg-bulb-yellow text-bulb-white rounded-lg hover:bg-bulb-yellow-dark"
//             >
//               <Plus size={16} />
//             </button>
//           </div>
//           <ul className="space-y-2">
//             {forms.map((form) => (
//               <li
//                 key={form.id}
//                 className={`p-2 cursor-pointer rounded-lg transition-colors ${
//                   selectedForm?.id === form.id
//                     ? "bg-bulb-yellow text-bulb-white"
//                     : "bg-gray-200 hover:bg-gray-300"
//                 }`}
//                 onClick={() => handleFormSelect(form)}
//               >
//                 <div className="flex items-center justify-between">
//                   <span>{form.formType}</span>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleDeleteForm(form.id);
//                     }}
//                     className="text-red-500 text-sm hover:text-red-700"
//                   >
//                     <Trash size={12} />
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Form Editor */}
//         <div className="w-full md:w-3/4">
//           {selectedForm ? (
//             <>
//               <h2 className="text-xl flex justify-center items-center font-semibold mb-4">
//                 Editing: {selectedForm.formType}
//               </h2>
//               <FieldEditor
//                 key={selectedForm.id}
//                 fields={selectedForm.fields}
//                 onSave={handleSaveForm}
//               />
//             </>
//           ) : (
//             <div className="text-gray-500 text-sm">Select a form to edit.</div>
//           )}
//         </div>
//       </div>

//       {/* Create New Form Modal */}
//       {isCreatingForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-bulb-white p-6 rounded-lg">
//             <h2 className="text-xl font-semibold mb-4">Create New Form</h2>
//             <input
//               type="text"
//               placeholder="Form Type"
//               value={newFormType}
//               onChange={(e) => setNewFormType(e.target.value)}
//               className="w-full p-2 border rounded-lg mb-4"
//             />
//             <input
//               type="text"
//               placeholder="Form Title"
//               value={newFormTitle}
//               onChange={(e) => setNewFormTitle(e.target.value)}
//               className="w-full p-2 border rounded-lg mb-4"
//             />
//             <div className="flex justify-end space-x-4">
//               <button
//                 onClick={() => setIsCreatingForm(false)}
//                 className="p-2 bg-gray-300 rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleCreateForm}
//                 className="p-2 bg-bulb-yellow text-bulb-white rounded-lg"
//               >
//                 Create
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <ToastContainer />
//     </div>
//   );
// };

// export default AdminFormManager;


// WITH FIREBASE
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useFetchFormEvents,
  useMutateFormEvent,
  useDeleteFormEvent,
} from "@/api/ResponseApi";
import { toast, ToastContainer } from "react-toastify";
import FieldEditor from "./FieldEditor";
import { Trash, Plus } from "lucide-react";
import Spinner from "../Spinner/Spinner";

const AdminFormManager = () => {
  const queryClient = useQueryClient();
  const { data: forms, isLoading, error } = useFetchFormEvents();
  const { mutate: saveForm } = useMutateFormEvent();
  const { mutate: deleteForm } = useDeleteFormEvent();

  const [selectedForm, setSelectedForm] = useState(null);
  const [newForm, setNewForm] = useState({ formType: "", title: "" });

  const handleFormSelect = (form) => setSelectedForm(form);

  const handleSaveForm = (updatedFields) => {
    if (!selectedForm) return;

    const updatedForm = { ...selectedForm, fields: updatedFields };
    saveForm(
      { id: selectedForm.id, data: updatedForm },
      {
        onSuccess: () => {
          toast.success("Form updated successfully!");
          queryClient.invalidateQueries(["formEvents"]);
        },
        onError: () => toast.error("Failed to update the form.")
      }
    );
  };

  const handleDeleteForm = (id) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      deleteForm(id, {
        onSuccess: () => {
          toast.success("Form deleted successfully!");
          setSelectedForm(null);
        },
        onError: () => toast.error("Failed to delete the form.")
      });
    }
  };

  const handleCreateForm = () => {
    if (!newForm.formType.trim() || !newForm.title.trim()) {
      toast.error("Form type and title cannot be empty.");
      return;
    }

    const newFormData = {
      id: Date.now().toString(),
      formType: newForm.formType,
      title: newForm.title,
      eventDate: new Date().toISOString(),
      fields: []
    };

    saveForm(
      { data: newFormData },
      {
        onSuccess: () => {
          toast.success("Form created successfully!");
          setNewForm({ formType: "", title: "" });
          queryClient.invalidateQueries(["formEvents"]);
        },
        onError: () => toast.error("Failed to create the form.")
      }
    );
  };

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-500">Error loading forms.</p>;

  return (
    <div className="h-full bg-bulb-lightBlue px-4 mt-[1.6rem] pt-4 lg:mt-[0rem] md:p-6 lg:pl-10 ml-0 lg:ml-[12rem] sm:ml-0 pb-4">
      <h1 className="text-2xl font-bold mb-4">Admin Form Management</h1>

      {/* Create Form Section */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Form Type"
          value={newForm.formType}
          onChange={(e) => setNewForm({ ...newForm, formType: e.target.value })}
          className="p-2 border rounded-md mr-2"
        />
        <input
          type="text"
          placeholder="Form Title"
          value={newForm.title}
          onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
          className="p-2 border rounded-md mr-2"
        />
        <button onClick={handleCreateForm} className="p-2 bg-blue-500 text-white rounded-md">
          <Plus size={16} /> Create
        </button>
      </div>

      {/* Forms List */}
      <ul className="space-y-2">
        {forms.map((form) => (
          <li key={form.id} className="p-2 border rounded-md flex justify-between items-center">
            <span onClick={() => handleFormSelect(form)} className="cursor-pointer">
              {form.formType} - {form.title}
            </span>
            <button onClick={() => handleDeleteForm(form.id)} className="text-red-500">
              <Trash size={16} />
            </button>
          </li>
        ))}
      </ul>

      {/* Form Editor */}
      {selectedForm && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Editing: {selectedForm.formType}</h2>
          <FieldEditor key={selectedForm.id} fields={selectedForm.fields} onSave={handleSaveForm} />
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default AdminFormManager;
