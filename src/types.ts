export interface PropertyDetails {
  area: number;
  bedrooms: number;
  bathrooms: number;
  locationRating: number;
  age: number;
  facilitiesScore: number;
  propertyType: 'Flat' | 'Villa' | 'Apartment' | 'Penthouse';
  balconies: number;
  parkingSpaces: number;
  floorNumber: number;
  furnishing: 'Unfurnished' | 'Semi-Furnished' | 'Fully-Furnished';
  facing: 'North' | 'South' | 'East' | 'West' | 'North-East' | 'North-West' | 'South-East' | 'South-West';
  amenities: string[];
  totalFloors: number;
  waterAvailability: string;
  electricityStatus: string;
  ownershipType: 'Freehold' | 'Leasehold' | 'Co-operative Society' | 'Power of Attorney';
}

export interface MarketDetails {
  crimeRate: number;
  growthRate: number;
  infraScore: number;
  demandLevel: number;
  stabilityIndex: number;
}

export interface Property {
  id: string;
  title: string;
  price: number;
  area: number;
  location: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  tags: string[];
  propertyType: 'Flat' | 'Villa' | 'Apartment' | 'Penthouse';
  balconies: number;
  parkingSpaces: number;
  floorNumber: number;
  furnishing: 'Unfurnished' | 'Semi-Furnished' | 'Fully-Furnished';
  facing: 'North' | 'South' | 'East' | 'West' | 'North-East' | 'North-West' | 'South-East' | 'South-West';
  amenities: string[];
  totalFloors: number;
  waterAvailability: string;
  electricityStatus: string;
  ownershipType: 'Freehold' | 'Leasehold' | 'Co-operative Society' | 'Power of Attorney';
  description: string;
  age: number;
  locationRating: number;
  facilitiesScore: number;
  marketContext?: MarketDetails;
}

export interface PredictionResult {
  estimatedPrice: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  suggestion: 'Safe' | 'Moderate' | 'Avoid';
  recommendationMessage: string;
  riskScore: number;
  confidence: number;
  marketAnalysis: string;
  ageTrend: { age: number; price: number }[];
}
