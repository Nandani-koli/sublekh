'use client';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import PreviewForm from './PreviewForm'; // Import the Preview component
import Select from 'react-select'; // For multi-select

const defaultValues = {
  domainName: '',
  logo: '',
  heading: '',
  message: '',
  questions: [
    { id: 1, question: 'What is your favorite color?' },
    { id: 2, question: 'Where are you from?' },
  ],
  extraInfo: ['name'], // Mandatory field
};

const options = [
  { value: 'name', label: 'Name', isDisabled: true }, // Always selected
  { value: 'email', label: 'Email' },
  { value: 'social', label: 'Social Link' },
  { value: 'number', label: 'Phone Number' },
];

const EditSpaceForm = ({ spaceId = null, defaultData = null }) => {
  const [previewData, setPreviewData] = useState(defaultValues);
  const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: defaultData || defaultValues,
  });

  // Watch fields to update the preview live
  const watchFields = watch();

  // Logo Preview State
  const [logoPreview, setLogoPreview] = useState(defaultData?.logo || '');

  useEffect(() => {
    setPreviewData(watchFields); // Update preview on field changes
  }, [watchFields]);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target.result); // Preview the image
        setValue('logo', e.target.result); // Update form value
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    if (spaceId) {
      // Handle edit space logic
    } else {
      // Handle create space logic
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Preview Section */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-black mb-4">Preview Space</h2> {/* Heading for Preview Section */}
        <PreviewForm data={previewData} logoPreview={logoPreview} />
      </div>

      {/* Form Section */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-black mb-4">Edit Space</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Domain Name */}
          <div className="mb-4">
            <label className="block text-black font-medium">Domain Name</label>
            <input
              {...register('domainName', { required: 'Domain name is required' })}
              type="text"
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg text-black"
            />
            {errors.domainName && <p className="text-red-500 text-sm">{errors.domainName.message}</p>}
          </div>

          {/* Logo Upload */}
          <div className="mb-4">
            <label className="block text-black font-medium">Logo</label>
            <input type="file" className="mt-2 text-black" onChange={handleLogoChange} />
            {logoPreview && (
              <div className="mt-2">
                <img src={logoPreview} alt="Logo Preview" className="w-24 h-24 object-cover rounded-md" />
              </div>
            )}
          </div>

          {/* Heading */}
          <div className="mb-4">
            <label className="block text-black font-medium">Heading</label>
            <input
              {...register('heading', { required: 'Heading is required' })}
              type="text"
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg text-black"
            />
            {errors.heading && <p className="text-red-500 text-sm">{errors.heading.message}</p>}
          </div>

          {/* Message */}
          <div className="mb-4">
            <label className="block text-black font-medium">Message</label>
            <textarea
              {...register('message', { required: 'Message is required' })}
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg text-black"
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
          </div>

          {/* Questions */}
          <div className="mb-4">
            <label className="block text-black font-medium">Questions</label>
            {watchFields.questions.map((q, index) => (
              <input
                key={index}
                {...register(`questions.${index}.question`)}
                type="text"
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg text-black"
              />
            ))}
          </div>

          {/* Collect Extra Info */}
          <div className="mb-4">
            <label className="block text-black font-medium">Collect Extra Info</label>
            <Controller
              name="extraInfo"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={options}
                  isMulti
                  isClearable={false}
                  className="mt-2 text-black"
                />
              )}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            {spaceId ? 'Update Space' : 'Create Space'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSpaceForm;