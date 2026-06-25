/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Building2, 
  TrendingUp, 
  ShieldAlert, 
  MapPin, 
  Home, 
  Bath, 
  Bed, 
  Activity,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Loader2,
  Info,
  LogOut,
  User,
  Heart,
  Coffee,
  ShieldCheck,
  Wallet,
  BarChart3,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Zap,
  ArrowRight,
  Plus,
  X,
  Compass,
  Armchair,
  Layers,
  Download,
  FileSpreadsheet
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';
import { PropertyDetails, MarketDetails, PredictionResult, Property } from './types';
import Login from './components/Login';
import { predictProperty } from './services/geminiService';

const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Skyline Heights Apartment',
    price: 7500000,
    area: 1450,
    location: 'Worli, Mumbai',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    bedrooms: 3,
    bathrooms: 2,
    tags: ['Premium', 'Sea View', 'Pet-Friendly'],
    propertyType: 'Apartment',
    balconies: 2,
    parkingSpaces: 1,
    floorNumber: 12,
    totalFloors: 25,
    furnishing: 'Semi-Furnished',
    facing: 'East',
    amenities: ['Gym', 'Security', 'Elevator'],
    waterAvailability: '24 Hours',
    electricityStatus: 'No Powercut',
    ownershipType: 'Freehold',
    description: 'Luxurious 3BHK with a stunning view of the Arabian Sea. Located in the heart of Worli with premium facilities.',
    age: 5,
    locationRating: 9,
    facilitiesScore: 9,
    marketContext: {
      crimeRate: 1.2,
      growthRate: 8.5,
      infraScore: 9,
      demandLevel: 9,
      stabilityIndex: 8
    }
  },
  {
    id: '2',
    title: 'Green Valley Villa',
    price: 12500000,
    area: 2800,
    location: 'Whitefield, Bangalore',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    bedrooms: 4,
    bathrooms: 4,
    tags: ['Luxury', 'Garden', 'Good for Investment'],
    propertyType: 'Villa',
    balconies: 3,
    parkingSpaces: 2,
    floorNumber: 0,
    totalFloors: 2,
    furnishing: 'Fully-Furnished',
    facing: 'North-East',
    amenities: ['Pool', 'Garden', 'Security', 'Clubhouse'],
    waterAvailability: '24 Hours',
    electricityStatus: 'Rare Powercut',
    ownershipType: 'Freehold',
    description: 'Spacious independent villa with a private garden and high-end interiors. Perfect for families seeking peace and luxury.',
    age: 2,
    locationRating: 8,
    facilitiesScore: 10,
    marketContext: {
      crimeRate: 0.8,
      growthRate: 6.2,
      infraScore: 8,
      demandLevel: 7,
      stabilityIndex: 9
    }
  },
  {
    id: '3',
    title: 'Urban Loft Studio',
    price: 4200000,
    area: 650,
    location: 'Koramangala, Bangalore',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    bedrooms: 1,
    bathrooms: 1,
    tags: ['Modern', 'Tech Hub', 'Student Housing'],
    propertyType: 'Apartment',
    balconies: 1,
    parkingSpaces: 1,
    floorNumber: 3,
    totalFloors: 5,
    furnishing: 'Unfurnished',
    facing: 'West',
    amenities: ['Security', 'Elevator'],
    waterAvailability: 'Limited',
    electricityStatus: 'Rare Powercut',
    ownershipType: 'Leasehold',
    description: 'Compact and modern studio apartment ideal for young professionals working in the nearby tech parks.',
    age: 3,
    locationRating: 7,
    facilitiesScore: 7,
    marketContext: {
      crimeRate: 2.5,
      growthRate: 12.0,
      infraScore: 7,
      demandLevel: 10,
      stabilityIndex: 6
    }
  },
  {
    id: '4',
    title: 'Heritage Colonial Bungalow',
    price: 18500000,
    area: 4200,
    location: 'Colaba, Mumbai',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80',
    bedrooms: 5,
    bathrooms: 5,
    tags: ['Heritage', 'Renovated', 'Pet-Friendly'],
    propertyType: 'Villa',
    balconies: 4,
    parkingSpaces: 3,
    floorNumber: 0,
    totalFloors: 2,
    furnishing: 'Semi-Furnished',
    facing: 'South',
    amenities: ['Garden', 'Security', 'Power Backup'],
    waterAvailability: '24 Hours',
    electricityStatus: 'No Powercut',
    ownershipType: 'Freehold',
    description: 'A beautifully renovated colonial-era bungalow. Combines old-world charm with modern amenities and a large pet-friendly lawn.',
    age: 60,
    locationRating: 10,
    facilitiesScore: 8,
    marketContext: {
      crimeRate: 0.5,
      growthRate: 4.5,
      infraScore: 10,
      demandLevel: 8,
      stabilityIndex: 10
    }
  },
  {
    id: '5',
    title: 'Smart City Executive Suite',
    price: 9200000,
    area: 1150,
    location: 'Hitech City, Hyderabad',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
    bedrooms: 2,
    bathrooms: 2,
    tags: ['High ROI', 'Good for Investment', 'Tech-Ready'],
    propertyType: 'Apartment',
    balconies: 2,
    parkingSpaces: 2,
    floorNumber: 18,
    totalFloors: 40,
    furnishing: 'Fully-Furnished',
    facing: 'North',
    amenities: ['Gym', 'Pool', 'Security', 'Clubhouse', 'Power Backup'],
    waterAvailability: '24 Hours',
    electricityStatus: 'No Powercut',
    ownershipType: 'Freehold',
    description: 'High-floor executive suite in a smart building. Excellent rental yields and capital appreciation potential in the tech corridor.',
    age: 1,
    locationRating: 9,
    facilitiesScore: 10,
    marketContext: {
      crimeRate: 1.0,
      growthRate: 15.0,
      infraScore: 9,
      demandLevel: 10,
      stabilityIndex: 7
    }
  },
  {
    id: '6',
    title: 'University Commons Studio',
    price: 3500000,
    area: 550,
    location: 'North Campus, Delhi',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    bedrooms: 1,
    bathrooms: 1,
    tags: ['Student Housing', 'Affordable', 'Near Metro'],
    propertyType: 'Flat',
    balconies: 1,
    parkingSpaces: 0,
    floorNumber: 2,
    totalFloors: 4,
    furnishing: 'Semi-Furnished',
    facing: 'East',
    amenities: ['Security', 'Power Backup'],
    waterAvailability: 'Limited',
    electricityStatus: 'Rare Powercut',
    ownershipType: 'Co-operative Society',
    description: 'Perfect for students or young professionals. Located within walking distance of the university and metro station.',
    age: 15,
    locationRating: 8,
    facilitiesScore: 6,
    marketContext: {
      crimeRate: 3.0,
      growthRate: 5.5,
      infraScore: 8,
      demandLevel: 9,
      stabilityIndex: 8
    }
  }
];

const AMENITIES_LIST = ['Pool', 'Gym', 'Security', 'Clubhouse', 'Garden', 'Elevator', 'Power Backup', 'Parking'];
const FACING_OPTIONS = ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'];

export default function App() {
  const [user, setUser] = useState<{ email: string; role: 'buyer' | 'investor' } | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [listings, setListings] = useState<Property[]>(MOCK_PROPERTIES);
  const totalSteps = 4;

  const [newListing, setNewListing] = useState<Partial<Property>>({
    title: '',
    price: 5000000,
    area: 1000,
    location: '',
    bedrooms: 2,
    bathrooms: 2,
    tags: ['Modern'],
    propertyType: 'Apartment',
    balconies: 1,
    parkingSpaces: 1,
    floorNumber: 0,
    totalFloors: 1,
    furnishing: 'Semi-Furnished',
    facing: 'East',
    amenities: [],
    waterAvailability: '24 Hours',
    electricityStatus: 'No Powercut',
    ownershipType: 'Freehold',
    description: '',
    age: 0,
    locationRating: 5,
    facilitiesScore: 5
  });
  
  const [propertyDetails, setPropertyDetails] = useState<PropertyDetails>({
    area: 1200,
    bedrooms: 2,
    bathrooms: 2,
    locationRating: 7,
    age: 5,
    facilitiesScore: 8,
    propertyType: 'Apartment',
    balconies: 1,
    parkingSpaces: 1,
    floorNumber: 4,
    totalFloors: 10,
    furnishing: 'Semi-Furnished',
    facing: 'East',
    amenities: ['Security'],
    waterAvailability: '24 Hours',
    electricityStatus: 'No Powercut',
    ownershipType: 'Freehold'
  });

  const [marketDetails, setMarketDetails] = useState<MarketDetails>({
    crimeRate: 2,
    growthRate: 5,
    infraScore: 7,
    demandLevel: 8,
    stabilityIndex: 9
  });

  const handlePredict = async () => {
    setLoading(true);
    try {
      const data = await predictProperty(
        propertyDetails,
        marketDetails,
        user?.role || 'buyer'
      );
      setResult(data);
    } catch (error) {
      console.error("Prediction Error:", error);
      alert(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
    else handlePredict();
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleViewDetails = async (property: Property) => {
    // Set property details from the listing
    const newDetails: PropertyDetails = {
      area: property.area,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      locationRating: property.locationRating,
      age: property.age,
      facilitiesScore: property.facilitiesScore,
      propertyType: property.propertyType,
      balconies: property.balconies,
      parkingSpaces: property.parkingSpaces,
      floorNumber: property.floorNumber,
      totalFloors: property.totalFloors,
      furnishing: property.furnishing,
      facing: property.facing,
      amenities: property.amenities,
      waterAvailability: property.waterAvailability,
      electricityStatus: property.electricityStatus,
      ownershipType: property.ownershipType
    };

    setPropertyDetails(newDetails);

    // Set market details if available, otherwise use defaults
    if (property.marketContext) {
      setMarketDetails(property.marketContext);
    }

    // Reset UI state
    setResult(null);
    setCurrentStep(4); // Move to last step to show context
    
    // Trigger prediction
    setLoading(true);
    
    // Scroll to analysis section
    window.scrollTo({ top: document.getElementById('analysis-section')?.offsetTop || 0, behavior: 'smooth' });

    try {
      const data = await predictProperty(
        newDetails,
        property.marketContext || marketDetails,
        user?.role || 'buyer'
      );
      setResult(data);
    } catch (error) {
      console.error("View Details Error:", error);
      alert(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleAddListing = (e: React.FormEvent) => {
    e.preventDefault();
    const id = (listings.length + 1).toString();
    const property: Property = {
      ...newListing as Property,
      id,
      image: `https://picsum.photos/seed/prop${id}/800/600`,
      marketContext: {
        crimeRate: 2,
        growthRate: 5,
        infraScore: 7,
        demandLevel: 8,
        stabilityIndex: 8
      }
    };
    setListings([property, ...listings]);
    setShowAddModal(false);
    setNewListing({
      title: '',
      price: 5000000,
      area: 1000,
      location: '',
      bedrooms: 2,
      bathrooms: 2,
      tags: ['Modern'],
      propertyType: 'Apartment',
      balconies: 1,
      parkingSpaces: 1,
      floorNumber: 0,
      totalFloors: 1,
      furnishing: 'Semi-Furnished',
      facing: 'East',
      amenities: [],
      waterAvailability: '24 Hours',
      electricityStatus: 'No Powercut',
      ownershipType: 'Freehold',
      description: '',
      age: 0,
      locationRating: 5,
      facilitiesScore: 5
    });
  };

  const downloadAsJSON = () => {
    if (!result) return;
    const reportData = {
      reportDate: new Date().toISOString(),
      appName: "Smart Real Estate Investment Risk Analyzer",
      user: {
        email: user?.email,
        role: user?.role
      },
      propertyDetails: {
        propertyType: propertyDetails.propertyType,
        areaSqFt: propertyDetails.area,
        bedrooms: propertyDetails.bedrooms,
        bathrooms: propertyDetails.bathrooms,
        balconies: propertyDetails.balconies,
        parkingSpaces: propertyDetails.parkingSpaces,
        floorNumber: propertyDetails.floorNumber,
        totalFloors: propertyDetails.totalFloors,
        ownershipType: propertyDetails.ownershipType,
        furnishing: propertyDetails.furnishing,
        facing: propertyDetails.facing,
        waterAvailability: propertyDetails.waterAvailability,
        electricityStatus: propertyDetails.electricityStatus,
        propertyAgeYears: propertyDetails.age,
        locationRating: propertyDetails.locationRating,
        facilitiesScore: propertyDetails.facilitiesScore,
        amenities: propertyDetails.amenities
      },
      marketContext: {
        crimeRate: marketDetails.crimeRate,
        growthRate: marketDetails.growthRate,
        infraScore: marketDetails.infraScore,
        demandLevel: marketDetails.demandLevel,
        stabilityIndex: marketDetails.stabilityIndex
      },
      analysisResults: {
        estimatedPriceINR: result.estimatedPrice,
        riskLevel: result.riskLevel,
        riskScore: result.riskScore,
        confidence: result.confidence,
        suggestion: result.suggestion,
        recommendationMessage: result.recommendationMessage,
        marketAnalysis: result.marketAnalysis
      }
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Real_Estate_Analysis_Report_${propertyDetails.propertyType}_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAsCSV = () => {
    if (!result) return;
    
    const rows = [
      ["Report Metadata", ""],
      ["Report Date", new Date().toISOString()],
      ["App Name", "Smart Real Estate Investment Risk Analyzer"],
      ["User Email", user?.email || ""],
      ["User Role", user?.role || ""],
      ["", ""],
      ["Property Details", ""],
      ["Property Type", propertyDetails.propertyType],
      ["Area (Sq Ft)", propertyDetails.area.toString()],
      ["Bedrooms", propertyDetails.bedrooms.toString()],
      ["Bathrooms", propertyDetails.bathrooms.toString()],
      ["Balconies", propertyDetails.balconies.toString()],
      ["Parking Spaces", propertyDetails.parkingSpaces.toString()],
      ["Floor Number", propertyDetails.floorNumber.toString()],
      ["Total Floors", propertyDetails.totalFloors.toString()],
      ["Ownership Type", propertyDetails.ownershipType],
      ["Furnishing", propertyDetails.furnishing],
      ["Facing", propertyDetails.facing],
      ["Water Availability", propertyDetails.waterAvailability],
      ["Electricity Status", propertyDetails.electricityStatus],
      ["Property Age (Years)", propertyDetails.age.toString()],
      ["Location Rating (1-10)", propertyDetails.locationRating.toString()],
      ["Facilities Score (1-10)", propertyDetails.facilitiesScore.toString()],
      ["Amenities", propertyDetails.amenities.join("; ")],
      ["", ""],
      ["Market Context", ""],
      ["Crime Rate (1-10)", marketDetails.crimeRate.toString()],
      ["Growth Rate (1-10)", marketDetails.growthRate.toString()],
      ["Infrastructure Score (1-10)", marketDetails.infraScore.toString()],
      ["Demand Level (1-10)", marketDetails.demandLevel.toString()],
      ["Stability Index (1-10)", marketDetails.stabilityIndex.toString()],
      ["", ""],
      ["Predictive AI Analysis", ""],
      ["Estimated Price (INR)", result.estimatedPrice.toString()],
      ["Risk Level", result.riskLevel],
      ["Risk Score (0-100)", result.riskScore.toString()],
      ["Confidence Level (%)", `${(result.confidence * 100).toFixed(0)}%`],
      ["Recommendation Suggestion", result.suggestion],
      ["Recommendation Message", result.recommendationMessage.replace(/"/g, '""')],
      ["AI Market Insights", result.marketAnalysis.replace(/"/g, '""')]
    ];

    const csvContent = rows.map(e => e.map(val => `"${val}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Real_Estate_Analysis_Report_${propertyDetails.propertyType}_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'Medium': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'High': return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
      default: return 'text-slate-500 bg-slate-500/10 border-slate-500/20';
    }
  };

  const getSuggestionIcon = (suggestion: string) => {
    switch (suggestion) {
      case 'Safe': return <CheckCircle2 className="w-6 h-6 text-emerald-500" />;
      case 'Moderate': return <AlertTriangle className="w-6 h-6 text-amber-500" />;
      case 'Avoid': return <XCircle className="w-6 h-6 text-rose-500" />;
      default: return <Info className="w-6 h-6 text-slate-500" />;
    }
  };

  const radarData = [
    { subject: 'Location', A: propertyDetails.locationRating * 10, fullMark: 100 },
    { subject: 'Facilities', A: propertyDetails.facilitiesScore * 10, fullMark: 100 },
    { subject: 'Growth', A: marketDetails.growthRate * 10, fullMark: 100 },
    { subject: 'Infra', A: marketDetails.infraScore * 10, fullMark: 100 },
    { subject: 'Demand', A: marketDetails.demandLevel * 10, fullMark: 100 },
    { subject: 'Stability', A: marketDetails.stabilityIndex * 10, fullMark: 100 },
  ];

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <Building2 className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight">Smart Real Estate</h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Risk Analyzer v2.0</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">Dashboard</span>
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">Market Trends</span>
            <div className="h-4 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3 text-slate-700">
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold truncate max-w-[120px]">{user.email}</span>
                <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${user.role === 'investor' ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}>
                  {user.role}
                </span>
              </div>
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <button 
                onClick={() => setUser(null)}
                className="p-2 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Market Listings Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Market Listings</h2>
              <p className="text-slate-500 text-sm">Top properties matching current market trends</p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-black shadow-lg shadow-indigo-100 flex items-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4" />
                ADD PROPERTY
              </button>
              <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((property) => (
              <motion.div 
                key={property.id}
                whileHover={{ y: -8 }}
                className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50 transition-all group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {property.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/95 backdrop-blur-md text-[10px] font-black uppercase rounded-full text-indigo-600 shadow-sm border border-indigo-50/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-2">
                       <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase rounded-full shadow-lg">
                         {property.propertyType}
                       </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-black text-slate-900 text-lg leading-tight group-hover:text-indigo-600 transition-colors">{property.title}</h3>
                  </div>
                  <p className="text-slate-400 text-xs font-bold flex items-center gap-1 mb-5">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {property.location}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-50 mb-5">
                    <div className="flex flex-col items-center gap-1">
                      <Bed className="w-4 h-4 text-slate-300" />
                      <span className="text-[10px] font-black text-slate-700">{property.bedrooms} BHK</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 border-x border-slate-100">
                      <Bath className="w-4 h-4 text-slate-300" />
                      <span className="text-[10px] font-black text-slate-700">{property.bathrooms} Bath</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Activity className="w-4 h-4 text-slate-300" />
                      <span className="text-[10px] font-black text-slate-700">{property.area} ft²</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Asking Price</span>
                      <span className="text-xl font-black text-slate-900 tracking-tight">₹{(property.price / 100000).toFixed(1)}L</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100" title={property.facing}>
                        <Compass className="w-4 h-4 text-slate-400" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100" title={property.furnishing}>
                        <Armchair className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleViewDetails(property)}
                    className="w-full py-4 bg-slate-900 hover:bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-200 hover:shadow-indigo-200"
                  >
                    ANALYZE PROPERTY
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div id="analysis-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Panel: Multi-step Input Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[600px]">
              {/* Stepper Header */}
              <div className="p-6 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-black text-slate-800 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                    Analysis Setup
                  </h2>
                  <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                    Step {currentStep} of {totalSteps}
                  </span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map(step => (
                    <div 
                      key={step} 
                      className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step <= currentStep ? 'bg-indigo-600' : 'bg-slate-200'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <div className="flex-1 p-8 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-indigo-50 rounded-lg">
                          <Home className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800">Property Basics</h3>
                          <p className="text-xs text-slate-500">Define the core physical attributes</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2 space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Property Type</label>
                          <select 
                            value={propertyDetails.propertyType}
                            onChange={e => setPropertyDetails({...propertyDetails, propertyType: e.target.value as any})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                          >
                            <option value="Apartment">Apartment</option>
                            <option value="Flat">Flat</option>
                            <option value="Villa">Villa</option>
                            <option value="Penthouse">Penthouse</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Area (sq ft)</label>
                          <input 
                            type="number" 
                            value={propertyDetails.area}
                            onChange={e => setPropertyDetails({...propertyDetails, area: Number(e.target.value)})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Property Age</label>
                          <input 
                            type="number" 
                            value={propertyDetails.age}
                            onChange={e => setPropertyDetails({...propertyDetails, age: Number(e.target.value)})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Bedrooms</label>
                          <input 
                            type="number" 
                            value={propertyDetails.bedrooms}
                            onChange={e => setPropertyDetails({...propertyDetails, bedrooms: Number(e.target.value)})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Bathrooms</label>
                          <input 
                            type="number" 
                            value={propertyDetails.bathrooms}
                            onChange={e => setPropertyDetails({...propertyDetails, bathrooms: Number(e.target.value)})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Balconies</label>
                          <input 
                            type="number" 
                            value={propertyDetails.balconies}
                            onChange={e => setPropertyDetails({...propertyDetails, balconies: Number(e.target.value)})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Parking Spaces</label>
                          <input 
                            type="number" 
                            value={propertyDetails.parkingSpaces}
                            onChange={e => setPropertyDetails({...propertyDetails, parkingSpaces: Number(e.target.value)})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                          />
                        </div>
                        {(propertyDetails.propertyType === 'Apartment' || propertyDetails.propertyType === 'Flat') && (
                          <>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Floor Number</label>
                              <input 
                                type="number" 
                                value={propertyDetails.floorNumber}
                                onChange={e => setPropertyDetails({...propertyDetails, floorNumber: Number(e.target.value)})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Total Floors</label>
                              <input 
                                type="number" 
                                value={propertyDetails.totalFloors}
                                onChange={e => setPropertyDetails({...propertyDetails, totalFloors: Number(e.target.value)})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                              />
                            </div>
                          </>
                        )}
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Ownership Type</label>
                          <select 
                            value={propertyDetails.ownershipType}
                            onChange={e => setPropertyDetails({...propertyDetails, ownershipType: e.target.value as any})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                          >
                            <option value="Freehold">Freehold</option>
                            <option value="Leasehold">Leasehold</option>
                            <option value="Co-operative Society">Co-operative Society</option>
                            <option value="Power of Attorney">Power of Attorney</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Water Availability</label>
                          <select 
                            value={propertyDetails.waterAvailability}
                            onChange={e => setPropertyDetails({...propertyDetails, waterAvailability: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                          >
                            <option value="24 Hours">24 Hours</option>
                            <option value="Limited">Limited</option>
                            <option value="Borewell">Borewell</option>
                          </select>
                        </div>
                        <div className="col-span-2 space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Electricity Status</label>
                          <select 
                            value={propertyDetails.electricityStatus}
                            onChange={e => setPropertyDetails({...propertyDetails, electricityStatus: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                          >
                            <option value="No Powercut">No Powercut</option>
                            <option value="Rare Powercut">Rare Powercut</option>
                            <option value="Frequent Powercut">Frequent Powercut</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Furnishing</label>
                          <select 
                            value={propertyDetails.furnishing}
                            onChange={e => setPropertyDetails({...propertyDetails, furnishing: e.target.value as any})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                          >
                            <option value="Unfurnished">Unfurnished</option>
                            <option value="Semi-Furnished">Semi-Furnished</option>
                            <option value="Fully-Furnished">Fully-Furnished</option>
                          </select>
                        </div>
                        <div className="col-span-2 space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Facing Direction</label>
                          <div className="grid grid-cols-4 gap-2">
                            {FACING_OPTIONS.map(option => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => setPropertyDetails({...propertyDetails, facing: option as any})}
                                className={`py-2 rounded-lg text-[10px] font-bold transition-all border ${
                                  propertyDetails.facing === option
                                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100'
                                    : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300'
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="col-span-2 space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Amenities</label>
                          <div className="flex flex-wrap gap-2">
                            {AMENITIES_LIST.map(amenity => (
                              <button
                                key={amenity}
                                type="button"
                                onClick={() => {
                                  const current = propertyDetails.amenities;
                                  if (current.includes(amenity)) {
                                    setPropertyDetails({...propertyDetails, amenities: current.filter(a => a !== amenity)});
                                  } else {
                                    setPropertyDetails({...propertyDetails, amenities: [...current, amenity]});
                                  }
                                }}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                                  propertyDetails.amenities.includes(amenity)
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                }`}
                              >
                                {amenity}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-emerald-50 rounded-lg">
                          <MapPin className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800">Quality of Life</h3>
                          <p className="text-xs text-slate-500">Location and amenity ratings</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-3">
                          <div className="flex justify-between items-end">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Location Rating</label>
                            <span className="text-lg font-black text-indigo-600">{propertyDetails.locationRating}<span className="text-xs text-slate-400">/10</span></span>
                          </div>
                          <input 
                            type="range" min="1" max="10" 
                            value={propertyDetails.locationRating}
                            onChange={e => setPropertyDetails({...propertyDetails, locationRating: Number(e.target.value)})}
                            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                          />
                          <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                            <span>POOR</span>
                            <span>PREMIUM</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-end">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Facilities Score</label>
                            <span className="text-lg font-black text-indigo-600">{propertyDetails.facilitiesScore}<span className="text-xs text-slate-400">/10</span></span>
                          </div>
                          <input 
                            type="range" min="1" max="10" 
                            value={propertyDetails.facilitiesScore}
                            onChange={e => setPropertyDetails({...propertyDetails, facilitiesScore: Number(e.target.value)})}
                            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                          />
                          <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                            <span>BASIC</span>
                            <span>LUXURY</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-rose-50 rounded-lg">
                          <ShieldAlert className="w-5 h-5 text-rose-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800">Safety & Stability</h3>
                          <p className="text-xs text-slate-500">Risk and market volatility factors</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Crime Rate (%)</label>
                          <input 
                            type="number" 
                            value={marketDetails.crimeRate}
                            onChange={e => setMarketDetails({...marketDetails, crimeRate: Number(e.target.value)})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between items-end">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Price Stability Index</label>
                            <span className="text-lg font-black text-indigo-600">{marketDetails.stabilityIndex}<span className="text-xs text-slate-400">/10</span></span>
                          </div>
                          <input 
                            type="range" min="1" max="10" 
                            value={marketDetails.stabilityIndex}
                            onChange={e => setMarketDetails({...marketDetails, stabilityIndex: Number(e.target.value)})}
                            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 4 && (
                    <motion.div 
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-amber-50 rounded-lg">
                          <TrendingUp className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800">Growth & Demand</h3>
                          <p className="text-xs text-slate-500">Future development potential</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Market Growth Rate (%)</label>
                          <input 
                            type="number" 
                            value={marketDetails.growthRate}
                            onChange={e => setMarketDetails({...marketDetails, growthRate: Number(e.target.value)})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                          />
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-end">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Infrastructure Score</label>
                            <span className="text-lg font-black text-indigo-600">{marketDetails.infraScore}<span className="text-xs text-slate-400">/10</span></span>
                          </div>
                          <input 
                            type="range" min="1" max="10" 
                            value={marketDetails.infraScore}
                            onChange={e => setMarketDetails({...marketDetails, infraScore: Number(e.target.value)})}
                            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                          />
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-end">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Demand Level</label>
                            <span className="text-lg font-black text-indigo-600">{marketDetails.demandLevel}<span className="text-xs text-slate-400">/10</span></span>
                          </div>
                          <input 
                            type="range" min="1" max="10" 
                            value={marketDetails.demandLevel}
                            onChange={e => setMarketDetails({...marketDetails, demandLevel: Number(e.target.value)})}
                            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation Footer */}
              <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <button 
                  onClick={prevStep}
                  disabled={currentStep === 1 || loading}
                  className="flex items-center gap-2 text-xs font-black text-slate-500 hover:text-slate-800 disabled:opacity-30 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  BACK
                </button>
                
                <button 
                  onClick={nextStep}
                  disabled={loading}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black transition-all shadow-lg ${currentStep === totalSteps ? 'bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700' : 'bg-white border border-slate-200 text-slate-800 hover:bg-slate-50'}`}
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : currentStep === totalSteps ? (
                    <>
                      RUN ANALYSIS
                      <Zap className="w-4 h-4 fill-current" />
                    </>
                  ) : (
                    <>
                      CONTINUE
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel: Results */}
          <div className="lg:col-span-7 space-y-6">
            <AnimatePresence mode="wait">
              {!result && !loading ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center p-12 bg-white rounded-3xl border border-dashed border-slate-300"
                >
                  <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6 rotate-3">
                    <ShieldAlert className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">Intelligence Pending</h3>
                  <p className="text-slate-500 max-w-sm leading-relaxed">Complete the 4-step configuration on the left to unlock the predictive analysis report.</p>
                </motion.div>
              ) : loading ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-slate-200"
                >
                  <div className="relative">
                    <div className="w-24 h-24 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <TrendingUp className="w-8 h-8 text-indigo-600 animate-pulse" />
                    </div>
                  </div>
                  <p className="mt-8 font-black text-slate-800 text-lg">Processing ML Models...</p>
                  <p className="text-slate-400 text-sm font-medium">Calculating KNN Regression & Classification</p>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  {/* Export Report Card */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-5 rounded-2xl shadow-lg border border-slate-800">
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                        Analysis Report Ready
                      </h4>
                      <p className="text-[11px] text-slate-300 font-medium mt-0.5">Export custom predictive metrics & risk parameters</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={downloadAsJSON}
                        id="download-json-btn"
                        className="px-3.5 py-2 bg-slate-800 text-slate-200 border border-slate-700 hover:text-white hover:bg-slate-700 hover:border-slate-600 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        <Download className="w-3 h-3 text-indigo-400" />
                        JSON
                      </button>
                      <button 
                        onClick={downloadAsCSV}
                        id="download-csv-btn"
                        className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black tracking-widest uppercase transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/10"
                      >
                        <FileSpreadsheet className="w-3 h-3" />
                        CSV Report
                      </button>
                    </div>
                  </div>

                  {/* Top Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <p className="text-xs font-bold text-slate-400 uppercase mb-1">
                        {user.role === 'investor' ? 'Estimated Market Value' : 'Property Purchase Price'}
                      </p>
                      <h3 className="text-3xl font-black text-slate-900">₹{result?.estimatedPrice.toLocaleString()}</h3>
                      <div className="mt-2 flex items-center gap-1 text-emerald-500 text-xs font-bold">
                        {user.role === 'investor' ? <TrendingUp className="w-3 h-3" /> : <Wallet className="w-3 h-3" />}
                        <span>{user.role === 'investor' ? `Confidence: ${(result?.confidence! * 100).toFixed(0)}%` : 'Fair Market Value'}</span>
                      </div>
                    </div>
                    <div className={`p-6 rounded-2xl border shadow-sm ${getRiskColor(result?.riskLevel || '')}`}>
                      <p className="text-xs font-bold opacity-70 uppercase mb-1">
                        {user.role === 'investor' ? 'Investment Risk Level' : 'Home Safety & Stability'}
                      </p>
                      <h3 className="text-3xl font-black">{result?.riskLevel}</h3>
                      <div className="mt-2 flex items-center gap-1 text-xs font-bold">
                        {user.role === 'investor' ? <ShieldAlert className="w-3 h-3" /> : <ShieldCheck className="w-3 h-3" />}
                        <span>{user.role === 'investor' ? `Risk Score: ${result?.riskScore}/100` : 'Stability Rating'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Property Details Summary */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <Home className="w-4 h-4 text-indigo-600" />
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">Analyzed Property Profile</h4>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Type & Size</p>
                        <p className="text-xs font-black text-slate-700">{propertyDetails.propertyType} • {propertyDetails.area} sqft</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Layout</p>
                        <p className="text-xs font-black text-slate-700">{propertyDetails.bedrooms}BHK • {propertyDetails.bathrooms} Bath</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Floor Info</p>
                        <p className="text-xs font-black text-slate-700">
                          {propertyDetails.propertyType === 'Villa' ? 'G+1' : `${propertyDetails.floorNumber} of ${propertyDetails.totalFloors}`}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Ownership</p>
                        <p className="text-xs font-black text-slate-700">{propertyDetails.ownershipType}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Furnishing</p>
                        <p className="text-xs font-black text-slate-700">{propertyDetails.furnishing}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Facing</p>
                        <p className="text-xs font-black text-slate-700">{propertyDetails.facing}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Water</p>
                        <p className="text-xs font-black text-slate-700">{propertyDetails.waterAvailability}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Electricity</p>
                        <p className="text-xs font-black text-slate-700 truncate">{propertyDetails.electricityStatus}</p>
                      </div>
                      <div className="col-span-2 md:col-span-4 pt-2 border-t border-slate-50">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Key Amenities</p>
                        <div className="flex flex-wrap gap-1.5">
                          {propertyDetails.amenities.length > 0 ? propertyDetails.amenities.map(a => (
                            <span key={a} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[9px] font-bold">{a}</span>
                          )) : <span className="text-[9px] text-slate-400 italic">No specific amenities listed</span>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Role Specific Metric */}
                  {user.role === 'buyer' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <Heart className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-emerald-600 uppercase">Family Score</p>
                          <p className="text-lg font-black text-emerald-900">{(propertyDetails.facilitiesScore * 0.8 + propertyDetails.locationRating * 0.2).toFixed(1)}/10</p>
                        </div>
                      </div>
                      <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <Coffee className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-amber-600 uppercase">Lifestyle Index</p>
                          <p className="text-lg font-black text-amber-900">{propertyDetails.facilitiesScore}/10</p>
                        </div>
                      </div>
                      <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <ShieldCheck className="w-5 h-5 text-indigo-500" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-indigo-600 uppercase">Safety Rating</p>
                          <p className="text-lg font-black text-indigo-900">{(10 - marketDetails.crimeRate).toFixed(1)}/10</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {user.role === 'investor' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <TrendingUp className="w-5 h-5 text-indigo-500" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-indigo-600 uppercase">Projected ROI</p>
                          <p className="text-lg font-black text-indigo-900">{(marketDetails.growthRate * 1.5).toFixed(1)}%</p>
                        </div>
                      </div>
                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <BarChart3 className="w-5 h-5 text-slate-500" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-600 uppercase">Growth Index</p>
                          <p className="text-lg font-black text-slate-900">{marketDetails.growthRate}/10</p>
                        </div>
                      </div>
                      <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <ShieldAlert className="w-5 h-5 text-rose-500" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-rose-600 uppercase">Volatility</p>
                          <p className="text-lg font-black text-rose-900">{(10 - marketDetails.stabilityIndex).toFixed(1)}/10</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Recommendation Panel */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        {getSuggestionIcon(result?.suggestion || '')}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 flex items-center gap-2">
                          Recommendation: {result?.suggestion}
                        </h4>
                        <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                          {result?.recommendationMessage}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Visualizations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <h4 className="text-sm font-bold text-slate-800 mb-4">Market Strength Profile</h4>
                      <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                            <PolarGrid stroke="#E2E8F0" />
                            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: 600, fill: '#64748B' }} />
                            <Radar
                              name="Property"
                              dataKey="A"
                              stroke="#4F46E5"
                              fill="#4F46E5"
                              fillOpacity={0.2}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <h4 className="text-sm font-bold text-slate-800 mb-4">Risk Breakdown</h4>
                      <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={[
                            { name: 'Crime', val: marketDetails.crimeRate * 10 },
                            { name: 'Stability', val: (10 - marketDetails.stabilityIndex) * 10 },
                            { name: 'Age', val: propertyDetails.age * 2 },
                            { name: 'Demand', val: (10 - marketDetails.demandLevel) * 10 }
                          ]}>
                            <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 600, fill: '#64748B' }} />
                            <Tooltip 
                              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                            />
                            <Bar dataKey="val" radius={[4, 4, 0, 0]}>
                              { [0,1,2,3].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={['#F43F5E', '#FB923C', '#FBBF24', '#6366F1'][index]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  {/* Price Trend Visualization */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-indigo-600" />
                      Estimated Price vs. Property Age
                    </h4>
                    <div className="h-[250px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={result?.ageTrend}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                          <XAxis 
                            dataKey="age" 
                            label={{ value: 'Age (Years)', position: 'insideBottom', offset: -5, fontSize: 10, fill: '#94A3B8' }}
                            tick={{ fontSize: 10, fontWeight: 600, fill: '#64748B' }}
                          />
                          <YAxis 
                            tick={{ fontSize: 10, fontWeight: 600, fill: '#64748B' }}
                            tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                          />
                          <Tooltip 
                            formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Estimated Price']}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="price" 
                            stroke="#4F46E5" 
                            strokeWidth={3} 
                            dot={{ fill: '#4F46E5', strokeWidth: 2, r: 4, stroke: '#fff' }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-4 italic">
                      * This trend assumes all other property and market factors remain constant.
                    </p>
                  </div>

                  {/* Market Analysis Text */}
                  <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Info className="w-4 h-4 text-indigo-400" />
                      <h4 className="text-sm font-bold uppercase tracking-wider">AI Market Insights</h4>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed italic">
                      "{result?.marketAnalysis}"
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Add Property Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Plus className="w-6 h-6 text-indigo-600" />
                  Add New Property Listing
                </h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleAddListing} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Property Title</label>
                    <input 
                      type="text" 
                      required
                      value={newListing.title}
                      onChange={e => setNewListing({...newListing, title: e.target.value})}
                      placeholder="e.g. Sunset Boulevard Villa"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Location</label>
                    <input 
                      type="text" 
                      required
                      value={newListing.location}
                      onChange={e => setNewListing({...newListing, location: e.target.value})}
                      placeholder="e.g. Bandra, Mumbai"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Property Type</label>
                    <select 
                      value={newListing.propertyType}
                      onChange={e => setNewListing({...newListing, propertyType: e.target.value as any})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    >
                      <option value="Apartment">Apartment</option>
                      <option value="Flat">Flat</option>
                      <option value="Villa">Villa</option>
                      <option value="Penthouse">Penthouse</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Price (₹)</label>
                    <input 
                      type="number" 
                      required
                      value={newListing.price}
                      onChange={e => setNewListing({...newListing, price: Number(e.target.value)})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Area (sq ft)</label>
                    <input 
                      type="number" 
                      required
                      value={newListing.area}
                      onChange={e => setNewListing({...newListing, area: Number(e.target.value)})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Bedrooms</label>
                    <input 
                      type="number" 
                      required
                      value={newListing.bedrooms}
                      onChange={e => setNewListing({...newListing, bedrooms: Number(e.target.value)})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Bathrooms</label>
                    <input 
                      type="number" 
                      required
                      value={newListing.bathrooms}
                      onChange={e => setNewListing({...newListing, bathrooms: Number(e.target.value)})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Balconies</label>
                    <input 
                      type="number" 
                      required
                      value={newListing.balconies}
                      onChange={e => setNewListing({...newListing, balconies: Number(e.target.value)})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Parking Spaces</label>
                    <input 
                      type="number" 
                      required
                      value={newListing.parkingSpaces}
                      onChange={e => setNewListing({...newListing, parkingSpaces: Number(e.target.value)})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                  {(newListing.propertyType === 'Apartment' || newListing.propertyType === 'Flat') && (
                    <>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Floor Number</label>
                        <input 
                          type="number" 
                          required
                          value={newListing.floorNumber}
                          onChange={e => setNewListing({...newListing, floorNumber: Number(e.target.value)})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Total Floors</label>
                        <input 
                          type="number" 
                          required
                          value={newListing.totalFloors}
                          onChange={e => setNewListing({...newListing, totalFloors: Number(e.target.value)})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        />
                      </div>
                    </>
                  )}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Ownership Type</label>
                    <select 
                      value={newListing.ownershipType}
                      onChange={e => setNewListing({...newListing, ownershipType: e.target.value as any})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    >
                      <option value="Freehold">Freehold</option>
                      <option value="Leasehold">Leasehold</option>
                      <option value="Co-operative Society">Co-operative Society</option>
                      <option value="Power of Attorney">Power of Attorney</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Water Availability</label>
                    <select 
                      value={newListing.waterAvailability}
                      onChange={e => setNewListing({...newListing, waterAvailability: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    >
                      <option value="24 Hours">24 Hours</option>
                      <option value="Limited">Limited</option>
                      <option value="Borewell">Borewell</option>
                    </select>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Electricity Status</label>
                    <select 
                      value={newListing.electricityStatus}
                      onChange={e => setNewListing({...newListing, electricityStatus: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    >
                      <option value="No Powercut">No Powercut</option>
                      <option value="Rare Powercut">Rare Powercut</option>
                      <option value="Frequent Powercut">Frequent Powercut</option>
                    </select>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Description</label>
                    <textarea 
                      required
                      value={newListing.description}
                      onChange={e => setNewListing({...newListing, description: e.target.value})}
                      placeholder="Describe the property highlights..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all h-24 resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Property Age (Years)</label>
                    <input 
                      type="number" 
                      required
                      value={newListing.age}
                      onChange={e => setNewListing({...newListing, age: Number(e.target.value)})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Location Rating (1-10)</label>
                    <input 
                      type="number" 
                      min="1" max="10"
                      required
                      value={newListing.locationRating}
                      onChange={e => setNewListing({...newListing, locationRating: Number(e.target.value)})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Facilities Score (1-10)</label>
                    <input 
                      type="number" 
                      min="1" max="10"
                      required
                      value={newListing.facilitiesScore}
                      onChange={e => setNewListing({...newListing, facilitiesScore: Number(e.target.value)})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Furnishing</label>
                    <select 
                      value={newListing.furnishing}
                      onChange={e => setNewListing({...newListing, furnishing: e.target.value as any})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    >
                      <option value="Unfurnished">Unfurnished</option>
                      <option value="Semi-Furnished">Semi-Furnished</option>
                      <option value="Fully-Furnished">Fully-Furnished</option>
                    </select>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Facing Direction</label>
                    <div className="grid grid-cols-4 gap-2">
                      {FACING_OPTIONS.map(option => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setNewListing({...newListing, facing: option as any})}
                          className={`py-2 rounded-lg text-[10px] font-bold transition-all border ${
                            newListing.facing === option
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100'
                              : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Amenities</label>
                    <div className="flex flex-wrap gap-2">
                      {AMENITIES_LIST.map(amenity => (
                        <button
                          key={amenity}
                          type="button"
                          onClick={() => {
                            const current = newListing.amenities || [];
                            if (current.includes(amenity)) {
                              setNewListing({...newListing, amenities: current.filter(a => a !== amenity)});
                            } else {
                              setNewListing({...newListing, amenities: [...current, amenity]});
                            }
                          }}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                            (newListing.amenities || []).includes(amenity)
                              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                        >
                          {amenity}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-4 text-xs font-black text-slate-500 hover:bg-slate-50 rounded-xl transition-all"
                  >
                    CANCEL
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl text-xs font-black shadow-lg shadow-indigo-100 transition-all"
                  >
                    SUBMIT LISTING
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 py-12 border-t border-slate-200 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h5 className="font-bold text-slate-800 mb-4">About the Project</h5>
            <p className="text-slate-500 leading-relaxed">
              This analyzer uses a hybrid KNN (K-Nearest Neighbors) approach to evaluate real estate investments. 
              Regression models predict the price while classification models categorize the risk level based on 11 distinct features.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-slate-800 mb-4">ML Methodology</h5>
            <ul className="space-y-2 text-slate-500">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> KNN Regressor for Price</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> KNN Classifier for Risk</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Feature Scaling (Min-Max)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Cross-Validation (k=5)</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-slate-800 mb-4">Disclaimer</h5>
            <p className="text-slate-400 italic">
              Predictions are based on historical market data and simulated trends. Always consult with a financial advisor before making real estate investments.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
