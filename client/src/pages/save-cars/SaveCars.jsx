import { useState, useEffect, useRef, useCallback, use } from 'react';
import { Fuel, Cog, Route, Calendar, MapPin, Trash2, Eye, Car, Search, Heart, Star, Phone, Mail, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { callGetApis } from '../../api/api';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

// Separate data fetching logic


const SaveCars = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [cars, setCars] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();
    const {user} = useAuth();
    
  


    const {data: savedCars=[], isLoading} = useQuery({
        queryKey: ['savedCars', user._id],
        queryFn: async () =>{
             const res = await callGetApis(`/saved-cars/${user._id}`);
             return res.savedCars
        }
    });

     console.log(savedCars);
    // Filter cars based on search query
    const filteredCars = cars.filter(car => 
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header Section */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden"
            >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
                        alt="Luxury Cars Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40"></div>
                </div>

                <div className="relative container mx-auto px-4 py-20">
                    <div className="text-center mb-12">
                        <motion.div 
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center justify-center gap-3 mb-6"
                        >
                            <Car className="w-10 h-10 text-blue-400" />
                            <h1 className="text-5xl font-bold text-white">
                                Your Saved Cars
                            </h1>
                        </motion.div>
                        
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-200 max-w-2xl mx-auto text-lg"
                        >
                            <Heart className="w-6 h-6 inline-block mr-2 text-red-400" />
                            Easily revisit your favorite cars. Compare, book, or buy them when you're ready.
                        </motion.p>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-4xl mx-auto"
                    >
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search saved cars..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            />
                        </div>
                        
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-8 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-xl hover:bg-white/20 transition-colors"
                        >
                            <Trash2 className="w-5 h-5" />
                            Clear All
                        </motion.button>
                    </motion.div>
                </div>
            </motion.div>

            {/* Cars Grid Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="space-y-6">
                    {savedCars.map((car, index) => (
                        <div key={index}>
                          
                        </div>
                    ))}
                </div>

                {/* Loading Indicator */}
                {loading && (
                    <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SaveCars;