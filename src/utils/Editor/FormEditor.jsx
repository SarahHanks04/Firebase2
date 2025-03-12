// import React, { useEffect } from "react";
// import { useFetchFormById, useMutateFormEvent } from "@/api/ResponseApi";
// import { BASE_URL } from "@/api/api";
// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import FieldEditor from "./FieldEditor";
// import { useQueryClient } from "@tanstack/react-query";

// const FormEditor = () => {
//   const { id } = useParams();
//   const params = useParams();
//   console.log("All params:", params);
//   console.log("Fetching form with ID:", id);
//   console.log("Constructed URL:", `${BASE_URL}/formEvents/${id}`);
//   const { data: form, isLoading, isError } = useFetchFormById(id);
//   const { mutate: updateForm } = useMutateFormEvent();

//   if (isLoading) return <div>Loading form...</div>;
//   if (isError) return <div>Error loading form</div>;
//   if (!form) return <div>Form not found</div>;

// //   useEffect(() => {
// //     console.log("Form data:", form);
// //     console.log("Is loading:", isLoading);
// //     console.log("Is error:", isError);
// //   }, [form, isLoading, isError]);

//   const handleSaveFields = (updatedFields) => {
//     // Prepare the data to send back to the server
//     const updatedForm = {
//       ...form, // Keep other form properties unchanged
//       fields: updatedFields, // Update only the fields
//     };

//     updateForm(
//       { id, data: updatedForm },
//       {
//         onSuccess: () => {
//           toast.success("Form updated successfully!");
//           // Optionally, you might want to refresh the form data here if needed
//           useQueryClient().invalidateQueries(['form', id]);
//         },
//         onError: (error) => {
//           toast.error("Error updating form: " + error.message);
//         },
//       }
//     );
//   };

//   return (
//     <div>
//       <FieldEditor fields={form.fields} onSave={handleSaveFields} />

//     </div>
//   );
// };

// export default FormEditor;

import React from "react";
import { useFetchFormById, useMutateFormEvent } from "@/api/ResponseApi";
import { BASE_URL } from "@/api/api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FieldEditor from "./FieldEditor";
import { useQueryClient } from "@tanstack/react-query";

const FormEditor = () => {
  const { formId } = useParams();
  const params = useParams();
  console.log("All params:", params);
  console.log("Fetching form with formId:", formId);
  console.log("Constructed URL:", `${BASE_URL}/formEvents/${formId}`);

  const { data: form, isLoading, isError } = useFetchFormById(formId);

  const { mutate: updateForm } = useMutateFormEvent();

  if (isLoading) return <div><Spinner /></div>;
  if (isError) return <div>Error loading form</div>;
  if (!form) return <div>Form not found</div>;

  const handleSaveFields = (updatedFields) => {
    const updatedForm = {
      ...form,
      fields: updatedFields,
    };

    updateForm(
      { formId, data: updatedForm },
      {
        onSuccess: () => {
          toast.success("Form updated successfully!");
          const queryClient = useQueryClient();
          queryClient.invalidateQueries(["form", formId]);
        },
        onError: (error) => {
          toast.error("Error updating form: " + error.message);
        },
      }
    );
  };

  return (
    <div>
      <FieldEditor fields={form.fields} onSave={handleSaveFields} />
    </div>
  );
};

export default FormEditor;
