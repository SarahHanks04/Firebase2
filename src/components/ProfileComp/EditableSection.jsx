import React from "react";
import { Formik, Field } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
  setEditing,
  saveProfileToBackend,
  updatePersonalInfo,
} from "../../redux/Slices/ProfileSlice";
import EditWhite from "../../assets/Icons/EditWhite.svg";
import "../../styles/EditSection.css";

const EditableSection = ({ section, title, fields }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.profile[section]);
  const isEditing = useSelector((state) => state.profile.editing[section]);

  const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = data?.[field.name] || "";
    return acc;
  }, {});

  const handleSave = async (values) => {
    try {
      if (section === "personalInfo") {
        dispatch(updatePersonalInfo(values));
      }
      await dispatch(saveProfileToBackend({ [section]: values })).unwrap();
      dispatch(setEditing({ section, isEditing: false }));
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  return (
    <section className="p-10 rounded shadow border-[1px] border-gray-300 bg-bulb-white">
      <header className="flex justify-between items-center mb-[3.5rem]">
        <h2 className="font-semibold text-[24px] text-[#000000]">{title}</h2>

        <button
          className="text-[#4A4848] bg-bulb-white border-[1.5px] border-gray-300 flex items-center px-[6px] py-1 rounded gap-[4px]"
          onClick={() =>
            dispatch(setEditing({ section, isEditing: !isEditing }))
          }
        >
          <span>{isEditing ? "Cancel" : "Edit"}</span>
          <img src={EditWhite} alt="EditIcon" className="edit-icon" />
        </button>
      </header>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSave}
        enableReinitialize={true}
      >
        {({ handleSubmit, dirty }) => (
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="grid grid-cols-2 gap-4">
              {fields.map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="text-[#000000] text-[18px] font-medium">
                    {field.label}
                  </label>
                  <Field
                    name={field.name}
                    type={field.type || "text"}
                    disabled={!isEditing}
                    className="border p-2 rounded w-full text-[14px] text-[#4A4848] outline-none"
                  />
                </div>
              ))}
            </div>
            {isEditing && (
              <button
                type="submit"
                disabled={!dirty}
                className={`text-white text-[13px] px-[12px] py-[6px] rounded ${
                  dirty ? "bg-[#B5835E]" : "bg-[#B5835E]/50 cursor-not-allowed"
                }`}
              >
                Save Changes
              </button>
            )}
          </form>
        )}
      </Formik>
    </section>
  );
};

export default EditableSection;
