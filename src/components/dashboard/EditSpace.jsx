'use client';
import { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import PreviewForm from './PreviewForm'; // Import the Preview component
import Select from 'react-select'; // For multi-select
import { useSession } from 'next-auth/react';
import { createOrUpdateSpace, getAllSpaces } from '@/lib/actions';
import { useRouter } from 'next/navigation';

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

const EditSpaceForm = ({userid=null, spaceId = null, defaultData = null }) => {

  const { data: session, status } = useSession();
  const router = useRouter();


  const [previewData, setPreviewData] = useState(defaultValues);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure we only run on client side after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { register, control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
    defaultValues: defaultData || defaultValues,
  });

  // Initialize form with defaultData when component mounts
  useEffect(() => {
    if (isClient && defaultData) {
      reset(defaultData);
      setPreviewData(defaultData);
    }
  }, [isClient, defaultData, reset]);

  const watchFields = watch();

  // Logo Preview State
  const [logoPreview, setLogoPreview] = useState(defaultData?.logo || '');

  // useEffect(() => {
  //   setPreviewData(watchFields); 
  // }, [watchFields]);

  const handleLogoChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target.result);
        setValue('logo', e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, [selectedFile, setValue]);

  const onSubmit = async(data) => {
    console.log('Form submitted:', data);
    if(data.domainName =='app' || data.domainName =='sublekh'){
      alert('Domain name cannot be app or sublekh')
      return;
    }
    if (spaceId) {
      // Handle edit space logic
    } else {
      // Handle create space logic
      const result = await  createOrUpdateSpace(data, session?.user?._id);
      console.log(result,'asdasd')
      if (result.success) {
        alert(result.message);
        router.push('/')
      }else{
        alert(result.message);
      }


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
        <form onSubmit={handleSubmit(onSubmit)} onChange={() => setPreviewData(watch())}>
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
              render={({ field }) => {
                const selectedOptions = options.filter(option => 
                  field.value.includes(option.value)
                );

                return (
                <Select
                  {...field}
                  options={options}
                  instanceId={'new'}
                  isMulti
                  isClearable={false}
                  className="mt-2 text-black"
                  value={selectedOptions}
                  onChange={(selectedOptions) => {
                    const values = selectedOptions.map(option => option.value);
                    field.onChange(values);
                  }}
                />
              )
            }}
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
