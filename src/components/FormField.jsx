import React from "react";

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
  isGenerate,
  handleGenerate,
  isGenerating
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-[#ececf1] py-1 px-2 rounded-[5px] text-black"
          >
            Surprise Me
          </button>
        )}
      </div>
      <div className="flex">
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] online-none block w-full p-3"
        />
        {isGenerate && <button
            type="button"
            onClick={handleGenerate}
            className="font-semibold text-xs bg-[#ececf1] py-3 px-5 rounded-[5px] text-black"
          >
            {isGenerating ? "Generating" : "Generate"}
          </button>}
      </div>
    </div>
  );
};

export default FormField;
