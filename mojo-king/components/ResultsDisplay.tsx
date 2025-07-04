import React, { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import html2pdf from 'html2pdf.js';
import { MojoResult } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import SubscriptionModal from './SubscriptionModal';
import { ShareIcon } from './icons/ShareIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import { useAuth } from '../context/AuthContext';


interface ResultsDisplayProps {
  result: MojoResult;
  onRestart: () => void;
}

const ArchetypeDetails = {
  'The Magnetic Leader': { icon: '👑', color: 'text-amber-500' },
  'The Charismatic Connector': { icon: '🤝', color: 'text-sky-500' },
  'The Adventurous Explorer': { icon: '🚀', color: 'text-lime-500' },
  'The Steadfast Guardian': { icon: '🛡️', color: 'text-indigo-500' },
};

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, onRestart }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { logout } = useAuth();

  const gaugeData = [
    { name: 'Score', value: result.mojoScore },
    { name: 'Remaining', value: 100 - result.mojoScore },
  ];
  const COLORS = ['#f97316', '#e5e7eb']; // orange-500, gray-200

  const handleDownloadPdf = () => {
    if (!isSubscribed) {
      setShowModal(true);
      return;
    }
    const sourceElement = document.querySelector('.printable-area');
    if (!sourceElement) {
        console.error("Printable area not found!");
        return;
    };

    // Clone the node to avoid manipulating the live DOM and causing flicker
    const elementToPrint = sourceElement.cloneNode(true) as HTMLElement;

    // Remove any 'no-print' elements from the clone
    elementToPrint.querySelectorAll('.no-print').forEach(el => el.remove());

    const opt = {
      margin:       0.5,
      filename:     `MOJO_KING_Report_${result.archetype.replace(/\s+/g, '_')}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(elementToPrint).set(opt).save();
  };
  
  const handleShare = async () => {
    if (!isSubscribed) {
      setShowModal(true);
      return;
    }
    const shareData = {
        title: 'My MOJO KING Report',
        text: `I got "${result.archetype}" with a Mojo Score of ${result.mojoScore}! Check out MOJO KING to discover your own dating archetype.`,
        url: window.location.href
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            // Fallback for desktop or browsers that don't support navigator.share
            await navigator.clipboard.writeText(shareData.text + "\n" + shareData.url);
            alert("Report details copied to clipboard!");
        }
    } catch(err) {
        console.error("Share failed:", err);
        alert("Could not share at this moment. Report details copied to clipboard instead!");
        await navigator.clipboard.writeText(shareData.text + "\n" + shareData.url);
    }
  };


  const archetypeInfo = ArchetypeDetails[result.archetype] || { icon: '✨', color: 'text-gray-500' };

  return (
    <>
      <div className="printable-area">
        <Card noPadding>
          <div className="p-6 bg-gray-100/50 rounded-t-2xl">
            <div className="text-center">
                <span className={`text-6xl ${archetypeInfo.icon}`}>{archetypeInfo.icon}</span>
                <h2 className={`mt-2 text-xl font-bold ${archetypeInfo.color}`}>You are...</h2>
                <h1 className="text-3xl font-black text-gray-800 tracking-tight">{result.archetype}</h1>
            </div>
          </div>
          <div className="p-6">
            <div className="relative h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gaugeData}
                    cx="50%"
                    cy="80%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius="70%"
                    outerRadius="100%"
                    fill="#8884d8"
                    paddingAngle={0}
                    dataKey="value"
                    isAnimationActive={false}
                  >
                    {gaugeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0}/>
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 text-center">
                  <span className="text-5xl font-black text-orange-500">{result.mojoScore}</span>
                  <p className="text-sm font-semibold text-gray-500 -mt-1">Mojo Score</p>
              </div>
            </div>

            <div className="text-center mt-4">
              <h3 className="text-lg font-bold text-gray-800">{result.title}</h3>
              <p className="mt-1 text-gray-600">{result.summary}</p>
            </div>

            <div className={`mt-6 space-y-4 relative ${!isSubscribed ? 'blur-sm pointer-events-none' : ''}`}>
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Detailed Analysis</h3>
                {result.detailedAnalysis.map((item, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-800">{item.area}</h4>
                        <p className="text-gray-600 text-sm">{item.feedback}</p>
                    </div>
                ))}
            </div>
            
            {!isSubscribed && (
              <div className="absolute bottom-16 left-0 right-0 p-6 flex flex-col items-center justify-center no-print">
                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg text-center">
                      <h3 className="text-lg font-bold">Unlock Your Full Report</h3>
                      <p className="text-sm text-gray-600 mt-1">Subscribe to MOJO KING Premium to see your detailed analysis and unlock all features.</p>
                      <Button onClick={() => setShowModal(true)} className="mt-4">
                          Subscribe Now
                      </Button>
                  </div>
              </div>
            )}
            
            <div className="mt-8 pt-6 border-t border-gray-200 no-print">
                <div className="flex space-x-4">
                    <Button onClick={handleShare} variant="secondary" className="w-full flex items-center justify-center gap-2">
                        <ShareIcon className="w-5 h-5" /> Share
                    </Button>
                    <Button onClick={handleDownloadPdf} variant="secondary" className="w-full flex items-center justify-center gap-2">
                        <DownloadIcon className="w-5 h-5" /> Export PDF
                    </Button>
                </div>
                <div className="flex space-x-4 mt-4">
                    <Button onClick={onRestart} variant="ghost" className="w-full">
                        Start Over
                    </Button>
                    <Button onClick={logout} variant="ghost" className="w-full flex items-center justify-center gap-2 text-red-500 hover:bg-red-50">
                        <LogoutIcon className="w-5 h-5" /> Logout
                    </Button>
                </div>
            </div>

          </div>
        </Card>
      </div>
      {showModal && <SubscriptionModal onClose={() => setShowModal(false)} onSubscribe={() => { setIsSubscribed(true); setShowModal(false); }} />}
    </>
  );
};

export default ResultsDisplay;