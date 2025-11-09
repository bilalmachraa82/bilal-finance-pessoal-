
import React, { useState, useRef } from 'react';
import { GlassCard } from './GlassCard';
import { analyzeReceipt } from '../services/geminiService';
import type { ReceiptData } from '../types';
import { UploadCloud, Loader, CheckCircle, AlertTriangle, FileText, ShoppingCart, Calendar, Euro } from 'lucide-react';
import { Icon } from './Icon';

export const ReceiptScanner: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<ReceiptData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setExtractedData(null);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("Por favor, selecione um ficheiro primeiro.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setExtractedData(null);
    try {
      const data = await analyzeReceipt(selectedFile);
      setExtractedData(data);
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro desconhecido.");
    } finally {
      setIsLoading(false);
    }
  };

  const InfoRow = ({ icon, label, value }: { icon: React.ElementType, label: string, value: string | number | undefined }) => (
    <div className="flex items-center text-sm">
      <Icon as={icon} className="w-4 h-4 mr-2 text-slate-400" />
      <span className="font-semibold text-slate-300 mr-2">{label}:</span>
      <span className="text-white">{value || 'N/A'}</span>
    </div>
  );

  return (
    <GlassCard>
      <h3 className="text-xl font-bold text-white mb-4">Analisador de Recibos IA</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div
            className="border-2 border-dashed border-slate-600 rounded-2xl p-6 text-center cursor-pointer hover:border-[#00FF88] hover:bg-slate-800/30 transition-all"
            onClick={() => fileInputRef.current?.click()}
          >
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            {preview ? (
              <img src={preview} alt="Pré-visualização do recibo" className="max-h-60 mx-auto rounded-lg" />
            ) : (
              <>
                <UploadCloud className="w-12 h-12 mx-auto text-slate-400" />
                <p className="mt-2 text-slate-300">Carregue a imagem de um recibo</p>
                <p className="text-xs text-slate-500">PNG, JPG, etc.</p>
              </>
            )}
          </div>
          {selectedFile && (
            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="mt-4 w-full bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ boxShadow: '0 0 20px rgba(236, 72, 153, 0.3)' }}
            >
              {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : "Analisar com IA"}
            </button>
          )}
        </div>
        <div>
          <h4 className="font-bold text-white mb-2">Dados Extraídos</h4>
          <div className="p-4 bg-slate-800/50 rounded-lg min-h-[200px] flex flex-col justify-center">
            {isLoading && <Loader className="w-8 h-8 text-[#00FF88] animate-spin mx-auto" />}
            {error && (
              <div className="text-center text-red-400">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
                <p>{error}</p>
              </div>
            )}
            {extractedData && (
              <div className="space-y-3">
                <InfoRow icon={FileText} label="Vendedor" value={extractedData.vendor} />
                <InfoRow icon={Euro} label="Total" value={extractedData.totalAmount?.toFixed(2)} />
                <InfoRow icon={Calendar} label="Data" value={extractedData.date} />
                {extractedData.items && extractedData.items.length > 0 && (
                    <div>
                        <h5 className="font-semibold text-slate-300 mt-4 mb-2 flex items-center"><ShoppingCart className="w-4 h-4 mr-2" /> Itens:</h5>
                        <ul className="text-xs space-y-1 pl-4 max-h-24 overflow-y-auto">
                            {extractedData.items.map((item, i) => (
                                <li key={i} className="text-slate-300">{item.quantity || 1}x {item.name} - €{item.price?.toFixed(2)}</li>
                            ))}
                        </ul>
                    </div>
                )}
              </div>
            )}
            {!isLoading && !error && !extractedData && (
              <p className="text-center text-slate-500">Os dados do recibo aparecerão aqui.</p>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
