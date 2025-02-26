import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Calendar, MapPin, User, Home, Star, Clock, Phone, Mail, CheckCircle, X } from "lucide-react";

// Define types for our data
interface ApplicantMatch {
  id: string;
  name: string;
  condition: string;
  priority: number;
  matchedHousing: {
    id: string;
    address: string;
    type: string;
    bedrooms: number;
  };
  matchScore: number;
  matchDate: string;
  // Additional fields for details
  email?: string;
  phone?: string;
  age?: number;
  gender?: string;
  notes?: string;
  caseWorker?: string;
  housingNotes?: string;
  accessibility?: string[];
  utilities?: string[];
  amenities?: string[];
  caseNotesHistory?: {
    date: string;
    author: string;
    note: string;
  }[];
}

// Mock data showing users matched to housing based on priority
const mockMatches: ApplicantMatch[] = [
  {
    id: "1",
    name: "Sarah Smith",
    condition: "Cancer",
    priority: 95,
    matchedHousing: {
      id: "h001",
      address: "123 Oak St, Louisville, KY 40202",
      type: "Apartment",
      bedrooms: 2
    },
    matchScore: 98,
    matchDate: "2025-05-15",
    email: "sarah.smith@example.com",
    phone: "(502) 555-0128",
    age: 32,
    gender: "Female",
    notes: "Requires assistance with daily activities. Prefers ground floor due to mobility issues. Has service animal.",
    caseWorker: "Jim Bill",
    housingNotes: "ADA compliant unit with wheelchair accessibility and grab bars in bathroom.",
    accessibility: ["Wheelchair accessible", "Ground floor", "Grab bars"],
    utilities: ["Water", "Electric", "Gas", "Internet"],
    amenities: ["Elevator", "Laundry on-site", "Security system"],
    caseNotesHistory: [
      {
        date: "2025-05-12",
        author: "Jim Bill",
        note: "Initial assessment completed. Client has stage 2 cancer and needs accessible housing near hospital."
      },
      {
        date: "2025-05-13",
        author: "Susan Taylor",
        note: "Medical records received. Priority level set to HIGH due to ongoing treatment needs."
      },
      {
        date: "2025-05-14",
        author: "Jim Bill",
        note: "Identified potential housing match on Oak St. Will coordinate visit tomorrow."
      },
      {
        date: "2025-05-15",
        author: "Jim Bill",
        note: "Housing visit completed. Client approved. Processing paperwork for move-in next week."
      }
    ]
  },
  {
    id: "2",
    name: "James Wilson",
    condition: "Terminal Illness",
    priority: 92,
    matchedHousing: {
      id: "h003",
      address: "450 Pine Ave, Louisville, KY 40203",
      type: "House",
      bedrooms: 3
    },
    matchScore: 95,
    matchDate: "2025-05-16",
    email: "james.wilson@example.com",
    phone: "(502) 555-0143",
    age: 58,
    gender: "Male",
    notes: "Needs to be close to hospital for regular treatments. Has two children who visit on weekends.",
    caseWorker: "Frank Vars",
    housingNotes: "Single-story house with large bedrooms. 10 minutes from Norton Hospital.",
    accessibility: ["Single-story", "Wide doorways"],
    utilities: ["All utilities included"],
    amenities: ["Fenced yard", "Garage", "Close to hospital"],
    caseNotesHistory: [
      {
        date: "2025-05-14",
        author: "Frank Vars",
        note: "Intake completed. Client has terminal diagnosis with 8-12 months prognosis. Requires 3BR for family visits."
      },
      {
        date: "2025-05-15",
        author: "Frank Vars",
        note: "Coordinated with medical team for housing requirements. Need first floor or elevator access."
      },
      {
        date: "2025-05-16",
        author: "Maria Johnson",
        note: "Found potential match on Pine Ave. Scheduled viewing for tomorrow."
      }
    ]
  },
  {
    id: "3",
    name: "Maria Garcia",
    condition: "Physical Disability",
    priority: 88,
    matchedHousing: {
      id: "h007",
      address: "78 Maple Dr, Louisville, KY 40204",
      type: "Apartment",
      bedrooms: 1
    },
    matchScore: 91,
    matchDate: "2025-05-16",
    email: "maria.garcia@example.com",
    phone: "(502) 555-0171",
    age: 28,
    gender: "Female",
    notes: "Uses wheelchair for mobility. Works remotely as a customer service representative.",
    caseWorker: "Yu Lee",
    housingNotes: "ADA compliant unit with lowered countertops and roll-in shower.",
    accessibility: ["Wheelchair accessible", "Roll-in shower", "Lowered counters"],
    utilities: ["Water", "Electric", "Gas", "High-speed internet"],
    amenities: ["Community room", "Close to public transportation"]
  },
  {
    id: "4",
    name: "Robert Johnson",
    condition: "Elderly",
    priority: 80,
    matchedHousing: {
      id: "h012",
      address: "221 Elm St, Louisville, KY 40205",
      type: "Townhouse",
      bedrooms: 2
    },
    matchScore: 85,
    matchDate: "2025-05-17",
    email: "robert.johnson@example.com",
    phone: "(502) 555-0187",
    age: 76,
    gender: "Male",
    notes: "Former veteran with limited mobility. Needs housing with minimal stairs.",
    caseWorker: "Tim Hanks",
    housingNotes: "First-floor master bedroom with walk-in shower. Senior community.",
    accessibility: ["First-floor bedroom", "Walk-in shower"],
    utilities: ["Water", "Electric", "Gas"],
    amenities: ["Senior community", "Emergency call system"]
  },
  {
    id: "5",
    name: "Jennifer Lee",
    condition: "Chronic Medical Condition",
    priority: 75,
    matchedHousing: {
      id: "h015",
      address: "187 River Rd, Louisville, KY 40206",
      type: "Apartment",
      bedrooms: 2
    },
    matchScore: 82,
    matchDate: "2025-05-18",
    email: "jennifer.lee@example.com",
    phone: "(502) 555-0192",
    age: 45,
    gender: "Female",
    notes: "Has asthma and requires good air quality. Prefers quiet environment away from heavy traffic.",
    caseWorker: "Jim Bill",
    housingNotes: "Recently renovated with new HVAC system and air purifiers. Located in quiet residential area.",
    accessibility: ["Elevator access"],
    utilities: ["Water", "Electric"],
    amenities: ["Air purification system", "Parks nearby"]
  },
  {
    id: "6",
    name: "David Brown",
    condition: "Mental Health Condition",
    priority: 73,
    matchedHousing: {
      id: "h019",
      address: "64 Highland Ave, Louisville, KY 40207",
      type: "House",
      bedrooms: 4
    },
    matchScore: 79,
    matchDate: "2025-05-19",
    email: "david.brown@example.com",
    phone: "(502) 555-0211",
    age: 38,
    gender: "Male",
    notes: "Receives regular therapy services. Prefers housing with outdoor space and natural light.",
    caseWorker: "Jim Bill",
    housingNotes: "Group home with on-site support services. Large windows and garden space.",
    accessibility: ["Ground floor access"],
    utilities: ["All utilities included"],
    amenities: ["Garden", "Communal spaces", "On-site support staff"]
  }
];

const AutoMatched = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState(mockMatches);
  const [selectedMatch, setSelectedMatch] = useState<ApplicantMatch | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Function to get priority badge color based on priority score
  const getPriorityColor = (priority: number) => {
    if (priority >= 90) return "bg-red-100 text-red-800";
    if (priority >= 80) return "bg-orange-100 text-orange-800";
    if (priority >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-blue-100 text-blue-800";
  };

  // Function to get match score badge color
  const getMatchScoreColor = (score: number) => {
    if (score >= 95) return "bg-green-100 text-green-800";
    if (score >= 85) return "bg-blue-100 text-blue-800";
    if (score >= 75) return "bg-yellow-100 text-yellow-800";
    return "bg-orange-100 text-orange-800";
  };

  // Open details modal for a specific match
  const handleViewDetails = (match: ApplicantMatch) => {
    setSelectedMatch(match);
    setIsDetailsOpen(true);
  };

  // Create a Google Maps URL for the address
  const getGoogleMapsEmbedUrl = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedAddress}`;
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Auto Matched Housing
          </h1>
          <div className="space-x-4">
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
            <Button variant="destructive" onClick={() => navigate("/")}>
              Log Out
            </Button>
          </div>
        </div>

        <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Automatic Matching System</h2>
          <p className="text-blue-700">
            Our system automatically matches applicants to available housing units based on priority score,
            medical conditions, location preferences, and housing requirements. Higher priority applicants
            are matched first to ensure those with the most critical needs receive housing quickly.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Condition
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Priority Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Matched Housing
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Match Score
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Match Date
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {matches.map((match) => (
                <tr
                  key={match.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {match.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {match.condition}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(match.priority)}`}>
                      {match.priority}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium">{match.matchedHousing.address}</div>
                      <div className="text-sm text-gray-500">
                        {match.matchedHousing.type} · {match.matchedHousing.bedrooms} BR
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getMatchScoreColor(match.matchScore)}`}>
                      {match.matchScore}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {match.matchDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 border-blue-200 hover:border-blue-400"
                      onClick={() => handleViewDetails(match)}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedMatch && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">Match Details</DialogTitle>
                <DialogDescription>
                  Match created on {selectedMatch.matchDate} with a {selectedMatch.matchScore}% compatibility score
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* Applicant Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold flex items-center mb-4">
                    <User className="mr-2 h-5 w-5 text-blue-600" />
                    Applicant Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="font-medium text-xl">{selectedMatch.name}</div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(selectedMatch.priority)}`}>
                          Priority: {selectedMatch.priority}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{selectedMatch.condition}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center mb-2">
                        <Mail className="h-4 w-4 text-gray-500 mr-2" />
                        <span>{selectedMatch.email}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <Phone className="h-4 w-4 text-gray-500 mr-2" />
                        <span>{selectedMatch.phone}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <span className="text-gray-500 mr-1">Age:</span>
                          <span>{selectedMatch.age}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-500 mr-1">Gender:</span>
                          <span>{selectedMatch.gender}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="font-medium mb-1">Case Notes:</div>
                      <div className="text-sm bg-white p-2 rounded border border-gray-200">
                        {selectedMatch.notes}
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-1">Case Worker:</span>
                        <span>{selectedMatch.caseWorker}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Housing Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold flex items-center mb-4">
                    <Home className="mr-2 h-5 w-5 text-green-600" />
                    Housing Information
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <div className="font-medium text-xl">{selectedMatch.matchedHousing.address}</div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <span>{selectedMatch.matchedHousing.type}</span>
                        <span className="mx-2">•</span>
                        <span>{selectedMatch.matchedHousing.bedrooms} Bedrooms</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="font-medium mb-1">Housing Notes:</div>
                      <div className="text-sm bg-white p-2 rounded border border-gray-200">
                        {selectedMatch.housingNotes}
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="font-medium mb-1">Accessibility Features:</div>
                      <div className="flex flex-wrap gap-1">
                        {selectedMatch.accessibility?.map((feature, index) => (
                          <span key={index} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="font-medium mb-1">Utilities Included:</div>
                      <div className="flex flex-wrap gap-1">
                        {selectedMatch.utilities?.map((utility, index) => (
                          <span key={index} className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">
                            {utility}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="font-medium mb-1">Amenities:</div>
                      <div className="flex flex-wrap gap-1">
                        {selectedMatch.amenities?.map((amenity, index) => (
                          <span key={index} className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Google Maps */}
                <div className="col-span-1 md:col-span-2 h-64 bg-gray-100 rounded-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: '0.5rem' }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={getGoogleMapsEmbedUrl(selectedMatch.matchedHousing.address)}
                  ></iframe>
                </div>

                {/* Case Notes History */}
                <div className="col-span-1 md:col-span-2">
                  <h3 className="text-lg font-semibold flex items-center mb-4">
                    <Clock className="mr-2 h-5 w-5 text-purple-600" />
                    Case Notes History
                  </h3>
                  <div className="bg-white border rounded-lg divide-y">
                    {selectedMatch.caseNotesHistory?.map((note, index) => (
                      <div key={index} className="p-3 hover:bg-gray-50">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <span className="font-medium text-gray-800">{note.author}</span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-sm text-gray-500">{note.date}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">{note.note}</p>
                      </div>
                    ))}

                    {/* Add note form */}
                    <div className="p-3">
                      <textarea
                        className="w-full p-2 border rounded-md text-sm"
                        placeholder="Add a new case note..."
                        rows={2}
                      ></textarea>
                      <div className="flex justify-end mt-2">
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                          Add Note
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="col-span-1 md:col-span-2 flex justify-end space-x-4">
                  <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                    Close
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Confirm Match
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AutoMatched;
