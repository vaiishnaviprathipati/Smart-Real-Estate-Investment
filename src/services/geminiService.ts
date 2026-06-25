import { GoogleGenAI } from "@google/genai";
import { PropertyDetails, MarketDetails, PredictionResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function predictProperty(
  propertyDetails: PropertyDetails,
  marketDetails: MarketDetails,
  role: 'buyer' | 'investor'
): Promise<PredictionResult> {
  const prompt = `
    Act as a Senior Real Estate Investment Strategist and Data Scientist. 
    Your task is to provide a highly nuanced investment risk analysis and price prediction.
    
    Target Persona: ${role === 'investor' ? 'Institutional Property Investor (Focus: ROI, Capital Appreciation, Exit Strategy)' : 'Private House Buyer (Focus: Quality of Life, Family Safety, Long-term Asset Stability)'}.
    
    Input Data:
    ---
    Property: ${propertyDetails.area} sqft, ${propertyDetails.propertyType}, ${propertyDetails.bedrooms}BHK, ${propertyDetails.bathrooms} Bath. 
    Floor: ${propertyDetails.floorNumber} of ${propertyDetails.totalFloors}, Balconies: ${propertyDetails.balconies}, Parking: ${propertyDetails.parkingSpaces}.
    Furnishing: ${propertyDetails.furnishing}, Facing: ${propertyDetails.facing}.
    Ownership: ${propertyDetails.ownershipType}, Water: ${propertyDetails.waterAvailability}, Electricity: ${propertyDetails.electricityStatus}.
    Amenities: ${propertyDetails.amenities.join(', ')}.
    Age: ${propertyDetails.age} years. Location Rating: ${propertyDetails.locationRating}/10. Facilities: ${propertyDetails.facilitiesScore}/10.
    
    Market Context:
    Crime: ${marketDetails.crimeRate}%. Growth: ${marketDetails.growthRate}%. 
    Infra: ${marketDetails.infraScore}/10. Demand: ${marketDetails.demandLevel}/10. Stability: ${marketDetails.stabilityIndex}/10.
    ---

    Nuance Requirements for "suggestion" and "recommendationMessage":
    1. Cross-Factor Analysis: Don't just look at individual scores. Look at correlations. (e.g., High growth + Low stability = Speculative; High crime + High facilities = Gentrifying or Risky).
    2. Persona Alignment: 
       - For BUYERS: A "Safe" suggestion requires low crime and high stability, even if growth is low.
       - For INVESTORS: A "Safe" or "Moderate" suggestion might accept higher crime if growth and infra scores are exceptional (Gentrification play).
    3. Risk Scoring: Calculate a weighted risk score (0-100).
    4. Recommendation: Provide a 2-3 sentence professional advice that mentions at least two specific trade-offs found in the data.

    Provide the output in strict JSON format:
    {
      "estimatedPrice": number (in ₹),
      "riskLevel": "Low" | "Medium" | "High",
      "suggestion": "Safe" | "Moderate" | "Avoid",
      "recommendationMessage": "string (Nuanced advice tailored to the ${role})",
      "riskScore": number (0-100),
      "confidence": number (0-1),
      "marketAnalysis": "string (Deep dive into the market dynamics for this ${role})",
      "ageTrend": [
        {"age": number, "price": number},
        {"age": number, "price": number},
        {"age": number, "price": number},
        {"age": number, "price": number},
        {"age": number, "price": number}
      ] (Provide 5 data points showing how price would vary if the property age was 0, 5, 10, 15, and 20 years, keeping other factors constant)
    }
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json"
    }
  });

  const text = response.text?.trim();
  if (!text) {
    throw new Error("Model returned empty response");
  }

  // Strip potential markdown blocks if the model ignored the mime type
  const cleanJson = text.replace(/^```json\n?/, "").replace(/\n?```$/, "");
  
  return JSON.parse(cleanJson);
}
