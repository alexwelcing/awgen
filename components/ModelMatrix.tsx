import React, { useState } from 'react';
import { MODEL_METRICS_DATA } from '../constants';
import { ModelMetric } from '../types';
import { ArrowUpDown, Info, Check } from 'lucide-react';

type SortField = 'codingScore' | 'inputCost' | 'latencyScore';

export const ModelMatrix: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>('codingScore');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const sortedData = [...MODEL_METRICS_DATA].sort((a, b) => {
    const mult = sortDir === 'asc' ? 1 : -1;
    return (a[sortField] - b[sortField]) * mult;
  });

  return (
    <div className="my-10 overflow-hidden border border-slate-200 rounded-xl shadow-lg bg-white">
      <div className="p-6 bg-slate-50 border-b border-slate-200">
        <h3 className="font-bold text-slate-900 text-lg">Model Decision Matrix</h3>
        <p className="text-sm text-slate-500 mt-1">
          Strategic comparison for task routing. Click headers to sort.
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-600 font-semibold uppercase tracking-wider text-xs">
            <tr>
              <th className="px-6 py-4">Model Family</th>
              <th 
                className="px-6 py-4 cursor-pointer hover:bg-slate-200 transition-colors group"
                onClick={() => handleSort('codingScore')}
              >
                <div className="flex items-center gap-1">
                  Coding Score
                  <ArrowUpDown size={12} className={`opacity-0 group-hover:opacity-100 ${sortField === 'codingScore' ? 'opacity-100' : ''}`}/>
                </div>
              </th>
              <th 
                className="px-6 py-4 cursor-pointer hover:bg-slate-200 transition-colors group"
                onClick={() => handleSort('inputCost')}
              >
                <div className="flex items-center gap-1">
                  Cost ($/1M)
                  <ArrowUpDown size={12} className={`opacity-0 group-hover:opacity-100 ${sortField === 'inputCost' ? 'opacity-100' : ''}`}/>
                </div>
              </th>
               <th 
                className="px-6 py-4 cursor-pointer hover:bg-slate-200 transition-colors group"
                onClick={() => handleSort('latencyScore')}
              >
                <div className="flex items-center gap-1">
                  Latency
                  <ArrowUpDown size={12} className={`opacity-0 group-hover:opacity-100 ${sortField === 'latencyScore' ? 'opacity-100' : ''}`}/>
                </div>
              </th>
              <th className="px-6 py-4">Ideal Use Case</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedData.map((model) => (
              <tr key={model.id} className="hover:bg-blue-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">
                  {model.name}
                  <div className="text-xs text-slate-400 font-normal">{model.provider}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-600" 
                        style={{ width: `${model.codingScore}%` }}
                      />
                    </div>
                    <span className="font-mono text-slate-600">{model.codingScore}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-slate-600">
                  ${model.inputCost.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                   <span className={`px-2 py-1 rounded text-xs font-bold ${
                     model.latencyScore >= 9 ? 'bg-green-100 text-green-700' : 
                     model.latencyScore >= 8 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                   }`}>
                     {model.latencyScore}/10
                   </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {model.bestFor.map(tag => (
                      <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center gap-2">
        <Info size={14} />
        <span>Scores based on internal HumanEval benchmarks and averaged TTFT from NYC region.</span>
      </div>
    </div>
  );
};