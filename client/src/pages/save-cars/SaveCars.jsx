import { useState, useEffect, useRef, useCallback, use } from 'react';
import { Fuel, Cog, Route, Calendar, MapPin, Trash2, Eye, Car, Search, Heart, Star, Phone, Mail, User } from 'lucide-react';
import { motion } from 'framer-motion';

// Separate data fetching logic
const fetchCars = async (page) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return Array.from({ length: 5 }, (_, index) => ({
        id: ((page - 1) * 5) + index,
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3",
        name: `2022 Toyota Corolla XLE ${((page - 1) * 5) + index}`,
        price: 25000 + (index * 1000),
        location: "New York, NY",
        fuelType: "Petrol",
        transmission: "Automatic",
        mileage: "10,000",
        year: 2022,
        seller: {
            name: `John Smith ${((page - 1) * 5) + index}`,
            rating: 4.5 + (index * 0.1),
            reviews: 120 + (index * 10),
            phone: "+1 (555) 123-4567",
            email: `john.smith${((page - 1) * 5) + index}@example.com`,
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        }
    }));
};

const SaveCars = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [cars, setCars] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();

    // Load more cars using React 19 patterns
    const loadMoreCars = useCallback(async () => {
        if (loading || !hasMore) return;
        
        setLoading(true);
        try {
            const newCars = await fetchCars(page);
            setCars(prevCars => [...prevCars, ...newCars]);
            setPage(prevPage => prevPage + 1);
            
            // Stop loading more after 15 cars
            if (page >= 3) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error loading cars:', error);
        } finally {
            setLoading(false);
        }
    }, [page, loading, hasMore]);

    // Intersection Observer setup with React 19 patterns
    const lastCarElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                loadMoreCars();
            }
        }, {
            rootMargin: '100px' // Load more before reaching the end
        });
        
        if (node) observer.current.observe(node);
    }, [loading, hasMore, loadMoreCars]);

    // Initial load using React 19 patterns
    useEffect(() => {
        const initialLoad = async () => {
            setLoading(true);
            try {
                const initialCars = await fetchCars(1);
                setCars(initialCars);
            } catch (error) {
                console.error('Error loading initial cars:', error);
            } finally {
                setLoading(false);
            }
        };
        
        initialLoad();
    }, []);

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
                    {filteredCars.map((car, index) => (
                        <motion.div
                            key={car.id}
                            ref={index === filteredCars.length - 1 ? lastCarElementRef : null}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div className="flex flex-col md:flex-row">
                                <div className="relative md:w-1/3 h-64 md:h-auto">
                                    <img 
                                        src={car.image} 
                                        alt={car.name}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h2 className="text-2xl font-bold text-white mb-2">{car.name}</h2>
                                        <p className="text-3xl font-bold text-blue-400">${car.price.toLocaleString()}</p>
                                    </div>
                                </div>
                                
                                <div className="flex-1 p-6 bg-gradient-to-br from-gray-50 to-white">
                                    <div className="flex items-center text-gray-600 mb-6">
                                        <MapPin className="w-5 h-5 mr-2" />
                                        <span className="font-medium">{car.location}</span>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                        <div className="flex items-center bg-gray-50 p-3 rounded-xl">
                                            <Fuel className="w-5 h-5 mr-2 text-blue-500" />
                                            <span className="font-medium">{car.fuelType}</span>
                                        </div>
                                        <div className="flex items-center bg-gray-50 p-3 rounded-xl">
                                            <Cog className="w-5 h-5 mr-2 text-blue-500" />
                                            <span className="font-medium">{car.transmission}</span>
                                        </div>
                                        <div className="flex items-center bg-gray-50 p-3 rounded-xl">
                                            <Route className="w-5 h-5 mr-2 text-blue-500" />
                                            <span className="font-medium">{car.mileage} km</span>
                                        </div>
                                        <div className="flex items-center bg-gray-50 p-3 rounded-xl">
                                            <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                                            <span className="font-medium">{car.year}</span>
                                        </div>
                                    </div>

                                    {/* Seller Details Section */}
                                    <div className="mb-8 p-4 bg-gray-50 rounded-xl">
                                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                                            <User className="w-5 h-5 mr-2 text-blue-500" />
                                            Seller Information
                                        </h3>
                                        <div className="flex items-start gap-4">
                                            <img 
                                                src={car.seller.image} 
                                                alt={car.seller.name}
                                                className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="font-semibold text-gray-800">{car.seller.name}</h4>
                                                    <div className="flex items-center">
                                                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                                        <span className="ml-1 font-medium">{car.seller.rating}</span>
                                                        <span className="ml-1 text-gray-500">({car.seller.reviews} reviews)</span>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center text-gray-600">
                                                        <Phone className="w-4 h-4 mr-2" />
                                                        <span>{car.seller.phone}</span>
                                                    </div>
                                                    <div className="flex items-center text-gray-600">
                                                        <Mail className="w-4 h-4 mr-2" />
                                                        <span>{car.seller.email}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-4">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition-colors duration-300 font-medium"
                                        >
                                            <Eye className="w-5 h-5" />
                                            View Details
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-300 font-medium"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                            Remove
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
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