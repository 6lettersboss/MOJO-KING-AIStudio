
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface ProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UserProfile>({
    age: 30,
    weight: 80,
    height: 180,
    lifestyle: {
      exercise: '2-3 times a week',
      sleepHours: 7,
      stressLevel: 'medium',
    },
    health: {
      conditions: 'None',
      medications: 'None',
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const [section, field] = name.split('.');

    if (section === 'lifestyle' || section === 'health') {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-bold text-center text-gray-800">Tell Us About Yourself</h2>
        
        {/* Biometrics */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Biometrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-600">Age</label>
                <input type="number" name="age" id="age" value={formData.age} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2.5" required />
              </div>
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-600">Weight (kg)</label>
                <input type="number" name="weight" id="weight" value={formData.weight} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2.5" required />
              </div>
              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-600">Height (cm)</label>
                <input type="number" name="height" id="height" value={formData.height} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2.5" required />
              </div>
          </div>
        </div>

        {/* Lifestyle */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Lifestyle</h3>
          <div>
            <label htmlFor="lifestyle.exercise" className="block text-sm font-medium text-gray-600">Exercise Frequency</label>
            <select name="lifestyle.exercise" id="lifestyle.exercise" value={formData.lifestyle.exercise} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2.5">
              <option>Rarely or never</option>
              <option>1-2 times a week</option>
              <option>2-3 times a week</option>
              <option>4-5 times a week</option>
              <option>Daily</option>
            </select>
          </div>
          <div>
            <label htmlFor="lifestyle.sleepHours" className="block text-sm font-medium text-gray-600">Avg. Sleep (hours)</label>
            <input type="number" name="lifestyle.sleepHours" id="lifestyle.sleepHours" value={formData.lifestyle.sleepHours} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2.5" required />
          </div>
          <div>
            <label htmlFor="lifestyle.stressLevel" className="block text-sm font-medium text-gray-600">General Stress Level</label>
            <select name="lifestyle.stressLevel" id="lifestyle.stressLevel" value={formData.lifestyle.stressLevel} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2.5">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        
        {/* Health */}
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Health</h3>
            <div>
              <label htmlFor="health.conditions" className="block text-sm font-medium text-gray-600">Known Health Conditions (or 'None')</label>
              <input type="text" name="health.conditions" id="health.conditions" value={formData.health.conditions} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2.5" required />
            </div>
            <div>
              <label htmlFor="health.medications" className="block text-sm font-medium text-gray-600">Current Medications (or 'None')</label>
              <input type="text" name="health.medications" id="health.medications" value={formData.health.medications} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2.5" required />
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
