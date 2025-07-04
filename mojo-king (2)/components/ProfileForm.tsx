
import React, { useState, useRef, useEffect } from 'react';
import { UserProfile } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface ProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
}

const healthConditionsOptions = [
  'Diabetes', 'Obesity', 'Hypertension', 'Sleep Apnea', 
  'Hyperlipidemia', 'PCOS', 'Depression', 'Anxiety', 
  'Fatty Liver', 'Other'
];

const medicationsOptions = [
  'Glucocorticoids', 'Opioids', 'Antidepressants', 'Beta-blockers', 
  'Statins', 'Insulin', 'Metformin', 'Testosterone', 'Other'
];

const MultiSelectDropdown: React.FC<{
    label: string;
    options: string[];
    selectedOptions: string[];
    onSelectionChange: (option: string) => void;
}> = ({ label, options, selectedOptions, onSelectionChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const selectionText = selectedOptions.length > 0 ? `${selectedOptions.length} selected` : `Select ${label.toLowerCase()}...`;

    return (
        <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-medium text-gray-600">{label}</label>
            <button type="button" onClick={() => setIsOpen(!isOpen)} className="mt-1 block w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2.5 text-left flex justify-between items-center">
                <span>{selectionText}</span>
                <svg className={`w-5 h-5 text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {options.map(option => (
                        <label key={option} className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                checked={selectedOptions.includes(option)}
                                onChange={() => onSelectionChange(option)}
                            />
                            <span className="text-sm text-gray-700">{option}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};


const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Omit<UserProfile, 'health'> & { health: { conditions: string[], medications: string[]}}>({
    age: 30,
    weight: 80,
    height: 180,
    lifestyle: {
      exercise: '2-3 times a week',
      sleepHours: 7,
      stressLevel: 'medium',
    },
    health: {
      conditions: [],
      medications: [],
    },
  });
  
  const [otherConditionText, setOtherConditionText] = useState('');
  const [otherMedicationText, setOtherMedicationText] = useState('');

  const handleSimpleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const [section, field] = name.split('.');

    if (section === 'lifestyle') {
      setFormData(prev => ({
        ...prev,
        lifestyle: {
          ...prev.lifestyle,
          [field]: type === 'number' ? parseInt(value, 10) : value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseInt(value, 10) : value,
      }));
    }
  };
  
  const handleHealthSelectionChange = (type: 'conditions' | 'medications', option: string) => {
    setFormData(prev => {
        const currentSelection = prev.health[type];
        const newSelection = currentSelection.includes(option)
            ? currentSelection.filter(item => item !== option)
            : [...currentSelection, option];
        
        return {
            ...prev,
            health: {
                ...prev.health,
                [type]: newSelection,
            },
        };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const processSelection = (selection: string[], otherText: string) => {
        let processed = selection.includes('Other') 
            ? selection.filter(item => item !== 'Other')
            : selection;

        if (selection.includes('Other') && otherText.trim()) {
            processed.push(otherText.trim());
        }
        
        return processed.length > 0 ? processed : ['None'];
    };
    
    const finalProfile: UserProfile = {
        ...formData,
        health: {
            conditions: processSelection(formData.health.conditions, otherConditionText),
            medications: processSelection(formData.health.medications, otherMedicationText),
        }
    };
    
    onSubmit(finalProfile);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-bold text-center text-gray-800">Tell Us About Yourself</h2>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Biometrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-600">Age</label>
                <input type="number" name="age" id="age" value={formData.age} onChange={handleSimpleChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2.5" required />
              </div>
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-600">Weight (kg)</label>
                <input type="number" name="weight" id="weight" value={formData.weight} onChange={handleSimpleChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2.5" required />
              </div>
              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-600">Height (cm)</label>
                <input type="number" name="height" id="height" value={formData.height} onChange={handleSimpleChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2.5" required />
              </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Lifestyle</h3>
          <div>
            <label htmlFor="lifestyle.exercise" className="block text-sm font-medium text-gray-600">Exercise Frequency</label>
            <select name="lifestyle.exercise" id="lifestyle.exercise" value={formData.lifestyle.exercise} onChange={handleSimpleChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2.5">
              <option>Rarely or never</option>
              <option>1-2 times a week</option>
              <option>2-3 times a week</option>
              <option>4-5 times a week</option>
              <option>Daily</option>
            </select>
          </div>
          <div>
            <label htmlFor="lifestyle.sleepHours" className="block text-sm font-medium text-gray-600">Avg. Sleep (hours)</label>
            <input type="number" name="lifestyle.sleepHours" id="lifestyle.sleepHours" value={formData.lifestyle.sleepHours} onChange={handleSimpleChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2.5" required />
          </div>
          <div>
            <label htmlFor="lifestyle.stressLevel" className="block text-sm font-medium text-gray-600">General Stress Level</label>
            <select name="lifestyle.stressLevel" id="lifestyle.stressLevel" value={formData.lifestyle.stressLevel} onChange={handleSimpleChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2.5">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Health</h3>
            <div className="space-y-2">
              <MultiSelectDropdown 
                label="Health Conditions"
                options={healthConditionsOptions}
                selectedOptions={formData.health.conditions}
                onSelectionChange={(option) => handleHealthSelectionChange('conditions', option)}
              />
              {formData.health.conditions.includes('Other') && (
                 <input type="text" placeholder="Please specify other condition" value={otherConditionText} onChange={(e) => setOtherConditionText(e.target.value)} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2.5" />
              )}
            </div>
             <div className="space-y-2">
                <MultiSelectDropdown 
                    label="Current Medications"
                    options={medicationsOptions}
                    selectedOptions={formData.health.medications}
                    onSelectionChange={(option) => handleHealthSelectionChange('medications', option)}
                />
                {formData.health.medications.includes('Other') && (
                    <input type="text" placeholder="Please specify other medication" value={otherMedicationText} onChange={(e) => setOtherMedicationText(e.target.value)} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2.5" />
                )}
            </div>
        </div>

        <Button type="submit" fullWidth>
          Next: Connect Device
        </Button>
      </form>
    </Card>
  );
};

export default ProfileForm;