import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Car, Calendar, DollarSign, Users, Fuel, Gauge, Settings, Palette, Upload, X, Sparkles, Loader2, Image } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { callGetApis, callPostApis, callPutApis } from '../../api/api';

const CarForm = ({ initialData, onSubmit, isEditing = false }) => {
  const { register, handleSubmit, formState: { errors }, setValue, reset,getValues } = useForm({
    defaultValues: initialData || {
      make: '',
      model: '',
      year: new Date().getFullYear(),
      price: '',
      mileage: '',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      bodyType: 'SUV',
      color: '',
      seats: 4,
      description: '',
      postType: 'selling',
      status: 'available',
      featured: false,
      category: 'compact',
      images: [],
    }
  });
  // const formData = getValues()

  const [imagesPreview, setImagesPreview] = useState(initialData?.images || []);
  const [images,setImages] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiPreview, setAiPreview] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  //store updated car data
  const [updatedCar,setUpdatedCar] = useState(null);

  // user
  const {user} = useAuth();
  const {features} = user?.planDetails;
  const {aiDescriptionGenerator,selingpostpermunth} = features;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const updatedCarId = searchParams.get('updated-carId');
  

 
  

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImagesPreview([...imagesPreview, ...newImages]);
    setImages((prev) => [...prev, ...files]);    
  };

  const removeImage = (index) => {
    setImagesPreview(imagesPreview.filter((_, i) => i !== index));
  };

  const analyzeCarImage = async (imageFile) => {
    if (!imageFile) return;
    setIsLoading(true);
  
    const formData = new FormData();
    formData.append('carImage', imageFile);
    
    if(aiDescriptionGenerator <= 0 ){
      toast.error('Please upgrade to a pro plan to use AI features')
      setTimeout(()=>{
        navigate('/pricing');
      },1000)
      return;
    };
    setIsAnalyzing(true);
    setPreviewImage(URL.createObjectURL(imageFile));
    try {

   
       const response = await callPostApis(`/cars/generate-description`,formData);
       if (!response.carDetails) {
         throw new Error('Failed to get response from server');
       }
       
       if (response.success) {
        setAiPreview(response.carDetails);
        toast.success('Car details analyzed successfully!');
        setIsLoading(false);
       }else{
        toast.error(response.error);
        setIsLoading(false);
       }
       


      setAiPreview(response.carDetails);
      toast.success('Car details analyzed successfully!');
    } catch (error) {
      toast.error('Failed to analyze car image');
      setPreviewImage(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const applyAiDetails = () => {
    if (aiPreview) {
      Object.entries(aiPreview).forEach(([key, value]) => {
        if (key !== "images") {
          setValue(key, value);
        }
      });
      setAiPreview(null);
      setPreviewImage(null);
      toast.success("AI details applied to form!");
    }
  };

  const onSubmitForm = async (data) => {
    if (selingpostpermunth < 1) {
      toast.error("Please upgrade to a pro plan to use AI features");
      setTimeout(() => {
        navigate("/pricing");
      }, 1000);
      return;
    }

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append("seller", user?._id);

    images.forEach((image) => {
      formData.append("carimages", image);
    });

    try {
      setIsLoading(true);
      const response = await callPostApis("/cars", formData);

      if (response.success) {
        setIsLoading(false);
        toast.success(response.message);
        navigate('/seller-dashboard/car-lists');
      }
    } catch (error) {
      throw new Error(error);
    }

    // onSubmit(formData);
  };


  const handleGetUpdatedCar =async (id) =>{
    setIsLoading(true);
    try {
      const response =await callGetApis(`/car/${id}`);
      if(response){
          setIsLoading(false);
        setUpdatedCar(!updatedCar && response.data );
      }
      
    } catch (error) {
      throw new Error(error);
      throw error;
    }
  }


  const handleGetUpdatedCarDetails = async (id, data) => {
    try {
      const response = await callPutApis(`/cars?id=${id}`, data);
      if (response.success) {
        toast.success(response.message);
        navigate("/seller-dashboard/car-lists");
      }
    } catch (error) {
      
      throw error;
    }
  };
  

   useEffect(() => {
     if (updatedCarId) {
    handleGetUpdatedCar(updatedCarId)
  }
  

   },[updatedCarId])

  
  useEffect(() => {
    if(updatedCar){
      reset({
        make: updatedCar?.make ,
        model: updatedCar?.model,
        year: updatedCar?.year,
        fuelType: updatedCar?.fuelType,
        transmission: updatedCar?.transmission,
        bodyType: updatedCar?.bodyType,
        price: updatedCar?.price,
        mileage: updatedCar?.mileage,
        seats: updatedCar?.seats,
        color: updatedCar?.color,
        category: updatedCar?.category,
        postType: updatedCar?.postType,
        description : updatedCar?.description
      });

      
      
    }
  },[reset,updatedCar])
   
  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="max-w-7xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      {/* AI Car Analysis Section */}
      <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-800">AI Car Analysis</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <p className="text-gray-600">
              Upload a clear image of your car to automatically fill in the details. Our AI will analyze the image and suggest the car's specifications.
            </p>
            
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    analyzeCarImage(file);
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {previewImage ? (
                <div className="relative w-full h-64 rounded-lg overflow-hidden group">
                  <img
                    src={previewImage}
                    alt="Car preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewImage(null);
                        setAiPreview(null);
                      }}
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-200"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-64 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200">
                  {isLoading ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-2" />
                      <p className="text-sm text-blue-600">Analyzing image...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                     
                    
                        <Image className="w-12 h-12 text-blue-600 mb-2" />
                        <p className="text-sm text-blue-600">Click to upload car image</p>
                        <p className="text-xs text-blue-500 mt-1">or drag and drop</p>
                     
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {aiPreview && (
            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
              <h4 className="font-medium text-gray-800 mb-3">AI Analysis Results</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Make/Model:</span> {aiPreview.make} {aiPreview.model}</p>
                <p><span className="font-medium">Year:</span> {aiPreview.year}</p>
                <p><span className="font-medium">Color:</span> {aiPreview.color}</p>
                <p><span className="font-medium">Body Type:</span> {aiPreview.bodyType}</p>
                <p><span className="font-medium">Estimated Price:</span> ${aiPreview.estimatedPrice}</p>
                <p><span className="font-medium">Estimated Mileage:</span> {aiPreview.estimatedMileage} km</p>
                <p><span className="font-medium">Fuel Type:</span> {aiPreview.fuelType}</p>
                <p><span className="font-medium">Transmission:</span> {aiPreview.transmission}</p>
                <p><span className="font-medium">Seats:</span> {aiPreview.seats}</p>
                <p><span className="font-medium">Description:</span> {aiPreview.description.slice(0, 30)}...</p>
                <p><span className="font-medium">Price:</span> ${aiPreview.price}</p>
                <p><span className="font-medium">Mileage:</span> {aiPreview.mileage} km</p>
                <p><span className="font-medium">Category:</span> {aiPreview.category}</p>
              </div>
              <button
                type="button"
                onClick={applyAiDetails}
                className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Apply AI Details
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-800 mb-6">
            <Car className="w-6 h-6 text-blue-600" /> Basic Information
          </h3>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
              <input
                type="text"
                {...register('make', { required: 'Make is required' })}
                defaultValue={updatedCar?.make}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter car make"
              />
              {errors.make && <p className="mt-1.5 text-sm text-red-600">{errors.make.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
              <input
                type="text"
                {...register('model', { required: 'Model is required' })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter car model"
              />
              {errors.model && <p className="mt-1.5 text-sm text-red-600">{errors.model.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <input
                type="number"
                {...register('year', { 
                  required: 'Year is required',
                  min: { value: 1900, message: 'Year must be after 1900' },
                  max: { value: new Date().getFullYear(), message: 'Year cannot be in the future' }
                })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter year"
              />
              {errors.year && <p className="mt-1.5 text-sm text-red-600">{errors.year.message}</p>}
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-800 mb-6">
            <Settings className="w-6 h-6 text-blue-600" /> Specifications
          </h3>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
              <input
                type="text"
                {...register('fuelType', { required: 'Fuel type is required' })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter fuel type"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
              <select
                {...register('transmission', { required: 'Transmission is required' })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Body Type</label>
              <input
                type="text"
                {...register('bodyType', { required: 'Body type is required' })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter body type"
              />
            </div>
          </div>
        </div>

        {/* Pricing and Details */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-800 mb-6">
            <DollarSign className="w-6 h-6 text-blue-600" /> Pricing & Details
          </h3>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  {...register('price', { 
                    required: 'Price is required',
                    min: { value: 0, message: 'Price must be positive' }
                  })}
                  className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter price"
                />
              </div>
              {errors.price && <p className="mt-1.5 text-sm text-red-600">{errors.price.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mileage</label>
              <div className="relative">
                <input
                  type="number"
                  {...register('mileage', { 
                    required: 'Mileage is required',
                    min: { value: 0, message: 'Mileage must be positive' }
                  })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter mileage"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">km</span>
              </div>
              {errors.mileage && <p className="mt-1.5 text-sm text-red-600">{errors.mileage.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Seats</label>
              <input
                type="number"
                {...register('seats', { 
                  required: 'Number of seats is required',
                  min: { value: 1, message: 'Must have at least 1 seat' },
                  max: { value: 10, message: 'Cannot have more than 10 seats' }
                })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter number of seats"
              />
              {errors.seats && <p className="mt-1.5 text-sm text-red-600">{errors.seats.message}</p>}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-800 mb-6">
            <Palette className="w-6 h-6 text-blue-600" /> Additional Information
          </h3>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
              <input
                type="text"
                {...register('color', { required: 'Color is required' })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter car color"
              />
              {errors.color && <p className="mt-1.5 text-sm text-red-600">{errors.color.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  {...register('category', { required: 'Category is required' })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter car category"
                />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Post Type</label>
              <select
                {...register('postType', { required: 'Post type is required' })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="selling">Selling</option>
                <option value="booking">Booking</option>
              </select>
            </div>
           

<div className="bg-gray-50 p-6 rounded-xl shadow-sm">
  <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-800 mb-6">
    <DollarSign className="w-6 h-6 text-blue-600" /> Payment System
  </h3>
  

  <div className="space-y-5">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Select Payment System</label>
      <div className="flex gap-4">
        {['upfront', 'emi', 'full payment'].map((option) => (
          <label key={option} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              value={option}
              // checked={option === updatedCar.paymentsystem}
              {...register('paymentsystem', { required: 'At least one payment system is required' })}
              className="form-checkbox text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">{option}</span>
          </label>
        ))}
      </div>
      {errors.paymentsystem && <p className="mt-1.5 text-sm text-red-600">{errors.paymentsystem.message}</p>}
    </div>
  </div>
</div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-8 bg-gray-50 p-6 rounded-xl shadow-sm">
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          {...register('description', { required: 'Description is required' })}
          rows="4"
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="Enter car description"
        />
        {errors.description && <p className="mt-1.5 text-sm text-red-600">{errors.description.message}</p>}
      </div>

      {/* Images */}
      {updatedCar ? <></> : <div className="mt-8 bg-gray-50 p-6 rounded-xl shadow-sm">
        <label className="block text-sm font-medium text-gray-700 mb-4">Images</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {imagesPreview.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Car image ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg shadow-sm"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors duration-200">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Click to upload</p>
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </label>
        </div>
      </div>} 

      {/* Submit Button */}
      <div className="mt-8 flex justify-end">
        {updatedCar ? <>
          <button
          type="button"
          onClick={() => handleGetUpdatedCarDetails(updatedCarId,getValues())}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg shadow-blue-500/20"
        >
          {isLoading ? <Loader2 className='animate-spin'/> : "Update Car"}
        </button>
        </> : <>
        <button
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg shadow-blue-500/20"
        >
          {isLoading ? <Loader2 className='animate-spin'/> : 'Add Car'}
        </button>
        </>}
      </div>
    </form>
  );
};

export default CarForm; 