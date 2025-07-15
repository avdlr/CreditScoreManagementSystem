import React, { useState, useMemo } from 'react';
import { Users, Search, Filter, Eye, TrendingUp, TrendingDown, Minus, MapPin, Briefcase, DollarSign, Calendar, Phone, Mail } from 'lucide-react';
import { people } from '../data/mockData';
import { Person } from '../types';

const PeopleView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'creditScore' | 'age' | 'income'>('creditScore');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterRisk, setFilterRisk] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const getCreditScoreCategory = (score: number) => {
    if (score >= 800) return { category: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100', borderColor: 'border-green-200' };
    if (score >= 740) return { category: 'Very Good', color: 'text-blue-600', bgColor: 'bg-blue-100', borderColor: 'border-blue-200' };
    if (score >= 670) return { category: 'Good', color: 'text-yellow-600', bgColor: 'bg-yellow-100', borderColor: 'border-yellow-200' };
    if (score >= 580) return { category: 'Fair', color: 'text-orange-600', bgColor: 'bg-orange-100', borderColor: 'border-orange-200' };
    return { category: 'Poor', color: 'text-red-600', bgColor: 'bg-red-100', borderColor: 'border-red-200' };
  };

  const getRiskLevelColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCreditTrend = (history: Person['creditHistory']) => {
    if (history.length < 2) return { trend: 'stable', icon: Minus, color: 'text-gray-500' };
    
    const latest = history[history.length - 1].score;
    const previous = history[history.length - 2].score;
    
    if (latest > previous) return { trend: 'up', icon: TrendingUp, color: 'text-green-500' };
    if (latest < previous) return { trend: 'down', icon: TrendingDown, color: 'text-red-500' };
    return { trend: 'stable', icon: Minus, color: 'text-gray-500' };
  };

  const filteredAndSortedPeople = useMemo(() => {
    let filtered = people.filter(person => {
      const matchesSearch = 
        person.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.address.state.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRisk = filterRisk === 'all' || person.riskLevel === filterRisk;
      
      return matchesSearch && matchesRisk;
    });

    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'name':
          aValue = `${a.firstName} ${a.lastName}`;
          bValue = `${b.firstName} ${b.lastName}`;
          break;
        case 'creditScore':
          aValue = a.creditScore;
          bValue = b.creditScore;
          break;
        case 'age':
          aValue = a.demographics.age;
          bValue = b.demographics.age;
          break;
        case 'income':
          aValue = a.income;
          bValue = b.income;
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, sortBy, sortOrder, filterRisk]);

  const averageCreditScore = Math.round(
    filteredAndSortedPeople.reduce((sum, person) => sum + person.creditScore, 0) / filteredAndSortedPeople.length
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">People Management</h1>
              <p className="text-gray-600">Manage credit profiles and demographic information</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{filteredAndSortedPeople.length}</div>
            <div className="text-sm text-gray-500">Total People</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{averageCreditScore}</div>
            <div className="text-sm text-blue-700">Avg Credit Score</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {filteredAndSortedPeople.filter(p => p.riskLevel === 'low').length}
            </div>
            <div className="text-sm text-green-700">Low Risk</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {filteredAndSortedPeople.filter(p => p.riskLevel === 'medium').length}
            </div>
            <div className="text-sm text-yellow-700">Medium Risk</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {filteredAndSortedPeople.filter(p => p.riskLevel === 'high').length}
            </div>
            <div className="text-sm text-red-700">High Risk</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search people..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="creditScore">Sort by Credit Score</option>
            <option value="name">Sort by Name</option>
            <option value="age">Sort by Age</option>
            <option value="income">Sort by Income</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="desc">High to Low</option>
            <option value="asc">Low to High</option>
          </select>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value as any)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Risk Levels</option>
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
          </div>
        </div>
      </div>

      {/* People Grid */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAndSortedPeople.map(person => {
          const { category, color, bgColor, borderColor } = getCreditScoreCategory(person.creditScore);
          const { trend, icon: TrendIcon, color: trendColor } = getCreditTrend(person.creditHistory);
          
          return (
            <div key={person.id} className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {person.firstName} {person.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">{person.demographics.age} years old</p>
                  </div>
                  <button
                    onClick={() => setSelectedPerson(person)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>

                {/* Credit Score */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">{person.creditScore}</div>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${color} ${borderColor} border`}>
                      {category}
                    </div>
                  </div>
                  <div className={`flex items-center space-x-1 ${trendColor}`}>
                    <TrendIcon className="w-4 h-4" />
                    <span className="text-sm font-medium capitalize">{trend}</span>
                  </div>
                </div>

                {/* Risk Level */}
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(person.riskLevel)}`}>
                    {person.riskLevel.toUpperCase()} RISK
                  </span>
                  <span className="text-sm text-gray-500">
                    Updated {new Date(person.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Quick Info */}
              <div className="p-6 space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{person.address.city}, {person.address.state}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Briefcase className="w-4 h-4" />
                  <span>{person.employment.position} at {person.employment.company}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  <span>${person.income.toLocaleString()} annually</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{person.demographics.maritalStatus}, {person.demographics.dependents} dependents</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Person Detail Modal */}
      {selectedPerson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedPerson.firstName} {selectedPerson.lastName}
                </h2>
                <button
                  onClick={() => setSelectedPerson(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 grid md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{selectedPerson.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{selectedPerson.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">Born {new Date(selectedPerson.dateOfBirth).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">
                      {selectedPerson.address.street}, {selectedPerson.address.city}, {selectedPerson.address.state} {selectedPerson.address.zipCode}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 pt-4">Demographics</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Age:</span>
                    <span className="ml-2">{selectedPerson.demographics.age}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Gender:</span>
                    <span className="ml-2 capitalize">{selectedPerson.demographics.gender}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Marital Status:</span>
                    <span className="ml-2 capitalize">{selectedPerson.demographics.maritalStatus}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Dependents:</span>
                    <span className="ml-2">{selectedPerson.demographics.dependents}</span>
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Financial Profile</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedPerson.creditScore}</div>
                    <div className="text-sm text-blue-700">Current Credit Score</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Annual Income:</span>
                      <span className="ml-2">${selectedPerson.income.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Risk Level:</span>
                      <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getRiskLevelColor(selectedPerson.riskLevel)}`}>
                        {selectedPerson.riskLevel.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 pt-4">Employment</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Status:</span>
                    <span className="ml-2 capitalize">{selectedPerson.employment.status}</span>
                  </div>
                  {selectedPerson.employment.company && (
                    <div>
                      <span className="font-medium text-gray-700">Company:</span>
                      <span className="ml-2">{selectedPerson.employment.company}</span>
                    </div>
                  )}
                  {selectedPerson.employment.position && (
                    <div>
                      <span className="font-medium text-gray-700">Position:</span>
                      <span className="ml-2">{selectedPerson.employment.position}</span>
                    </div>
                  )}
                  {selectedPerson.employment.yearsAtJob && (
                    <div>
                      <span className="font-medium text-gray-700">Years at Job:</span>
                      <span className="ml-2">{selectedPerson.employment.yearsAtJob}</span>
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 pt-4">Credit History</h3>
                <div className="space-y-2">
                  {selectedPerson.creditHistory.slice().reverse().map((entry, index) => (
                    <div key={entry.date} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">
                        {new Date(entry.date).toLocaleDateString()}
                      </span>
                      <span className="font-medium">{entry.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeopleView;